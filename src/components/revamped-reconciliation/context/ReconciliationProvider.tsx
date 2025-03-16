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
import { transformReconciliationData } from "../helpers/transformReconciliationData";

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
  }, []); // Removed `data` from dependency array to prevent infinite re-rendering

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
        toast.error("Failed to match transactions");
        return;
      }

      // Transform and update data
      const reconciliationData = transformReconciliationData(response.data);
      localStorage.setItem(
        "reconciliation",
        JSON.stringify(reconciliationData)
      );
      setData(reconciliationData);

      toast.success("Transactions matched successfully!");
    } catch (error) {
      toast.error("Failed to match transactions");
      console.error("Error updating reconciliation:", error);
    }
  };

  const handleUnlink = async (
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
        toast.error("Failed to unlink transactions");
        return;
      }

      // Transform and update data
      const reconciliationData = transformReconciliationData(response.data);
      localStorage.setItem(
        "reconciliation",
        JSON.stringify(reconciliationData)
      );
      setData(reconciliationData);

      toast.success("Transactions unlinked successfully!");
    } catch (error) {
      toast.error("Failed to unlink transactions");
      console.error("Error unlinking reconciliation:", error);
    }
  };

  return (
    <ReconciliationContext.Provider
      value={{
        data,
        paginatedData,
        unmatchedBankTransactions: data.unmatched_bank_transactions ?? [],
        unmatchedLedgerTransactions: data.unmatched_ledger_transactions ?? [],

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
