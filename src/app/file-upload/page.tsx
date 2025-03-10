"use client";

import FileUploadLayout from "@/src/components/reconciliation/upload/FileUploadLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/src/components/context/AuthContext";

export default function FileUploadPage() {
  const router = useRouter();
  const { getUserDetails } = useAuth();

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const handleReconcile = async (_file1: File, _file2: File) => {
    try {
      router.push("/reconciliation");
    } catch (error) {
      console.error("Reconciliation failed:", error);
    }
  };
  /* eslint-enable @typescript-eslint/no-unused-vars */

  useEffect(() => {
    if (typeof window !== "undefined") {
          const urlParams = new URLSearchParams(window.location.search);
          const token = urlParams.get("token");
          console.log(token);

          if (token) {
              localStorage.setItem("access_token", token); // Store token
              getUserDetails(token);
          }
      }
  });

  return <FileUploadLayout onReconcile={handleReconcile} />;
}
