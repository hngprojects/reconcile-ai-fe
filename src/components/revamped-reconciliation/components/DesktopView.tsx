"use client";

import { useEffect, useState } from "react";
import { BankTable } from "./BankTable";
import { LedgerTable } from "./LedgerTable";
import { PaginationControls } from "./PaginationControls";
import { StatusTable } from "./StatusTable";

// import { DownloadCloudIcon, Loader2 } from "lucide-react";
import { SuccessToast } from "../../reconciliation/SuccessToast";
// import { revertToBackendFormat } from "../helpers/revertBackToBackendFormat";
// import { ReconciliationResponse } from "../types/frontendResponseTypes";
import UnlinkModal from "../../modal/UnlinkModal";
import { useReconciliation } from "../context/ReconciliationProvider";

export default function DesktopView() {
  const [showErrorModal, setShowErrorModal] = useState(false);
  // const [isExporting, setIsExporting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const {
    handleUnlink: onUnlink,
    showUnlinkModal,
    setShowUnlinkModal,
    isLoading,
    selectedRow,
    setSelectedRow,
    userPlan,
  } = useReconciliation();

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
  // const handleExport = async () => {
  //   try {
  //     setIsExporting(true);

  //     // Get reconciliation data from localStorage
  //     // const reconciliationData = localStorage.getItem("reconciliation");
  //     const localData = localStorage.getItem("reconciliation") as string;

  //     if (!localData) {
  //       throw new Error("No reconciliation data found");
  //     }

  //     const parsedData = JSON.parse(localData) as ReconciliationResponse;

  //     const reconciledData = revertToBackendFormat(parsedData);

  //     console.log([reconciledData]);

  //     // const parsedData: ReconciliationResponse = localData
  //     //   ? JSON.parse(localData)
  //     //   : ({} as ReconciliationResponse);

  //     // Format the data according to the API's expected structure
  //     const formattedData = {
  //       matches: reconciledData.matches.map((match) => ({
  //         ...match,
  //         status: match.status || "matched",
  //       })),
  //       unmatched: reconciledData.unmatched || {},
  //       only_in_file1: reconciledData.only_in_file1 || [],
  //       only_in_file2: reconciledData.only_in_file2 || [],
  //     };

  //     console.log({ formattedData });

  //     // Send POST request to API
  //     const response = await fetch(
  //       "https://api-dev.reconxi.com/api/v1/reconcile/export",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           data: formattedData,
  //         }),
  //       }
  //     );

  //     // Check for errors with better error reporting
  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => null);
  //       const errorMessage =
  //         errorData?.message || `Export failed with status: ${response.status}`;
  //       console.error("API error:", errorData);
  //       throw new Error(errorMessage);
  //     }

  //     // Get the blob from the response
  //     const blob = await response.blob();

  //     // Create a download link and trigger the download
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = `reconciliation_export_${
  //       new Date().toISOString().split("T")[0]
  //     }.csv`;
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(a);

  //     // Show success toast using custom component
  //     setToastMessage("Your data has been exported successfully!");
  //     setShowSuccessToast(true);
  //   } catch (error) {
  //     console.error("Export error:", error);
  //     // Show error toast using custom component
  //     setToastMessage(
  //       error instanceof Error ? error.message : "Failed to export data"
  //     );
  //     setShowErrorToast(true);
  //   } finally {
  //     setIsExporting(false);
  //   }
  // };

  return (
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

      {/* header section with conditional export button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Matched Results</h1>
        {/* <button
          type="button"
          className="px-6 py-4 border border-[#2E604A] text-[#2E604A] font-medium hover:bg-gray-100 rounded-md w-[150px] h-12 flex items-center justify-center cursor-pointer"
          // onClick={handleExport}
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
        </button> */}
        {hasPlanAccess("export") && (
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
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-2">
        {/* Bank Statement Table */}
        <div className="">
          <h2 className="mb-2 ml-2.5 text-lg font-medium">Bank Statement</h2>
          <BankTable />
        </div>

        {/* Status Column */}
        <div className="mt-[36px] w-[150px]">
          <StatusTable />
        </div>

        {/* Company Ledger Table */}
        <div className="">
          <h2 className="mb-2 ml-2.5 text-lg font-medium">Company Ledger</h2>
          <LedgerTable />
        </div>
      </div>

      <PaginationControls />

      {/* Conditionally render unlink modal based on plan */}
      {hasPlanAccess("unlink") && (
        <UnlinkModal
          isOpen={showUnlinkModal}
          isLoading={isLoading}
          onClose={() => {
            setShowUnlinkModal(false);
            setSelectedRow(null);
          }}
          onConfirm={async () => {
            if (!selectedRow) return;
                
          if (selectedRow.statements && selectedRow.ledgers) {
            await onUnlink(selectedRow.statements, selectedRow.ledgers);
              setSelectedRow(null);
            }
          }}
        />
      )}
    </div>
  );
}
