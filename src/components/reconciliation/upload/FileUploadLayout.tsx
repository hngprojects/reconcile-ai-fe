"use client";

import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import UploadCard from "./UploadCard";
import UploadModal from "./UploadModal";

import { reconcileFiles } from "@/src/lib/api";
import { FileUploadLayoutProps } from "./types";
import Container from "@/src/components/Container";
import ErrorModal from "@/src/components/modal/ErrorModal";
import { checkRateLimit, incrementAttempts } from "@/src/utils/rateLimit";
import { useAuth } from "@/src/components/context/AuthContext";
import { REQUIRED_HEADERS } from "@/src/components/reconciliation/main/reconciliation";

interface ReconciliationError extends Error {
  code?: number;
  status?: number;
}

const validateFileHeaders = async (
  file: File,
  type: "bankStatement" | "companyLedger"
): Promise<boolean> => {
  const text = await file.text();
  const headers = text
    .split("\n")[0]
    .split(",")
    .map((h) => h.trim());
  return REQUIRED_HEADERS[type].every((required) =>
    headers.some((h) => h.toLowerCase() === required.toLowerCase())
  );
};

export default function FileUploadLayout({
  onReconcile,
}: FileUploadLayoutProps) {
  const { isAuthenticated } = useAuth();
  const [bankStatement, setBankStatement] = useState<File | null>(null);
  const [companyLedger, setCompanyLedger] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState({ bank: 0, ledger: 0 });
  const [isUploading, setIsUploading] = useState({
    bank: false,
    ledger: false,
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [reconcileProgress, setReconcileProgress] = useState(0);
  const [errorCode, setErrorCode] = useState<number>();

  useEffect(() => {
    localStorage.removeItem("bankStatement");
    localStorage.removeItem("companyLedger");
    console.log("Cleared existing CSV files from localStorage");
  }, []);

  // Load files from localStorage on mount
  // useEffect(() => {
  //   const loadSavedFile = (key: string) => {
  //     const saved = localStorage.getItem(key);
  //     if (saved) {
  //       const { name, content } = JSON.parse(saved);
  //       return new File([content], name, { type: "text/csv" });
  //     }
  //     return null;
  //   };

  //   setBankStatement(loadSavedFile("bankStatement"));
  //   setCompanyLedger(loadSavedFile("companyLedger"));
  // }, []);

  // Save files to localStorage when they change
  useEffect(() => {
    const saveFile = async (file: File | null, key: string) => {
      if (file) {
        localStorage.setItem(
          key,
          JSON.stringify({
            name: file.name,
            content: await file.text(),
          })
        );
      } else {
        localStorage.removeItem(key);
      }
    };

    saveFile(bankStatement, "bankStatement");
    saveFile(companyLedger, "companyLedger");
  }, [bankStatement, companyLedger]);

  const handleFileUpload = async (file: File, type: "bank" | "ledger") => {
    if (!file.name.endsWith(".csv")) return;

    // Check if same file is being uploaded to the other box
    if (type === "bank" && companyLedger?.name === file.name) {
      return; // Don't allow same file in both boxes
    }
    if (type === "ledger" && bankStatement?.name === file.name) {
      return; // Don't allow same file in both boxes
    }

    const targetState = type === "bank" ? setBankStatement : setCompanyLedger;
    targetState(file);

    setIsUploading((prev) => ({ ...prev, [type]: true }));
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prev) => ({ ...prev, [type]: progress }));
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading((prev) => ({ ...prev, [type]: false }));
      }
    }, 200);
  };

  const clearUploadedFiles = () => {
    localStorage.removeItem("bankStatement");
    localStorage.removeItem("companyLedger");
    setBankStatement(null);
    setCompanyLedger(null);
  };

  // clear local storage on mount
  useEffect(() => {
    clearUploadedFiles();
  }, []);

  const handleReconciliation = async () => {
    if (!bankStatement || !companyLedger) return;

    try {
      // Validate headers before proceeding
      const [isBankValid, isLedgerValid] = await Promise.all([
        validateFileHeaders(bankStatement, "bankStatement"),
        validateFileHeaders(companyLedger, "companyLedger"),
      ]);

      if (!isBankValid || !isLedgerValid) {
        setErrorCode(422);
        setShowErrorModal(true);
        return;
      }

      // Rate limit check for guest users
      if (!isAuthenticated && checkRateLimit()) {
        console.log("Rate limit reached for guest user");
        setErrorCode(429);
        setShowErrorModal(true);
        return;
      }

      setShowUploadModal(true);
      setReconcileProgress(0);

      const progressInterval = setInterval(() => {
        setReconcileProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      console.log("Starting reconciliation process...");

      const result = await reconcileFiles(
        bankStatement,
        companyLedger,
        "amount"
      );

      if (result.status === "error") {
        setErrorCode(result.code);
        setShowErrorModal(true);
        return;
      }

      // Increment attempt count for guest users
      if (!isAuthenticated) {
        incrementAttempts();
        console.log("Incrementing guest attempts");
      }

      console.log("Reconciliation result:", result);

      if (result.status === "success") {
        localStorage.setItem(
          "reconciliation",
          JSON.stringify(result.data.data)
        );
        clearUploadedFiles();
      } else {
        setErrorCode(result.code);
        setShowErrorModal(true);
      }

      clearInterval(progressInterval);
      setReconcileProgress(100);

      // Wait for progress animation to complete
      setTimeout(() => {
        setShowUploadModal(false);
        onReconcile(bankStatement, companyLedger);
      }, 1000);
    } catch (error: unknown) {
      console.error("Error in reconciliation handler:", error);
      setShowUploadModal(false);
      const reconciliationError = error as ReconciliationError;
      setErrorCode(reconciliationError.code || reconciliationError.status);
      setShowErrorModal(true);
    }
  };

  const existingFiles = [bankStatement?.name, companyLedger?.name].filter(
    Boolean
  ) as string[];
  const isAnyFileUploading = isUploading.bank || isUploading.ledger;

  return (
    <Container className="my-10">
      <div className="flex flex-col md:flex-row justify-center gap-[40px]">
        <UploadCard
          title="Upload Bank Statement"
          fileUploaded={!!bankStatement}
          fileName={bankStatement?.name}
          onFileSelect={(file) => handleFileUpload(file, "bank")}
          onFileDelete={() => setBankStatement(null)}
          isUploading={isUploading.bank}
          uploadProgress={uploadProgress.bank}
          existingFiles={existingFiles}
        />
        <UploadCard
          title="Upload Company Ledger"
          fileUploaded={!!companyLedger}
          fileName={companyLedger?.name}
          onFileSelect={(file) => handleFileUpload(file, "ledger")}
          onFileDelete={() => setCompanyLedger(null)}
          isUploading={isUploading.ledger}
          uploadProgress={uploadProgress.ledger}
          existingFiles={existingFiles}
        />
      </div>

      <Button
        onClick={handleReconciliation}
        disabled={!bankStatement || !companyLedger || isAnyFileUploading}
        className="mt-[40px] w-full md:w-[552px] h-[64px] bg-[#2E604A] 
                  disabled:bg-opacity-50 px-4 md:px-[200px] py-[16px] 
                  rounded-[8px] mx-auto block cursor-pointer"
      >
        Reconcile
      </Button>

      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        progress={reconcileProgress}
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
