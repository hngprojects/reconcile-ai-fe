import {
  bankStatementData,
  companyLedgerData,
} from "@/data/reconciliationSampleData";
import { useState } from "react";

export interface ReconciliationItem {
  bankStatement: {
    date: string;
    description: string;
    amount: number;
  };
  companyLedger?: {
    date: string;
    description: string;
    amount: number;
  };
  matched: boolean;
}

export function useReconciliationLogic() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const bankData = bankStatementData;
  const ledgerData = companyLedgerData;
  const totalItems = bankData.length;

  // Combine data for mobile view and status logic
  const combinedData: ReconciliationItem[] = bankData.map((bankItem) => {
    const matchingLedgerItem = ledgerData.find(
      (ledgerItem) =>
        ledgerItem.description === bankItem.description &&
        ledgerItem.amount === bankItem.amount
    );

    return {
      bankStatement: {
        date: bankItem.date,
        description: bankItem.description,
        amount: bankItem.amount,
      },
      companyLedger: matchingLedgerItem
        ? {
            date: matchingLedgerItem.date,
            description: matchingLedgerItem.description,
            amount: matchingLedgerItem.amount,
          }
        : undefined,
      matched: !!matchingLedgerItem,
    };
  });

  // Pagination logic
  const currentPage = pagination.pageIndex;
  const totalPages = Math.ceil(totalItems / pagination.pageSize);
  const canPreviousPage = currentPage > 0;
  const canNextPage = currentPage < totalPages - 1;

  const onPreviousPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
  };

  const onNextPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
  };

  // Slice data based on pagination
  const paginatedBankData = bankData.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  const paginatedLedgerData = ledgerData.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  return {
    pagination,
    setPagination,
    bankData,
    ledgerData,
    combinedData,
    paginatedBankData,
    paginatedLedgerData,
    totalItems,
    currentPage,
    totalPages,
    canPreviousPage,
    canNextPage,
    onPreviousPage,
    onNextPage,
  };
}
