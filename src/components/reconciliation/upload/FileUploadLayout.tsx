"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import UploadCard from "./UploadCard";
import { toast } from "sonner";
import { reconcileFiles } from "@/src/lib/api";
import { FileUploadLayoutProps } from "./types";
import Container from "@/src/components/Container";
import ErrorModal from "@/src/components/modal/ErrorModal";
import { useAuth } from "@/src/components/context/AuthContext";
import { countCsvRows } from "@/src/utils/csvHelpers";

interface ReconciliationError extends Error {
  code?: number;
  status?: number;
}

export default function FileUploadLayout({
  onReconcile,
}: FileUploadLayoutProps) {
  const { isAuthenticated } = useAuth();
  const [bankFiles, setBankFiles] = useState<File[]>([]);
  const [ledgerFiles, setLedgerFiles] = useState<File[]>([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorCode, setErrorCode] = useState<number>();

  const handleFileDelete = (fileName: string, type: "bank" | "ledger") => {
    if (type === "bank") {
      setBankFiles((files) => files.filter((f) => f.name !== fileName));
    } else {
      setLedgerFiles((files) => files.filter((f) => f.name !== fileName));
    }
  };

  const validateRowCount = async (files: File[]): Promise<boolean> => {
    if (isAuthenticated) return true;

    const totalRows = await Promise.all(files.map(countCsvRows));
    return totalRows.reduce((sum, count) => sum + count, 0) <= 100;
  };

  const handleReconciliation = async () => {
    if (bankFiles.length === 0 || ledgerFiles.length === 0) return;

    try {
      // Validate row count for guest users
      if (!isAuthenticated) {
        const [bankValid, ledgerValid] = await Promise.all([
          validateRowCount(bankFiles),
          validateRowCount(ledgerFiles),
        ]);

        if (!bankValid || !ledgerValid) {
          setErrorCode(403);
          setShowErrorModal(true);
          return;
        }
      }

      const toastId = toast.loading(
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Processing Reconciliation</h2>
          <p className="text-sm text-gray-600">
            {isAuthenticated
              ? "You will get an email notification when it's ready"
              : "Your files are being processed"}
          </p>
        </div>,
        {
          duration: Infinity,
        },
      );

      const result = await reconcileFiles(bankFiles, ledgerFiles);

      if (result.status === "error") {
        toast.dismiss(toastId);
        setErrorCode(result.code);
        setShowErrorModal(true);

        toast.error("Reconciliation failed. Please try again.", {
          id: toastId,
        });
        return;
      }

      if (result.status === "success") {
        setTimeout(() => {
          toast.dismiss(toastId); // Dismiss the loading toast after 20 seconds
        }, 20000);

        localStorage.setItem(
          "reconciliation_id",
          result.data.reconciliation_id,
        );
        setBankFiles([]);
        setLedgerFiles([]);

        toast.success("Reconciliation completed successfully! Check you mail for reconcilation result.", {
          id: toastId,
        });
      }

      setTimeout(() => {
        onReconcile(bankFiles, ledgerFiles);
      }, 1000);
    } catch (error) {
      console.error("Error in reconciliation handler:", error);
      const reconciliationError = error as ReconciliationError;
      setErrorCode(reconciliationError.code || reconciliationError.status);
      setShowErrorModal(true);
    }
  };

  const existingFiles = [...bankFiles, ...ledgerFiles].map((f) => f.name);

  return (
    <Container className="my-10">
      <div className="flex flex-col lg:flex-row justify-center gap-[40px]">
        <UploadCard
          title="Upload Bank Statement"
          type="bank"
          files={bankFiles}
          onFilesSelect={setBankFiles}
          onFileDelete={(fileName) => handleFileDelete(fileName, "bank")}
          existingFiles={existingFiles}
        />
        <UploadCard
          title="Upload Company Ledger"
          type="ledger"
          files={ledgerFiles}
          onFilesSelect={setLedgerFiles}
          onFileDelete={(fileName) => handleFileDelete(fileName, "ledger")}
          existingFiles={existingFiles}
        />
      </div>

      <Button
        onClick={handleReconciliation}
        disabled={bankFiles.length === 0 || ledgerFiles.length === 0}
        className="mt-[40px] w-full md:w-[552px] h-[64px] bg-[#2E604A] 
                  disabled:bg-opacity-50 px-4 md:px-[200px] py-[16px] 
                  rounded-[8px] mx-auto block cursor-pointer"
      >
        Reconcile
      </Button>

      {showErrorModal && (
        <ErrorModal
          open={showErrorModal}
          onOpenChange={() => setShowErrorModal(false)}
          errorCode={errorCode}
        />
      )}
    </Container>
  );
}
