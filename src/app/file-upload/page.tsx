"use client";

import FileUploadLayout from "@/src/components/reconciliation/upload/FileUploadLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "@/src/components/ui/loader";

export default function FileUploadPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/");
      return;
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <Loader />;
  }

  return <FileUploadLayout onReconcile={handleReconcile} />;
}
