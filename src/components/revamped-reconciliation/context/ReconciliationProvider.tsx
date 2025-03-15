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
// import { dummyBackendResponseData } from "../types/dummyBackendResponseData";
import {
  ReconciliationItem,
  ReconciliationResponse,
  Transaction,
} from "../types/frontendResponseTypes";
// import { transformReconciliationData } from "../helpers/transformReconciliationData";
import { revertToBackendFormat } from "../helpers/revertBackToBackendFormat";
import { updateReconciliation } from "@/src/lib/api";
import { ManualRequestBody } from "@/src/types/reconciliation";
import { toast } from "sonner";
// import { ResponseData } from "../types/backendResponseTypes";

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
    // const reconciliationData = transformReconciliationData(
    //   dummyBackendResponseData
    // );
    // const revertedData = revertToBackendFormat(reconciliationData);
    // console.log({ reconciliationData, revertedData });

    // localStorage.setItem("reconciliation", JSON.stringify(reconciliationData));
    // const reconciliationData = transformReconciliationData(parsedData);

    const localData = localStorage.getItem("reconciliation_new") as string;
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

  // const handleMatch = (
  //   reconciliation_pair_id: string,
  //   bankTransaction: Transaction,
  //   ledgerTransaction: Transaction
  // ) => {
  //   setData((prevData) => {
  //     if (!prevData) return prevData;

  //     // Update the matched transaction in reconciliation_data
  //     const updatedReconciliationData = prevData.reconciliation_data.map(
  //       (item) =>
  //         item.reconciliation_pair_id === reconciliation_pair_id
  //           ? {
  //               ...item,
  //               bank_txn: bankTransaction,
  //               ledger_txn: ledgerTransaction,
  //               matched: true,
  //               match_score: 100,
  //             }
  //           : item
  //     );

  //     // Remove the matched bank transaction from unmatched list
  //     const updatedUnmatchedBankTxns =
  //       prevData.unmatched_bank_transactions.filter(
  //         (txn) => txn.id !== bankTransaction.id
  //       );

  //     // Remove the matched ledger transaction from unmatched list
  //     const updatedUnmatchedLedgerTxns =
  //       prevData.unmatched_ledger_transactions.filter(
  //         (txn) => txn.id !== ledgerTransaction.id
  //       );

  //     const updatedData = {
  //       ...prevData,
  //       reconciliation_data: updatedReconciliationData,
  //       unmatched_bank_transactions: updatedUnmatchedBankTxns,
  //       unmatched_ledger_transactions: updatedUnmatchedLedgerTxns,
  //     };

  //     localStorage.setItem("reconciliation_new", JSON.stringify(updatedData));

  //     return {
  //       ...prevData,
  //       reconciliation_data: updatedReconciliationData,
  //       unmatched_bank_transactions: updatedUnmatchedBankTxns,
  //       unmatched_ledger_transactions: updatedUnmatchedLedgerTxns,
  //     };
  //   });

  //   console.log("Updated reconciliation data after matching:", data);
  // };

  const handleMatch = async (
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
      action: "match",
    };

    console.log({ body });

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

      // If API request succeeds, update state
      setData((prevData) => {
        if (!prevData) return prevData;

        // Update matched reconciliation item
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

        // Remove matched transactions from unmatched lists
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

        // Update localStorage
        localStorage.setItem("reconciliation_new", JSON.stringify(updatedData));

        return updatedData;
      });

      toast.success("Transactions matched successfully!");
    } catch (error) {
      toast.error("Failed to match transactions");
      console.error("Error updating reconciliation:", error);
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
      }}
    >
      {children}
    </ReconciliationContext.Provider>
  );
}

// Custom hook to use the reconciliation context
export function useReconciliation() {
  const context = useContext(ReconciliationContext);

  if (!context) {
    throw new Error(
      "useReconciliation must be used within a ReconciliationProvider"
    );
  }
  return context;
}
