"use client";

import FileUploadLayout from "@/src/components/reconciliation/upload/FileUploadLayout";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/components/context/AuthContext";
import { Loader } from "@/src/components/ui/loader";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";

export default function FileUploadPage() {
  const { getUserDetails } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        localStorage.setItem("access_token", token);
        getUserDetails(token);
      }
      setIsLoading(false);
    }
  }, [getUserDetails]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ProtectedRoute>
      <FileUploadLayout onReconcile={handleReconcile} />
    </ProtectedRoute>
  )
}
