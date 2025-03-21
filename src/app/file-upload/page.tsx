"use client";

import FileUploadLayout from "@/src/components/reconciliation/upload/FileUploadLayout";
import { useAuth } from "@/src/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FileUploadPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const handleReconcile = async (
    bankFiles: File[],
    ledgerFiles: File[],
  ): Promise<void> => {
    try {
      localStorage.setItem(
        "bankFiles",
        JSON.stringify(bankFiles.map((f) => f.name)),
      );
      localStorage.setItem(
        "ledgerFiles",
        JSON.stringify(ledgerFiles.map((f) => f.name)),
      );
    } catch (error) {
      console.error("Error handling reconciliation:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <FileUploadLayout onReconcile={handleReconcile} />;
}
