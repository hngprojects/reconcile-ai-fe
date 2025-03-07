"use client";

import Header from "../coming-soon/components/Header";
import FileUploadLayout from "@/components/reconciliation/upload/FileUploadLayout";
import { useRouter } from "next/navigation";

export default function FileUploadPage() {
  const router = useRouter();

  const handleReconcile = async (_file1: File, _file2: File) => {
    try {
      router.push("/reconciliation");
    } catch (error) {
      console.error("Reconciliation failed:", error);
    }
  };

  return (
    <>
      <Header />
      <FileUploadLayout onReconcile={handleReconcile} />
    </>
  );
}
