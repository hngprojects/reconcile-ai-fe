"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import UploadCard from "./UploadCard";
import UploadModal from "./UploadModal";
import { reconcileFiles } from "@/src/lib/api";
import { FileUploadLayoutProps } from "./types";
import Container from "@/src/components/Container";
import ErrorModal from "@/src/components/modal/ErrorModal";
import { transformReconciliationData } from "../../revamped-reconciliation/helpers/transformReconciliationData";
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
  const [showUploadModal, setShowUploadModal] = useState(false);
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

      setShowUploadModal(true);

      const result = await reconcileFiles(bankFiles, ledgerFiles);

      if (result.status === "error") {
        setErrorCode(result.code);
        setShowErrorModal(true);
        setShowUploadModal(false);
        return;
      }

      if (result.status === "success") {
        // Clear files after successful reconciliation
        setBankFiles([]);
        setLedgerFiles([]);
      }

      setTimeout(() => {
        onReconcile(bankFiles, ledgerFiles);
      }, 1000);
    } catch (error) {
      console.error("Error in reconciliation handler:", error);
      setShowUploadModal(false);
      const reconciliationError = error as ReconciliationError;
      setErrorCode(reconciliationError.code || reconciliationError.status);
      setShowErrorModal(true);
    }
  };

  const existingFiles = [...bankFiles, ...ledgerFiles].map((f) => f.name);

  return (
    <Container className="my-10">
      <div className="flex flex-col md:flex-row justify-center gap-[40px]">
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

      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />

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
