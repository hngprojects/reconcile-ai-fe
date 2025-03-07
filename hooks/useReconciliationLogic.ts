import { useState, useEffect } from "react";

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
    pageSize: 10,
  });

  const [data, setData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('reconciliation');
    setData(JSON.parse(saved as string));
  }, []);
  
  let bankData = [ ...data.only_in_file_1];
  let ledgerData = [ ...data.only_in_file_2 ];

  data.matches.map(data => {
    bankData.push(data.file1_transaction);
    ledgerData.push(data.file2_transaction);
  });

  data.unmatched.map(data => {
    bankData.push(data.unmatched_file1);
    ledgerData.push(data.unmatched_file2); 
  });

  let totalItems = bankData.length;

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

  const onRowsPerPageChange = (newSize: number) => {
    if (newSize > totalItems) return;
    setPagination((prev) => ({
      pageIndex: 0,
      pageSize: newSize,
    }));
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
    onRowsPerPageChange,
  };
}
