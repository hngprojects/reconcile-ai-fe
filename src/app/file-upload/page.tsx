"use client";

import FileUploadLayout from "@/src/components/reconciliation/upload/FileUploadLayout";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";

export default function FileUploadPage() {
  const handleReconcile = async (
    bankFiles: File[],
    ledgerFiles: File[]
  ): Promise<void> => {
    try {
      localStorage.setItem(
        "bankFiles",
        JSON.stringify(bankFiles.map((f) => f.name))
      );
      localStorage.setItem(
        "ledgerFiles",
        JSON.stringify(ledgerFiles.map((f) => f.name))
      );
    } catch (error) {
      console.error("Error handling reconciliation:", error);
    }
  };
  return (
    <ProtectedRoute>
      <FileUploadLayout onReconcile={handleReconcile} />
    </ProtectedRoute>
  );
}
