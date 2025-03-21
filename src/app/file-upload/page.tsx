"use client";

import FileUploadLayout from "@/src/components/reconciliation/upload/FileUploadLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "@/src/components/ui/loader";
import { useAuth } from "@/src/components/context/AuthContext";

export default function FileUploadPage() {
  const router = useRouter();
  const { user } = useAuth();
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
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      if (!token || !user) {
        router.push("/");
        return;
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router, user]);

  if (isLoading) {
    return <Loader />;
  }

  return <FileUploadLayout onReconcile={handleReconcile} />;
}
