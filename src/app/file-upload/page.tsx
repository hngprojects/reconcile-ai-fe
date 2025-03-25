"use client";

import FileUploadLayout from "@/src/components/reconciliation/upload/FileUploadLayout";
import { Loader } from "@/src/components/ui/loader";
import { useRequireAuth } from "@/src/hooks/useRequireAuth";
import UnAuthorized from "@/src/components/reconciliation/UnAuthorized";

export default function FileUploadPage() {
  const { isLoading, isAuthenticated } = useRequireAuth();

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

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <UnAuthorized />;
  }

  return <FileUploadLayout onReconcile={handleReconcile} />;
}
