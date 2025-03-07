"use client";

import Header from "../coming-soon/components/Header";
import FileUploadLayout from "@/components/reconciliation/upload/FileUploadLayout";
import { useRouter } from "next/navigation";

export default function FileUploadPage() {
  const router = useRouter();

  const handleReconcile = async (file1: File, file2: File) => {
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
