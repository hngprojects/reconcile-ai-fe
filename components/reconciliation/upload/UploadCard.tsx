import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCardProps } from "./types";
import { FilePreview } from "./FilePreview";
import { UploadProgress } from "./UploadProgress";
import ErrorMessage from "./ErrorMessage";
import Image from "next/image";
import uploadIcon from "@/public/uploadIcon.svg";
import checkIcon from "@/public/check-icon.svg";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function UploadCard({
  title,
  fileUploaded,
  fileName,
  onFileSelect,
  onFileDelete,
  isUploading,
  uploadProgress = 0,
  existingFiles = [],
}: UploadCardProps) {
  const [error, setError] = useState<string>("");

  // Function to handle file validation and selection
  const handleFile = (file: File) => {
    if (!file.name.endsWith(".csv")) {
      setError("File format not supported");
      return;
    }

    if (existingFiles.includes(file.name)) {
      setError("This file is already uploaded");
      return;
    }

    setError("");
    onFileSelect(file);
    toast.success("File Uploaded Successfully", {
      icon: <Image src={checkIcon} width={20} height={20} alt="Success" />,
      action: {
        label: <p>Close</p>,
        onClick: () => toast.dismiss(),
      },
    });
  };

  // Drag-and-drop handler
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
  });

  // Handle manual file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  useEffect(() => {
    if (fileUploaded && !isUploading) {
      toast.success("File Uploaded Successfully", {
        icon: <Image src={checkIcon} width={20} height={20} alt="Success" />,
        action: {
          label: <p>Close</p>,
          onClick: () => toast.dismiss(),
        },
      });
    }
  }, [fileUploaded, isUploading]);

  return (
    <div className="md:w-[620px] h-[370px] rounded-[16px] border-[1.21px] border-[#33333333] relative flex-1">
      <div
        className={cn(
          "flex flex-col gap-[12px] h-full",
          isUploading ? "p-4 md:p-[16px_16px_58px]" : "p-4 md:p-[23.5px_47px]"
        )}
      >
        <h2 className="text-[20px] md:text-[24px] font-semibold">{title}</h2>

        {/* Drag & Drop Wrapper */}
        <div
          {...getRootProps()}
          className={cn(
            "w-full max-w-full h-[224.7px] rounded-[12px]",
            "flex flex-col items-center justify-center gap-[12px]",
            "border border-[#33333380] cursor-pointer",
            "mx-auto",
            error
              ? "border-[#C50700]"
              : "hover:bg-gray-100 transition duration-200"
          )}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <UploadProgress progress={uploadProgress} fileName={fileName!} />
          ) : !fileUploaded ? (
            <>
              <Image src={uploadIcon} width={48} height={48} alt="Upload" />
              <p
                className={`text-[18px] font-medium ${
                  error ? "text-[#C50700]" : "text-[#4A5568]"
                }`}
              >
                <span className="hidden md:inline">
                  {error || "Drag & Drop files here or "}
                </span>
                <span className="text-[#2F855A] font-semibold underline">
                  Choose file
                </span>
              </p>
            </>
          ) : (
            <FilePreview fileName={fileName!} onDelete={onFileDelete} />
          )}
        </div>

        {/* Hidden input for manual file selection */}
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 mt-auto">
          <p className="text-[14px] md:text-[16px] font-light leading-[140%]">
            Supported format: CSV
          </p>
          <ErrorMessage message={error} />
        </div>
      </div>
    </div>
  );
}
