"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import {
  ReconciliationItem,
  ReconciliationResponse,
  Transaction,
} from "../types/frontendResponseTypes";
import { revertToBackendFormat } from "../helpers/revertBackToBackendFormat";
import { updateReconciliation } from "@/src/lib/api";
import { ManualRequestBody } from "@/src/types/reconciliation";
import { toast } from "sonner";

interface ReconciliationContextProps {
  data: ReconciliationResponse;
  paginatedData: ReconciliationItem[];
  unmatchedBankTransactions: Transaction[];
  unmatchedLedgerTransactions: Transaction[];

  // Pagination
  pagination: { pageIndex: number; pageSize: number };
  totalItems: number;
  totalPages: number;
  setPagination: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >;

  // Table state
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;

  // Actions
  handleMatch: (
    reconciliation_pair_id: string,
    bankTransaction: Transaction,
    ledgerTransaction: Transaction
  ) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onRowsPerPageChange: (size: number) => void;
  handleSearch: (query: string) => void;
  handleUnlink: (
    reconciliation_pair_id: string,
    bankTransaction: Transaction,
    ledgerTransaction: Transaction
  ) => Promise<void>;
}

const ReconciliationContext = createContext<
  ReconciliationContextProps | undefined
>(undefined);

export function ReconciliationProvider({ children }: { children: ReactNode }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [data, setData] = useState<ReconciliationResponse>(
    {} as ReconciliationResponse
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const localData = localStorage.getItem("reconciliation") as string;
    const parsedData: ReconciliationResponse = localData
      ? JSON.parse(localData)
      : ({} as ReconciliationResponse);
    const reconciliationData = parsedData;

    const revertedData = revertToBackendFormat(parsedData);
    console.log({ reconciliationData, revertedData });

    setData(reconciliationData);
  }, []);

  const reconciliationData = useMemo(
    () => data.reconciliation_data ?? [],
    [data]
  );

  const paginatedData = useMemo(() => {
    return reconciliationData.slice(
      pagination.pageIndex * pagination.pageSize,
      (pagination.pageIndex + 1) * pagination.pageSize
    );
  }, [reconciliationData, pagination.pageIndex, pagination.pageSize]);

  const totalItems = reconciliationData.length;
  const totalPages = Math.ceil(totalItems / pagination.pageSize);
  const canPreviousPage = pagination.pageIndex > 0;
  const canNextPage = pagination.pageIndex < totalPages - 1;

  const onPreviousPage = () =>
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
  const onNextPage = () =>
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
  const onRowsPerPageChange = (size: number) =>
    setPagination({ pageSize: size, pageIndex: 0 });

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleMatch = async (
    reconciliation_pair_id: string,
    bankTransaction: Transaction,
    ledgerTransaction: Transaction
  ) => {
    const body = {
      ledger: {
        Amount: ledgerTransaction.amount,
        Date: ledgerTransaction.date,
        Description: ledgerTransaction.description,
      },
      statement: {
        Amount: bankTransaction.amount,
        Date: bankTransaction.date,
        Description: bankTransaction.description,
      },
      action: "match",
    };

    try {
      const reconciliationId = data.reconciliation_id;
      const response = await updateReconciliation(
        reconciliationId,
        body as ManualRequestBody
      );

      if (response.status !== "success") {
        console.error("Failed to update reconciliation:", response);
        return;
      }

      setData((prevData) => {
        if (!prevData) return prevData;

        const updatedReconciliationData = prevData.reconciliation_data.map(
          (item) =>
            item.reconciliation_pair_id === reconciliation_pair_id
              ? {
                  ...item,
                  bank_txn: bankTransaction,
                  ledger_txn: ledgerTransaction,
                  matched: true,
                  match_score: 100,
                }
              : item
        );

        const updatedUnmatchedBankTxns =
          prevData.unmatched_bank_transactions.filter(
            (txn) => txn.id !== bankTransaction.id
          );
        const updatedUnmatchedLedgerTxns =
          prevData.unmatched_ledger_transactions.filter(
            (txn) => txn.id !== ledgerTransaction.id
          );

        const updatedData = {
          ...prevData,
          reconciliation_data: updatedReconciliationData,
          unmatched_bank_transactions: updatedUnmatchedBankTxns,
          unmatched_ledger_transactions: updatedUnmatchedLedgerTxns,
        };

        localStorage.setItem("reconciliation", JSON.stringify(updatedData));

        return updatedData;
      });

      toast.success("Transactions matched successfully!");
    } catch (error) {
      toast.error("Failed to match transactions");
      console.error("Error updating reconciliation:", error);
    }
  };

  const handleUnlink = async (
    reconciliation_pair_id: string,
    bankTransaction: Transaction,
    ledgerTransaction: Transaction
  ) => {
    // API request payload
    const body = {
      ledger: {
        Amount: ledgerTransaction.amount,
        Date: ledgerTransaction.date,
        Description: ledgerTransaction.description,
      },
      statement: {
        Amount: bankTransaction.amount,
        Date: bankTransaction.date,
        Description: bankTransaction.description,
      },
      action: "unmatch",
    };

    try {
      const reconciliationId = data.reconciliation_id;
      const response = await updateReconciliation(
        reconciliationId,
        body as ManualRequestBody
      );

      if (response.status !== "success") {
        console.error("Failed to unlink reconciliation:", response);
        return;
      }

      // If API request succeeds, update state
      setData((prevData) => {
        if (!prevData) return prevData;

        // Generate new reconciliation pair IDs
        // Use current timestamp or a more complex logic if needed
        let timestamp = Date.now();

        // 1. Find the matched pair that needs to be removed or marked as unmatched
        const updatedMatched = prevData.reconciliation_data.filter(
          (item) => item.reconciliation_pair_id !== reconciliation_pair_id
        );

        // Add bank transaction with null ledger to matched array
        updatedMatched.push({
          reconciliation_pair_id: (timestamp++).toString(),
          bank_txn: bankTransaction,
          ledger_txn: null,
          matched: false,
          match_score: 0,
        });

        // Add ledger transaction with null bank to matched array
        updatedMatched.push({
          reconciliation_pair_id: (timestamp++).toString(),
          bank_txn: null,
          ledger_txn: ledgerTransaction,
          matched: false,
          match_score: 0,
        });

        // 2. Add bank transaction to unmatched_bank_transactions array
        const updatedUnmatchedBankTxns = [
          ...prevData.unmatched_bank_transactions,
          bankTransaction,
        ];

        // 3. Add ledger transaction to unmatched_ledger_transactions array
        const updatedUnmatchedLedgerTxns = [
          ...prevData.unmatched_ledger_transactions,
          ledgerTransaction,
        ];

        // 4. Update summary
        const updatedSummary = {
          ...prevData.summary,
          total_matched: prevData.summary.total_matched - 1,
          total_unmatched: prevData.summary.total_unmatched + 2,
          auto_matched: prevData.summary.auto_matched - 1,
          manual_review_needed: prevData.summary.manual_review_needed + 2,
        };

        const updatedData = {
          ...prevData,
          reconciliation_data: updatedMatched,
          unmatched_bank_transactions: updatedUnmatchedBankTxns,
          unmatched_ledger_transactions: updatedUnmatchedLedgerTxns,
          summary: updatedSummary,
        };

        // Update localStorage
        localStorage.setItem("reconciliation", JSON.stringify(updatedData));

        return updatedData;
      });
    } catch (error) {
      console.error("Error unlinking reconciliation:", error);
    }
  };

  return (
    <ReconciliationContext.Provider
      value={{
        data,
        paginatedData,
        unmatchedBankTransactions: data.unmatched_bank_transactions,
        unmatchedLedgerTransactions: data.unmatched_ledger_transactions,

        // Pagination
        pagination,
        totalItems,
        totalPages,
        setPagination,

        // Table state
        columnFilters,
        setColumnFilters,
        searchQuery,
        setSearchQuery,

        // Actions
        handleMatch,
        canPreviousPage,
        canNextPage,
        onPreviousPage,
        onNextPage,
        onRowsPerPageChange,
        handleSearch,
        handleUnlink,
      }}
    >
      {children}
    </ReconciliationContext.Provider>
  );
}

export function useReconciliation() {
  const context = useContext(ReconciliationContext);

  if (!context) {
    throw new Error(
      "useReconciliation must be used within a ReconciliationProvider"
    );
  }
  return context;
}
