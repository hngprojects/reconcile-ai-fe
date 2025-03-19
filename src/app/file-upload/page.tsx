"use client";

import FileUploadLayout from "@/src/components/reconciliation/upload/FileUploadLayout";
import { useEffect } from "react";
import { useAuth } from "@/src/components/context/AuthContext";

export default function FileUploadPage() {
  // const router = useRouter();
  const { getUserDetails } = useAuth();

  const handleReconcile = async (
    bankFiles: File[],
    ledgerFiles: File[],
  ): Promise<void> => {
    try {
      // Store the files in localStorage or state management if needed
      localStorage.setItem(
        "bankFiles",
        JSON.stringify(bankFiles.map((f) => f.name)),
      );
      localStorage.setItem(
        "ledgerFiles",
        JSON.stringify(ledgerFiles.map((f) => f.name)),
      );

      // Navigate to results page or handle as needed
      // router.push("/reconciliation");

    } catch (error) {
      console.error("Error handling reconciliation:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        localStorage.setItem("access_token", token); // Store token
        getUserDetails(token);
      }
    }
  }, []);

  return <FileUploadLayout onReconcile={handleReconcile} />;
}
