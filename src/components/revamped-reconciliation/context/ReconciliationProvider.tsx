"use client";

import React, {
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
  FrontendTransaction,
  StatementWithScore,
  LedgerWithScore,
} from "../types/frontendResponseTypes";
// import { revertToBackendFormat } from "../helpers/revertBackToBackendFormat";
import { updateReconciliation } from "@/src/lib/api";
import { ManualRequestBody } from "@/src/types/reconciliation";
import { toast } from "sonner";
import { transformReconciliationData } from "../helpers/transformReconciliationData";
import { dummyBackendResponseData } from "../types/dummyBackendResponseData";
import { useAuth } from "@/src/components/context/AuthContext";

interface ReconciliationContextProps {
  data: ReconciliationResponse;
  paginatedData: ReconciliationItem[];
  unmatchedBankTransactions: FrontendTransaction[];
  unmatchedLedgerTransactions: FrontendTransaction[];

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
    bankTransaction: StatementWithScore[],
    ledgerTransaction: LedgerWithScore[]
  ) => Promise<void>;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onRowsPerPageChange: (size: number) => void;
  handleSearch: (query: string) => void;
  handleUnlink: (
    bankTransaction: StatementWithScore[],
    ledgerTransaction: LedgerWithScore[]
  ) => Promise<void>;

  // Modals
  showUnlinkModal: boolean;
  setShowUnlinkModal: React.Dispatch<React.SetStateAction<boolean>>;
  showUnlinkModalMobile: boolean;
  setShowUnlinkModalMobile: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isMatching: boolean;
  setIsMatching: React.Dispatch<React.SetStateAction<boolean>>;

  //Unlink Data
  selectedRow: ReconciliationItem | null;
  setSelectedRow: React.Dispatch<
    React.SetStateAction<ReconciliationItem | null>
  >;
}

const ReconciliationContext = createContext<
  ReconciliationContextProps | undefined
>(undefined);

export function ReconciliationProvider({ children }: { children: ReactNode }) {
  const [isMatching, setIsMatching] = useState(false);
  const [showUnlinkModal, setShowUnlinkModal] = useState(false);
  const [showUnlinkModalMobile, setShowUnlinkModalMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [data, setData] = useState<ReconciliationResponse>(
    {} as ReconciliationResponse,
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<ReconciliationItem | null>(
    null,
  );

  useEffect(() => {
    const reconciliationData = transformReconciliationData(
      dummyBackendResponseData
    );

    // const localData = localStorage.getItem("reconciliation") as string;
    // const parsedData: ReconciliationResponse = localData
    //   ? JSON.parse(localData)
    //   : ({} as ReconciliationResponse);
    // const reconciliationData = parsedData;

    // const revertedData = revertToBackendFormat(parsedData);
    // console.log({ reconciliationData, revertedData });

    console.log({ reconciliationData });

    setData(reconciliationData);
  }, []); // Removed `data` from dependency array to prevent infinite re-rendering

  const reconciliationData = useMemo(
    () => data.reconciliation_data ?? [],
    [data],
  );

  const paginatedData = useMemo(() => {
    return reconciliationData.slice(
      pagination.pageIndex * pagination.pageSize,
      (pagination.pageIndex + 1) * pagination.pageSize,
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
    bankTransactions: StatementWithScore[],
    ledgerTransactions: LedgerWithScore[]
  ) => {
    const body = {
      ledgers: ledgerTransactions.map((ledgerTransaction) => ({
        Amount: ledgerTransaction.ledger_txn.amount,
        Date: ledgerTransaction.ledger_txn.date,
        Person: ledgerTransaction.ledger_txn.description,
      })),
      statements: bankTransactions.map((bankTransaction) => ({
        Amount: bankTransaction.bank_txn.amount,
        Date: bankTransaction.bank_txn.date,
        Person: bankTransaction.bank_txn.description,
      })),
      action: "match",
    };

    setIsMatching(true);
    try {
      const reconciliationId = data.reconciliation_id;
      const response = await updateReconciliation(
        reconciliationId,
        body as ManualRequestBody,
      );

      if (response.status !== "success") {
        toast.error("Failed to match transactions");
        return;
      }

      // Transform and update data
      const reconciliationData = transformReconciliationData(response.data);
      localStorage.setItem(
        "reconciliation",
        JSON.stringify(reconciliationData),
      );
      setData(reconciliationData);

      toast.success("Transactions matched successfully!");
    } catch {
      toast.error("Failed to match transactions");
    } finally {
      setIsMatching(false);
    }
  };

  const handleUnlink = async (
    bankTransactions: StatementWithScore[],
    ledgerTransactions: LedgerWithScore[]
  ) => {
    const body = {
      ledgers: ledgerTransactions.map((ledgerTransaction) => ({
        Amount: ledgerTransaction.ledger_txn.amount,
        Date: ledgerTransaction.ledger_txn.date,
        Person: ledgerTransaction.ledger_txn.description,
      })),
      statements: bankTransactions.map((bankTransaction) => ({
        Amount: bankTransaction.bank_txn.amount,
        Date: bankTransaction.bank_txn.date,
        Person: bankTransaction.bank_txn.description,
      })),
      action: "match",
    };

    setIsLoading(true);
    try {
      const reconciliationId = data.reconciliation_id;
      const response = await updateReconciliation(
        reconciliationId,
        body as ManualRequestBody,
      );

      if (response.status !== "success") {
        toast.error("Failed to unlink transactions");
        return;
      }

      // Transform and update data
      const reconciliationData = transformReconciliationData(response.data);
      localStorage.setItem(
        "reconciliation",
        JSON.stringify(reconciliationData),
      );
      setData(reconciliationData);

      toast.success("Transactions unlinked successfully!");
    } catch {
      toast.error("Failed to unlink transactions");
    } finally {
      setShowUnlinkModal(false);
      setShowUnlinkModalMobile(false);
      setIsLoading(false);
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

        // modal state
        showUnlinkModal,
        setShowUnlinkModal,
        showUnlinkModalMobile,
        setShowUnlinkModalMobile,
        isLoading,
        setIsLoading,
        isMatching,
        setIsMatching,

        // Unlink data
        selectedRow,
        setSelectedRow,
      }}
    >
      {children}
    </ReconciliationContext.Provider>
  );
}

// Add plan to the context
export const useReconciliation = () => {
  const context = useContext(ReconciliationContext);
  const { user } = useAuth();

  if (!context) {
    throw new Error(
      "useReconciliation must be used within a ReconciliationProvider",
    );
  }

  const userPlan = user?.payment_plan?.plan?.toLowerCase() || "basic";

  return {
    ...context,
    userPlan,
  };
};
