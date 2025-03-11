import { useState, useEffect, useMemo } from "react";
import {
  ReconciliationItem,
  ResponseData,
  TData,
  Transaction,
} from "@/src/types/reconciliation";
import { reconciliationData } from "@/src/data/testReconciliationResult";

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
  console.log({ data });

  useEffect(() => {
    // const saved = JSON.parse(localStorage.getItem("reconciliation") as string);
    const saved = reconciliationData;
    console.log({ saved });
    setData(saved);
  }, []);

  // Function to add a new match to reconciliationData
  const handleMatch = (
    bankTransaction: Transaction,
    ledgerTransaction: Transaction
  ) => {
    const newMatch = {
      file1_transaction: bankTransaction,
      file2_transaction: ledgerTransaction,
      match_score: 100, // Default match score
    };

    // Update matches array
    const updatedMatches = [...data.matches, newMatch];

    // Remove the matched transactions from unmatched arrays
    const updatedUnmatchedFile1 = data.unmatched.unmatched_file1.filter(
      (tx) => tx !== bankTransaction
    );
    const updatedUnmatchedFile2 = data.unmatched.unmatched_file2.filter(
      (tx) => tx !== ledgerTransaction
    );

    // Update the state
    setData((prevData) => ({
      ...prevData,
      matches: updatedMatches,
      unmatched: {
        unmatched_file1: updatedUnmatchedFile1,
        unmatched_file2: updatedUnmatchedFile2,
      },
      matchSummary: {
        totalMatched: prevData.matchSummary.totalMatched + 1,
        totalUnmatched: prevData.matchSummary.totalUnmatched - 2,
      },
    }));
  };

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

  useEffect(() => {
    if (!validationShown && (bankData.length > 0 || ledgerData.length > 0)) {
      if (!validateDocuments(bankData) || !validateDocuments(ledgerData)) {
        setShowErrorModal(true);
        setValidationShown(true);
      }
    }
  }, [bankData, ledgerData, validationShown]);

  const totalItems = bankData.length;

  // Combine data for mobile view and status logic
  const combinedData: ReconciliationItem[] = bankData.map((bankItem) => {
    const matchingData = data.matches.find(
      (match) => match.file1_transaction == bankItem
    );
    const matchingLedgerItem = matchingData && matchingData.file2_transaction;

    return {
      bankStatement: {
        date: bankItem["Date"],
        description: bankItem["Description"],
        amount: bankItem["Amount"],
      },
      companyLedger: matchingLedgerItem
        ? {
            date: matchingLedgerItem["Date"],
            description: matchingLedgerItem["Description"],
            amount: matchingLedgerItem["Amount"],
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

  const onRowsPerPageChange = (size: number) => {
    setPagination(() => ({
      pageSize: size,
      pageIndex: 0, // Reset to first page when page size changes
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
    setShowErrorModal,
    setData,
    data,
    handleMatch,
  };
}
