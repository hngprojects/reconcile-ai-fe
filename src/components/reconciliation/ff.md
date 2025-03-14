<!-- "use client";

import { Button } from "@/src/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/src/lib/utils";
import { useReconciliationLogic } from "@/src/hooks/useReconciliationLogic";
import Image from "next/image";
import exportIcon from "@/public/assets/images/download-cloud-02.png";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { SearchCombobox } from "./SearchComboBox";
import { SuccessToast } from "./SuccessToast";
import { Transaction } from "@/src/types/reconciliation";

interface ReconciliationData {
  matches: Array<{
    file1_transaction: any;
    file2_transaction: any;
    status?: string;
  }>;
  unmatched?: Record<string, any[]>;
  only_in_file1?: any[];
  only_in_file2?: any[];
}

export function MobileReconciliationView() {
  const {
    combinedData,
    currentPage,
    onPreviousPage,
    onNextPage,
    canPreviousPage,
    canNextPage,
    totalItems,
    pagination,
    data,
    handleMatch,
  } = useReconciliationLogic();

  const [isExporting, setIsExporting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const paginatedData = combinedData.slice(
    currentPage * pagination.pageSize,
    (currentPage + 1) * pagination.pageSize
  );

  // Export function
  const handleExport = async () => {
    try {
      setIsExporting(true);
      const reconciliationData = localStorage.getItem("reconciliation");

      if (!reconciliationData) {
        throw new Error("No reconciliation data found");
      }

      const parsedData = JSON.parse(reconciliationData) as ReconciliationData;
      const formattedData = {
        matches: (parsedData.matches || []).map((match) => ({
          ...match,
          status: match.status || "matched",
        })),
        unmatched: parsedData.unmatched || {},
        only_in_file1: parsedData.only_in_file1 || [],
        only_in_file2: parsedData.only_in_file2 || [],
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
    } catch (error) {
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
        <h1 className="text-2xl font-semibold">Matched Result</h1>
        <button
          className="px-[57px] py-[16px] bg-[transparent] border-[1px] border-solid border-[#2E604A] text-[#2E604A] rounded-md w-[150px] h-[50px] flex items-center justify-center cursor-pointer"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Exporting...
            </>
          ) : (
            <>
              <Image
                src={exportIcon}
                alt="Export"
                width={24}
                height={24}
                className="mr-2 w-5 h-5"
              />{" "}
              Export
            </>
          )}
        </button>
      </div>

      {/* Transaction Cards */}
      {paginatedData.map((item, index) => (
        <div
          key={`${item.bankStatement.description}-${index}`}
          className={cn(
            "rounded-lg border shadow-sm",
            item.matched ? "bg-[#F3FEFA]" : "bg-[#FFF4F0]"
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
            {item.bankStatement.date &&
            item.bankStatement.description &&
            item.bankStatement.amount ? (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">
                  Bank Statement
                </div>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">
                      {item.bankStatement.date}
                    </div>
                    <div className="font-medium text-gray-900">
                      {item.bankStatement.description}
                    </div>
                  </div>
                  <div className="font-medium text-gray-900">
                    {item.bankStatement.amount}
                  </div>
                </div>
                {item.matched && (
                  <div className="pt-1">
                    <div className="flex gap-3 items-center">
                      <div className="inline-block border-[0.5px] border-[#007A55] p-2 rounded-3xl">
                        <StatusBadge matched={true} />
                      </div>
                      <hr className="border border-gray-200/70 flex-1" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="px-4 h-[64px] italic font-[300] w-full">
                <SearchCombobox
                  items={data.unmatched.unmatched_file1.map((txn) => ({
                    label: `${txn["Description"]} - ${txn["Amount"]}`,
                    value: JSON.stringify(txn),
                  }))}
                  placeholder="Find possible Match"
                  onSelect={async (value) => {
                    if (item.companyLedger) {
                      await handleMatch(
                        item.companyLedger as Transaction,
                        "statement",
                        JSON.parse(value)
                      );
                    }
                  }}
                />
              </div>
            )}

            {/* Company Ledger section with search */}
            {item.matched && item.companyLedger ? (
              <div className="space-y-2 pt-2">
                <div className="text-sm font-medium text-gray-500">
                  Company Ledger
                </div>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">
                      {item.companyLedger?.date}
                    </div>
                    <div className="font-medium text-gray-900">
                      {item.companyLedger?.description}
                    </div>
                  </div>
                  <div className="font-medium text-gray-900">
                    {item.companyLedger?.amount}
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-4 h-[64px] italic font-[300] w-full">
                <SearchCombobox
                  items={data.unmatched.unmatched_file2.map((txn) => ({
                    label: `${txn["Description"]} - ${txn["Amount"]}`,
                    value: JSON.stringify(txn),
                  }))}
                  placeholder="Find possible Match"
                  onSelect={async (value) => {
                    await handleMatch(
                      {
                        Date: item.bankStatement.date,
                        Description: item.bankStatement.description,
                        Amount: item.bankStatement.amount,
                      } as Transaction,
                      "ledger",
                      JSON.parse(value)
                    );
                  }}
                />
              </div>
            )}

            {/* Show Unmatched status if not matched */}
            {!item.matched && (
              <div className="pt-1">
                <div className="flex gap-3 items-center">
                  <div className="inline-block border-[0.5px] border-[#C50700] p-2 rounded-3xl">
                    <StatusBadge matched={false} />
                  </div>
                  <hr className="border border-gray-200/70 flex-1" />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-gray-500">
          Showing {currentPage * paginatedData.length + 1}-
          {Math.min((currentPage + 1) * paginatedData.length, totalItems)} out
          of {totalItems}
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
    </div>
  );
} -->
