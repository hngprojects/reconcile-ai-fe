"use client";

import { useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { ReconciliationItem } from "../types/frontendResponseTypes";
import { dummyBackendResponseData } from "../types/dummyBackendResponseData";
import { transformReconciliationData } from "../helpers/transformReconciliationData ";

// Sample data - in a real app, this would be fetched from an API

export function useLogic() {
  const reconciliationData = transformReconciliationData(
    dummyBackendResponseData
  );
  const [data] = useState<ReconciliationItem[]>(
    reconciliationData.reconciliation_data
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Calculate pagination values
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedData = data.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );

  // Function to handle matching transactions
  const handleMatch = (bankId: string, ledgerId: string) => {
    console.log(
      `Matching bank transaction ${bankId} with ledger transaction ${ledgerId}`
    );
    // In a real application, you would call an API to update the match
    // and then refresh the data
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPageIndex(Math.max(0, Math.min(newPage, totalPages - 1)));
  };

  // Handle page size change
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(0); // Reset to first page when changing page size
  };

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real application, you might want to filter the data based on the search query
    // or make an API call to get filtered data
  };

  return {
    // Data
    data,
    paginatedData,
    unmatchedBankTransactions: reconciliationData.unmatched_bank_transactions,
    unmatchedLedgerTransactions:
      reconciliationData.unmatched_ledger_transactions,
    summary: reconciliationData.summary,

    // Pagination
    pageIndex,
    pageSize,
    totalItems,
    totalPages,

    // Table state
    columnFilters,
    setColumnFilters,
    searchQuery,

    // Actions
    handleMatch,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    setSearchQuery,
  };
}
