"use client";

import exportIcon from "@/public/assets/images/download-cloud-02.png";
import Image from "next/image";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { cn } from "@/src/lib/utils";
import { ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ReconciliationTables } from "./ReconciliationTables";
import { SuccessToast } from "../SuccessToast";
import { useReconciliationLogic } from "@/src/components/reconciliation/main/useReconciliationLogic";

interface Transaction {
  Date: string;
  Description: string;
  Amount: number | string;
  [key: string]: string | number;
}

interface Match {
  file1_transaction: Transaction;
  file2_transaction: Transaction;
  status?: string;
}

interface ReconciliationData {
  matches: Match[];
  unmatched?: Record<string, Transaction[]>;
  only_in_file1?: Transaction[];
  only_in_file2?: Transaction[];
}

export function DesktopReconciliationView() {
  const {
    pagination,
    totalItems,
    onPreviousPage,
    onNextPage,
    canPreviousPage,
    canNextPage,
    onRowsPerPageChange,
    showErrorModal,
    setShowErrorModal,
  } = useReconciliationLogic();

  const [isExporting, setIsExporting] = useState(false);

  // Add state for custom toasts
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Calculate current page range
  const pageStart = pagination.pageIndex * pagination.pageSize + 1;
  const pageEnd = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    totalItems
  );

  // array of row options
  const rowOptions = [10, 25, 50];

  // Add a function to determine if an option should be disabled
  const isOptionDisabled = (size: number) => {
    return (size > 10 && totalItems <= 10) || (size > 25 && totalItems <= 25);
  };

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

  // Export function
  const handleExport = async () => {
    try {
      setIsExporting(true);

      // Get reconciliation data from localStorage
      const reconciliationData = localStorage.getItem("reconciliation");

      if (!reconciliationData) {
        throw new Error("No reconciliation data found");
      }

      const parsedData = JSON.parse(reconciliationData) as ReconciliationData;

      // Format the data according to the API's expected structure
      const formattedData = {
        matches: (parsedData.matches || []).map((match: Match) => ({
          ...match,
          status: match.status || "matched",
        })),
        unmatched: parsedData.unmatched || {},
        only_in_file1: parsedData.only_in_file1 || [],
        only_in_file2: parsedData.only_in_file2 || [],
      };

      // Send POST request to API
      const response = await fetch(
        "https://api-dev.reconxi.com/api/v1/reconcile/export",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: formattedData,
          }),
        }
      );

      // Check for errors with better error reporting
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.message || `Export failed with status: ${response.status}`;
        console.error("API error:", errorData);
        throw new Error(errorMessage);
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reconciliation_export_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Show success toast using custom component
      setToastMessage("Your data has been exported successfully!");
      setShowSuccessToast(true);
    } catch (error) {
      console.error("Export error:", error);
      // Show error toast using custom component
      setToastMessage(
        error instanceof Error ? error.message : "Failed to export data"
      );
      setShowErrorToast(true);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <div className="space-y-6 py-6">
        {/* Custom Toast Message */}
        {showSuccessToast && (
          <div className="fixed top-4 right-4 z-50 animate-in fade-in duration-500">
            <SuccessToast
              message={toastMessage}
              onClose={() => {
                setShowSuccessToast(!setShowSuccessToast);
              }}
            />
          </div>
        )}

        {/* header section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Matched Results</h1>
          <button
            className="px-[57px] py-[16px] bg-[transparent] border-[1px] border-[#2E604A] text-[#2E604A] rounded-md w-[150px] h-[50px] flex items-center justify-center  "
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

        <ReconciliationTables />

        {/* Pagination section */}
        <div className="flex items-center justify-between py-4 max-w-[1440px] mx-auto border-t-1 border-solid border-[#EFF1F3]">
          <div className="flex items-center gap-3">
            <div className="text-sm text-[#344054] font-medium">
              Rows per page
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-[4px] border-1 border-solid border-[#EFF1F3] px-2 py-1.5">
                <span className="text-sm text-[#344054] font-medium">
                  {pagination.pageSize}
                </span>
                <ChevronDown className="h-4 w-4 text-[#292D32]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {rowOptions.map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => onRowsPerPageChange(size)}
                    disabled={isOptionDisabled(size)}
                    className={cn(
                      "text-sm cursor-pointer",
                      isOptionDisabled(size) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="text-sm text-[#344054] font-medium">
              {pageStart}-{pageEnd} of {totalItems}{" "}
              {totalItems > 1 ? "rows" : "row"}
            </div>
          </div>

          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPreviousPage}
              disabled={!canPreviousPage}
              className="cursor-pointer"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onNextPage}
              disabled={!canNextPage}
              className="cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
