"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import UploadCard from "./UploadCard";
import UploadModal from "./UploadModal";


import { reconcileFiles } from "@/lib/api";
import { FileUploadLayoutProps } from "./types";
import Container from "@/components/Container";
import ErrorModal from "@/components/modal/ErrorModal";

export default function FileUploadLayout({
  onReconcile,
}: FileUploadLayoutProps) {
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

  // Load files from localStorage on mount
  useEffect(() => {
    const loadSavedFile = (key: string) => {
      const saved = localStorage.getItem(key);
      if (saved) {
        const { name, content } = JSON.parse(saved);
        return new File([content], name, { type: "text/csv" });
      }
      return null;
    };

    setBankStatement(loadSavedFile("bankStatement"));
    setCompanyLedger(loadSavedFile("companyLedger"));
  }, []);

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

  const handleReconciliation = async () => {
    if (!bankStatement || !companyLedger) return;

    setShowUploadModal(true);
    setReconcileProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setReconcileProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      console.log("Starting reconciliation process...");

      const result = await reconcileFiles(
        bankStatement,
        companyLedger,
        "amount"
      );
      console.log("Reconciliation result:", result);

      if ((result.status = "success")) {
        localStorage.setItem("reconciliation", JSON.stringify(result.data));
      } else {
        setShowErrorModal(true);
      }

      clearInterval(progressInterval);
      setReconcileProgress(100);

      // Wait for progress animation to complete
      setTimeout(() => {
        setShowUploadModal(false);
        onReconcile(bankStatement, companyLedger);
      }, 1000);
      onReconcile(bankStatement, companyLedger);
    } catch (error) {
      console.error("Error in reconciliation handler:", error);
      setShowUploadModal(false);
      setShowErrorModal(true);
    }
   
  };

  const existingFiles = [bankStatement?.name, companyLedger?.name].filter(
    Boolean
  ) as string[];

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
        disabled={!bankStatement || !companyLedger}
        className="mt-[40px] w-full md:w-[552px] h-[64px] bg-[#2E604A] 
                  disabled:bg-opacity-50 px-4 md:px-[200px] py-[16px] 
                  rounded-[8px] mx-auto block"
      >
        Reconcile
      </Button>

      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        progress={reconcileProgress}
      />

      {showErrorModal && (
        // <ErrorUploadModal onClose={() => setShowErrorModal(false)} />
        <ErrorModal open={showErrorModal} onOpenChange={() => setShowErrorModal(false)}  title="Oops!" message="Something went wrong" buttonTitle="Go to Upload" buttonHref="/file-upload"/>
      )}
    </Container>
  );
}
