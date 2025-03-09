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

  type matched = {
    file1_transaction: Transaction,
    file2_transaction: Transaction,
    status: string
  }

  type unmatched = {
    unmatched_file1: Transaction[],
    unmatched_file2: Transaction[]
  }

  type ResponseData = {
    matches: matched[],
    unmatched: unmatched,
    only_in_file1: Transaction[],
    only_in_file2: Transaction[]
  }

  export type Transaction = {
    'Description': string,
    'Date': string,
    'Amount': number
  }

  export type TData = {
    [key: string]: string|number 
  }

  const validateDocuments = (data: TData[]) => {
    const requiredHeaders = ['Date', 'Description', 'Amount'];

    const valid = data.every(tx => 
      requiredHeaders.every(h => Object.keys(tx).includes(h))
    );

    return valid;
  }

export function useReconciliationLogic() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });



  const [data, setData] = useState<ResponseData>({} as ResponseData);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('reconciliation') as string);
    setData(saved);
  }, []);
  
  const bankData: Transaction[] = [];
  const ledgerData: Transaction[] = [];

  if(data.matches){
    data.matches.map(data => {
      bankData.push(data.file1_transaction);
      ledgerData.push(data.file2_transaction);
    });
  }

  if(data.unmatched){
      if(data.unmatched.unmatched_file2) {
        ledgerData.push(...data.unmatched.unmatched_file2);
      }

      if(data.unmatched.unmatched_file1){
        bankData.push(...data.unmatched.unmatched_file1); 
      }
  }

  useEffect(() => {
    if(!validateDocuments(bankData) || !validateDocuments(ledgerData)){
      setShowErrorModal(true);
    }
  }, [bankData, ledgerData]);

  const totalItems = bankData.length;

  // Combine data for mobile view and status logic
  const combinedData: ReconciliationItem[] = bankData.map((bankItem) => {
    const matchingData = data.matches.find(
        (match) =>
          match.file1_transaction == bankItem
    );
    const matchingLedgerItem = matchingData && matchingData.file2_transaction;

    return {
      bankStatement: {
        date: bankItem['Date'],
        description: bankItem['Description'],
        amount: bankItem['Amount'],
      },
      companyLedger: matchingLedgerItem
        ? {
            date: matchingLedgerItem['Date'],
            description: matchingLedgerItem['Description'],
            amount: matchingLedgerItem['Amount'],
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
    showErrorModal,
    setData,
    data
  };
}
