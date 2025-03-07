"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import UploadCard from "./UploadCard";
import { FileUploadLayoutProps } from "./types";

export default function FileUploadLayout({
  onReconcile,
}: FileUploadLayoutProps) {
  const [bankStatement, setBankStatement] = useState<File | null>(null);
  const [companyLedger, setCompanyLedger] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState({
    bank: 0,
    ledger: 0,
  });
  const [isUploading, setIsUploading] = useState({
    bank: false,
    ledger: false,
  });

  const simulateUpload = (type: "bank" | "ledger") => {
    setIsUploading({ ...isUploading, [type]: true });
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prev) => ({ ...prev, [type]: progress }));
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading({ ...isUploading, [type]: false });
      }
    }, 500);
  };

  const handleFileUpload = (file: File, type: "bank" | "ledger") => {
    if (!file.name.endsWith(".csv")) return;

    if (type === "bank") {
      setBankStatement(file);
    } else {
      setCompanyLedger(file);
    }
    simulateUpload(type);
  };

  return (
    <div className="mt-[60px] mx-auto">
      <div className="flex flex-row flex-wrap justify-center gap-[40px]">
        <UploadCard
          title="Upload Bank Statement"
          fileUploaded={!!bankStatement}
          fileName={bankStatement?.name}
          onFileSelect={(file) => handleFileUpload(file, "bank")}
          onFileDelete={() => setBankStatement(null)}
          isUploading={isUploading.bank}
          uploadProgress={uploadProgress.bank}
        />
        <UploadCard
          title="Upload Company Ledger"
          fileUploaded={!!companyLedger}
          fileName={companyLedger?.name}
          onFileSelect={(file) => handleFileUpload(file, "ledger")}
          onFileDelete={() => setCompanyLedger(null)}
          isUploading={isUploading.ledger}
          uploadProgress={uploadProgress.ledger}
        />
      </div>

      <Button
        onClick={onReconcile}
        disabled={!bankStatement || !companyLedger}
        className="mt-[40px] w-[552px] h-[64px] bg-[#2E604A] 
                  disabled:bg-opacity-50 px-[200px] py-[16px] 
                  rounded-[8px] mx-auto block"
      >
        Reconcile
      </Button>
    </div>
  );
}
