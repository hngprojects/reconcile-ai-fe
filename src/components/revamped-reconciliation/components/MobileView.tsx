"use client";

import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { DownloadCloudIcon, Loader2, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import UnlinkModal from "../../modal/UnlinkModal";
import { SuccessToast } from "../../reconciliation/SuccessToast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useReconciliation } from "../context/ReconciliationProvider";
import { revertToBackendFormat } from "../helpers/revertBackToBackendFormat";
import {
  addValueAndLabel,
  TransactionOption,
} from "../helpers/searchComboxOptionExpander";
import { FindPossibleMatchModal } from "../modals/FindPossibleMatchModal";
import { Matched } from "../types/backendResponseTypes";
import {
  ReconciliationItem,
  ReconciliationResponse,
  Transaction,
} from "../types/frontendResponseTypes";
import { StatusBadge } from "./StatusBadge";
import QuickFindAndMatchComboBox from "./quickFind/QuickFindAndMatchComboBox";

export function MobileView() {
  const {
    paginatedData,
    pagination,
    totalItems,
    onPreviousPage,
    onNextPage,
    canPreviousPage,
    canNextPage,
    unmatchedBankTransactions,
    unmatchedLedgerTransactions,
    handleMatch: onMatch,
    handleUnlink: onUnlink,
    showUnlinkModalMobile,
    setShowUnlinkModalMobile,
    isLoading,
  } = useReconciliation();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransactionRow, setSelectedTransactionRow] =
    useState<ReconciliationItem>({} as ReconciliationItem);

  const possibleMatches =
    selectedTransactionRow.bank_txn === null
      ? unmatchedBankTransactions
      : unmatchedLedgerTransactions;

  const { pageIndex, pageSize } = pagination;

  const startItem = pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, totalItems);

  // Export function
  const handleExport = async () => {
    try {
      setIsExporting(true);

      // Get reconciliation data from localStorage
      const reconciliationData = localStorage.getItem("reconciliation");

      if (!reconciliationData) {
        throw new Error("No reconciliation data found");
      }

      const parsedData = JSON.parse(
        reconciliationData
      ) as ReconciliationResponse;

      const reconciledData = revertToBackendFormat(parsedData);

      // Format the data according to the API's expected structure
      const formattedData = {
        matches: (reconciledData.matches || []).map((match: Matched) => ({
          ...match,
          status: match.status || "matched",
        })),
        unmatched: reconciledData.unmatched || {},
        only_in_file1: reconciledData.only_in_file1 || [],
        only_in_file2: reconciledData.only_in_file2 || [],
      };

      const response = await fetch(
        "https://api-dev.reconxi.com/api/v1/reconcile/export",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: formattedData }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `Export failed with status: ${response.status}`
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reconciliation_export_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setToastMessage("Your data has been exported successfully!");
      setShowSuccessToast(true);
    } catch (error: unknown) {
      console.error("Export error:", error);
      setToastMessage(
        error instanceof Error ? error.message : "Failed to export data"
      );
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

  // Show CSV structure error toast
  useEffect(() => {
    if (showErrorModal) {
      setToastMessage("CSV Table Structure not currently supported!");
      setShowErrorToast(true);
      setShowErrorModal(false);
    }
  }, [showErrorModal, setShowErrorModal]);

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (showSuccessToast || showErrorToast) {
      timer = setTimeout(() => {
        setShowSuccessToast(false);
        setShowErrorToast(false);
      }, 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showSuccessToast, showErrorToast]);

  return (
    <div className="space-y-3 py-6">
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in duration-500">
          <SuccessToast
            message={toastMessage}
            onClose={() => setShowSuccessToast(false)}
          />
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Matched Results</h1>
        <button
          className="px-6 py-4 border border-[#2E604A] text-[#2E604A] font-medium hover:bg-gray-100 rounded-md w-[150px] h-12 flex items-center justify-center cursor-pointer"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Exporting...
            </>
          ) : (
            <>
              <DownloadCloudIcon className="mr-2 w-5 h-5" />
              Export
            </>
          )}
        </button>
      </div>

      {/* Transaction Cards */}
      {paginatedData.map((item, index) => {
        const possibleMatches =
          item.bank_txn === null
            ? unmatchedLedgerTransactions
            : unmatchedBankTransactions;

        const transactionOptions: TransactionOption[] =
          addValueAndLabel(possibleMatches);

        const handleSearch = (query: string) => {
          // Always return full list for empty queries
          if (!query.trim()) return transactionOptions;

          return transactionOptions.filter(
            (transaction) =>
              transaction.description
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              transaction.date.toLowerCase().includes(query.toLowerCase())
          );
        };

        return (
          <div
            key={`${item.bank_txn?.id}-${index}`}
            className={cn(
              "rounded-lg border shadow-sm",
              item.matched ? "bg-[#F3FEFA]" : "bg-[#FFF4F0]",
              {
                "rounded-t-lg": index === 0,
              }
            )}
          >
            {/* Column Headers */}
            {index === 0 && (
              <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-t-md border-b">
                <div className="text-sm font-medium text-gray-500">
                  Date/Description
                </div>
                <div className="text-sm font-medium text-gray-500">Amount</div>
              </div>
            )}

            <div className="p-4 space-y-4">
              {/* Bank Statement */}
              {item.bank_txn !== null && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-900">
                        Bank Statement
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-700">
                          {item.bank_txn?.date}
                        </div>
                        <div className="text-lg text-gray-700">
                          {item.bank_txn?.description}
                        </div>
                      </div>
                    </div>

                    <div className="font-medium text-gray-600">
                      {item.bank_txn?.amount}
                    </div>
                  </div>

                  {item.matched && (
                    <div className="flex gap-3 items-center">
                      <button
                        type="button"
                        title="Unlink matching transactions"
                        className="cursor-pointer inline-block border-[0.5px] border-[#007A55] p-2 rounded-3xl group hover:bg-[#CEFFED]"
                        onClick={() => {
                          setShowUnlinkModalMobile(true);
                          setSelectedTransactionRow(item);
                        }}
                      >
                        <StatusBadge matched={item.matched} />
                      </button>
                      <hr className="border border-gray-200/70 flex-1" />
                    </div>
                  )}
                </div>
              )}

              {/* Company Ledger - Only show if matched */}
              {item.ledger_txn !== null && (
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold text-gray-900">
                      Company Ledger
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-700">
                        {item.ledger_txn?.date}
                      </div>
                      <div className="text-lg text-gray-700">
                        {item.ledger_txn?.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <div className="font-medium text-gray-600">
                      {item.ledger_txn?.amount}
                    </div>

                    {item.bank_txn !== null && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="size-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4 text-gray-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedTransactionRow(item);
                              setModalOpen(true);
                            }}
                          >
                            Find possible match
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              )}

              {/* Show Unmatched status if not matched */}
              {!item.matched && (
                <div className="pt-1 flex flex-col justify-between items-start gap-5">
                  <div className="inline-block border-[0.5px] border-[#C50700] p-2 rounded-3xl">
                    <StatusBadge matched={false} />
                  </div>

                  <div className="flex justify-between items-center gap-3 w-full">
                    <QuickFindAndMatchComboBox
                      commandProps={{
                        label: "Select possible match",
                      }}
                      defaultOptions={transactionOptions}
                      onSearchSync={handleSearch}
                      placeholder="Find possible match"
                      hidePlaceholderWhenSelected
                      onConfirm={(option) => {
                        const selectedOption: Transaction = {
                          id: `${option.id}-${Date.now()}`,
                          description: option.description,
                          date: option.date,
                          amount: option.amount,
                        };
                        console.log("Confirmed:", option);

                        if (item.ledger_txn) {
                          onMatch(selectedOption, item.ledger_txn);
                        }

                        if (item.bank_txn) {
                          onMatch(item.bank_txn, selectedOption);
                        }
                      }}
                      emptyIndicator={
                        <p className="text-center text-sm">
                          No transactions found
                        </p>
                      }
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedTransactionRow(item);
                            setModalOpen(true);
                          }}
                        >
                          Find possible match
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-gray-500">
          Showing {startItem} - {endItem} out of {totalItems}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviousPage}
            disabled={!canPreviousPage}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextPage}
            disabled={!canNextPage}
          >
            Next
          </Button>
        </div>
      </div>

      <FindPossibleMatchModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        reconciledDataRow={selectedTransactionRow}
        potentialMatches={possibleMatches}
        onMatch={onMatch}
      />

      <UnlinkModal
        isOpen={showUnlinkModalMobile}
        isLoading={isLoading}
        onClose={() => {
          setShowUnlinkModalMobile(false);
        }}
        onConfirm={async () => {
          if (!selectedTransactionRow) return;

          if (
            selectedTransactionRow.bank_txn &&
            selectedTransactionRow.ledger_txn
          ) {
            await onUnlink(
              selectedTransactionRow.bank_txn,
              selectedTransactionRow.ledger_txn
            );
          }
        }}
      />
    </div>
  );
}
