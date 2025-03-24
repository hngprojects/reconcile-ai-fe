"use client";

import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { DownloadCloudIcon, Loader2, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { CheckIcon } from "../../Icon/Icons";
import UnlinkModal from "../../modal/UnlinkModal";
import { SuccessToast } from "../SuccessToast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useReconciliation } from "@/src/context/ReconciliationProvider";
import {
  addValueAndLabel,
  TransactionOption,
} from "../../../helpers/searchComboxOptionExpander";
import { FindPossibleMatchModal } from "../modals/FindPossibleMatchModal";
import { FrontendTransaction } from "../../../types/frontendResponseTypes";
import { StatusBadge } from "../StatusBadge";
import QuickFindAndMatchComboBox from "../quickFind/QuickFindAndMatchComboBox";
import { exportReconciliation } from "@/src/lib/api";
import { usePathname } from "next/navigation";
import Unauthenticated from "@/src/components/reconciliation/UnAuthorized";
import { Loader } from "@/src/components/ui/loader";

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
    setShowUnlinkModal,
    isLoading,
    userPlan,
    setSelectedRow,
    selectedRow,
    authenticated,
    loading
  } = useReconciliation();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const path = usePathname();

  const [modalOpen, setModalOpen] = useState(false);
  // const [selectedTransactionRow, setSelectedRow] = useState<ReconciliationItem>(
  //   {} as ReconciliationItem
  // );

  const possibleMatches =
    selectedRow?.statements === null
      ? unmatchedBankTransactions
      : unmatchedLedgerTransactions;

  const { pageIndex, pageSize } = pagination;

  const startItem = pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, totalItems);

  // Export function
  const handleExport = async () => {
    try {
      setIsExporting(true);

      const reconciliationId = path.split("/")[2];

      if (!reconciliationId) {
        throw new Error("No reconciliation id found");
      }

      await exportReconciliation(reconciliationId);

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

  // Add plan validation helper
  const hasPlanAccess = (featureType: "export" | "unlink" | "match") => {
    if (!featureType) return false;

    switch (userPlan) {
      case "starter":
        return true;
      case "basic":
        return false;
      default:
        return true; // business plan has all features
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
    <>
    { loading ? (<Loader />) : authenticated ?
    (<div className="space-y-3 py-6">
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in duration-500">
          <SuccessToast
            message={toastMessage}
            onClose={() => setShowSuccessToast(false)}
          />
        </div>
      )}

      {/* Conditional export button */}
      <div className="flex flex-col gap-4 md:flex-row justify-between mb-4">
        <h1 className="text-2xl font-semibold">Matched Results</h1>
        <div className="flex gap-4">
          <a href="/file-upload">
            <button
              type="button"
              className="px-6 py-4 border border-[#2E604A] !bg-[#2E604A] !text-white font-medium hover:bg-[#2E604A]/90 rounded-md w-[150px] h-12 flex items-center justify-center cursor-pointer"
            >
              Re-upload
            </button>
          </a>
          {//hasPlanAccess("export") && (
            <button
              type="button"
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
          //)
          }
        </div>
      </div>

      {/* Transaction Cards */}
      {paginatedData.map((item, index) => {
        const possibleMatches =
          item.statements !== null
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
            key={`transaction-${item.reconciliation_pair_id || index}`}
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
              {item.statements?.map(
                (stmt) =>
                  stmt.bank_txn !== null && (
                    <div
                      className="space-y-2"
                      key={`bank-stmt-${stmt.bank_txn.id}`}
                    >
                      <div className="flex justify-between">
                        <div className="flex flex-col">
                          <div className="text-sm font-semibold text-gray-900">
                            Bank Statement
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-gray-700">
                              {stmt.bank_txn?.date}
                            </div>
                            <div className="text-lg text-gray-700">
                              {stmt.bank_txn?.description}
                            </div>
                          </div>
                        </div>

                        <div className="font-medium text-gray-600">
                          {stmt.bank_txn?.amount}
                        </div>
                      </div>

                      {item.matched && (
                        <div className="flex gap-3 items-center">
                          {hasPlanAccess("unlink") && (
                            <button
                              type="button"
                              title="Unlink matching transactions"
                              className="cursor-pointer inline-block border-[0.5px] border-[#007A55] p-2 rounded-3xl group hover:bg-[#CEFFED]"
                              onClick={() => {
                                setShowUnlinkModalMobile(true);
                                setSelectedRow(item);
                              }}
                            >
                              <StatusBadge matched={item.matched} />
                            </button>
                          )}

                          <hr className="border border-gray-200/70 flex-1" />
                        </div>
                      )}
                    </div>
                  )
              )}

              {/* Company Ledger - Only show if matched */}
              {item.ledgers?.map(
                (ldgr) =>
                  ldgr.ledger_txn !== null && (
                    <div
                      className="flex justify-between"
                      key={`ledger-txn-${ldgr.ledger_txn.id}`}
                    >
                      <div className="flex flex-col">
                        <div className="text-sm font-semibold text-gray-900">
                          Company Ledger
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-700">
                            {ldgr.ledger_txn?.date}
                          </div>
                          <div className="text-lg text-gray-700">
                            {ldgr.ledger_txn?.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between items-end">
                        <div className="font-medium text-gray-600">
                          {ldgr.ledger_txn?.amount}
                        </div>

                        {item.statements !== null && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="size-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4 text-gray-600" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRow(item);
                                  setShowUnlinkModal(true);
                                }}
                                className="gap-0.5"
                              >
                                <CheckIcon className="text-[#333333] h-7 w-7" />
                                <span className="text-sm text-nowrap text-[#333333] cursor-pointer">
                                  Unlink Matched
                                </span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  )
              )}

              {/* Show Unmatched status if not matched */}
              {!item.matched && (
                <div className="pt-1 flex flex-col justify-between items-start gap-5">
                  <div className="inline-block border-[0.5px] border-[#C50700] p-2 rounded-3xl">
                    <StatusBadge matched={false} />
                  </div>

                  <div className="flex justify-between items-center gap-3 w-full">
                    {hasPlanAccess("match") && (
                      <QuickFindAndMatchComboBox
                        commandProps={{
                          label: "Select possible match",
                        }}
                        defaultOptions={transactionOptions}
                        onSearchSync={handleSearch}
                        placeholder="Find possible match"
                        hidePlaceholderWhenSelected
                        onConfirm={(option) => {
                          const selectedOption: FrontendTransaction = {
                            id: option.id,
                            description: option.description,
                            date: option.date,
                            amount: option.amount,
                          };
                          console.log("Confirmed:", { selectedOption, option });

                          if (item.ledgers) {
                            onMatch(
                              [selectedOption],
                              item.ledgers.map((ledger) => ledger.ledger_txn)
                            );
                          }

                          if (item.statements) {
                            onMatch(
                              item.statements.map(
                                (statement) => statement.bank_txn
                              ),
                              [selectedOption]
                            );
                          }
                        }}
                        emptyIndicator={
                          <p className="text-center text-sm">
                            No transactions found
                          </p>
                        }
                      />
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="gap-0.5"
                          onClick={() => {
                            setSelectedRow(item);
                            setModalOpen(true);
                          }}
                        >
                          <CheckIcon className="text-[#333333] h-7 w-7" />
                          <span className="text-sm text-nowrap text-[#333333] cursor-pointer">
                            Find Possible Match
                          </span>
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
        reconciledDataRow={selectedRow}
        potentialMatches={possibleMatches}
        onMatch={onMatch}
      />

      {hasPlanAccess("unlink") && (
        <UnlinkModal
          isOpen={showUnlinkModalMobile}
          isLoading={isLoading}
          onClose={() => {
            setShowUnlinkModalMobile(false);
            setSelectedRow(null);
          }}
          onConfirm={async () => {
            if (!selectedRow) return;

            if (selectedRow.statements && selectedRow.ledgers) {
              await onUnlink(
                selectedRow.statements.map((statement) => statement.bank_txn),
                selectedRow.ledgers.map((ledger) => ledger.ledger_txn)
              );
              setSelectedRow(null);
            }
          }}
        />
      )}
    </div>) : (<Unauthenticated />) }
    </>
  );
}
