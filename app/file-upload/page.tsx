"use client";

import FileUploadLayout from "@/components/reconciliation/upload/FileUploadLayout";
import { useRouter } from "next/navigation";

export default function FileUploadPage() {
  const router = useRouter();

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const handleReconcile = async (_file1: File, _file2: File) => {
    try {
      router.push("/reconciliation");
    } catch (error) {
      console.error("Reconciliation failed:", error);
    }
  };
  /* eslint-enable @typescript-eslint/no-unused-vars */

  return <FileUploadLayout onReconcile={handleReconcile} />;
}
