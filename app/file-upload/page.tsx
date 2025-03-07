"use client";

import Header from "../coming-soon/components/Header";
import FileUploadLayout from "@/components/reconciliation/upload/FileUploadLayout";

export default function FileUploadPage() {
  const handleReconcile = () => {
    // Handle reconciliation logic
  };

  return (
    <>
      <Header />
      <FileUploadLayout onReconcile={handleReconcile} />
    </>
  );
}