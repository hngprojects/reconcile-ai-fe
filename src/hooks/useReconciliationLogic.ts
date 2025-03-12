import { useState, useEffect, useMemo } from "react";
import {
  ReconciliationItem,
  ResponseData,
  TData,
  Transaction,
} from "@/src/types/reconciliation";

const validateDocuments = (data: TData[]) => {
  const requiredHeaders = ["Date", "Description", "Amount"];

  const valid = data.every((tx) =>
    requiredHeaders.every((h) => Object.keys(tx).includes(h))
  );

  return valid;
};

export function useReconciliationLogic() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [data, setData] = useState<ResponseData>({} as ResponseData);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [validationShown, setValidationShown] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reconciliation") as string);
    setData(saved);
  }, []);

  const bankData = useMemo(() => {
    const result: Transaction[] = [];
    if (data.matches) {
      data.matches.map((data) => {
        result.push(data.file1_transaction);
      });
    }
    if (data.unmatched && data.unmatched.unmatched_file1) {
      result.push(...data.unmatched.unmatched_file1);
    }
    return result;
  }, [data.matches, data.unmatched]);

  const ledgerData = useMemo(() => {
    const result: Transaction[] = [];
    if (data.matches) {
      data.matches.map((data) => {
        result.push(data.file2_transaction);
      });
    }
    if (data.unmatched && data.unmatched.unmatched_file2) {
      result.push(...data.unmatched.unmatched_file2);
    }
    return result;
  }, [data.matches, data.unmatched]);

  const reconciled: ReconciliationItem[] = [];

  bankData.map(bank => {
    const matched = data.matches.find(val => val.file1_transaction == bank);

    if(matched){
      reconciled.push({
        bankStatement: bank,
        companyLedger: matched.file2_transaction,
        matched: !!matched
      });
    }else {
      reconciled.push({
        bankStatement: bank,
        companyLedger: {},
        matched: !!matched
      });
    }
  });

  ledgerData.filter(ledg => !data.matches.find(
          (match) => match.file2_transaction === ledg
        )).map(ledger => {
          reconciled.push({
            companyLedger: ledger,
            bankStatement: {},
            matched: false
          });
  });

  useEffect(() => {
    if (!validationShown && (bankData.length > 0 || ledgerData.length > 0)) {
      if (!validateDocuments(bankData) || !validateDocuments(ledgerData)) {
        setShowErrorModal(true);
        setValidationShown(true);
      }
    }
  }, [bankData, ledgerData, validationShown]);

  const totalItems = reconciled.length;

  // Combine data for mobile view and status logic
  const combinedData: ReconciliationItem[] = reconciled.map((item) => {    return {
      bankStatement: {
        date: (item.bankStatement as Transaction)["Date"],
        description: (item.bankStatement as Transaction)["Description"],
        amount: (item.bankStatement as Transaction)["Amount"],
      },
      companyLedger: (item.companyLedger as Transaction)
        ? {
            date: (item.companyLedger as Transaction)["Date"],
            description: (item.companyLedger as Transaction)["Description"],
            amount: (item.companyLedger as Transaction)["Amount"],
          }
        : undefined,
      matched: item.matched,
    };
  });

  // Pagination logic
  const currentPage = pagination.pageIndex;
  const totalPages = Math.ceil(reconciled.length / pagination.pageSize);
  const canPreviousPage = currentPage > 0;
  const canNextPage = currentPage < totalPages - 1;

  const onPreviousPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
  };

  const onNextPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
  };

  const onRowsPerPageChange = (size: number) => {
    setPagination(() => ({
      pageSize: size,
      pageIndex: 0, // Reset to first page when page size changes
    }));
  };

  // Slice data based on pagination
  const paginatedBankData = (reconciled.map(data => data.bankStatement) as Transaction[]).slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  const paginatedLedgerData = (reconciled.map(data => data.companyLedger) as Transaction[]).slice(
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
    setShowErrorModal,
    setData,
    data,
  };
}
