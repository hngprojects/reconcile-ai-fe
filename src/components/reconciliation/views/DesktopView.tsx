"use client";

import { useEffect, useState } from "react";
import { BankTable } from "../tables/BankTable";
import { LedgerTable } from "../tables/LedgerTable";
import { PaginationControls } from "../PaginationControls";
import { StatusTable } from "../tables/StatusTable";
import { DownloadCloudIcon, Loader2 } from "lucide-react";
import { SuccessToast } from "../SuccessToast";
import UnlinkModal from "../../modal/UnlinkModal";
import { useReconciliation } from "@/src/context/ReconciliationProvider";
import { exportReconciliation } from "@/src/lib/api";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopView() {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
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
  const path = usePathname();

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
    } catch (error) {
      console.error("Export error:", error);
      setToastMessage(
        error instanceof Error ? error.message : "Failed to export data"
      );
      setShowErrorToast(true);
    } finally {
      setIsExporting(false);
    }
  };

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
        <div className="flex gap-4">
          <Link
            className=" h-[44px] px-6 py-3 bg-[#2E604A] text-white rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/90 cursor-pointer"
            href="/file-upload"
          >
            Re-upload
          </Link>
          {hasPlanAccess("export") && (
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
          )}
        </div>
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
      {
        //hasPlanAccess("unlink") && (
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
              await onUnlink(
                selectedRow.statements.map((stat) => stat.bank_txn),
                selectedRow.ledgers.map((ledg) => ledg.ledger_txn)
              );
              setSelectedRow(null);
            }
          }}
        />
        //)
      }
    </div>
  );
}
