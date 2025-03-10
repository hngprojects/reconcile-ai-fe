import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCardProps } from "./types";
import { FilePreview } from "./FilePreview";
import { UploadProgress } from "./UploadProgress";
import ErrorMessage from "./ErrorMessage";
import Image from "next/image";
import uploadIcon from "@/public/assets/images/uploadIcon.svg";
import checkIcon from "@/public/assets/images/check-icon.svg";
import { toast } from "sonner";
import { cn } from "@/src/lib/utils";

const MAX_FILE_SIZE = 2;

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
  const [isDragging, setIsDragging] = useState(false);
  const [hasBeenUploaded, setHasBeenUploaded] = useState(false);

  // Wrap handleFile in useCallback
  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith(".csv")) {
        setError("File format not supported");
        return;
      }

      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > MAX_FILE_SIZE) {
        setError(`File size exceeds ${MAX_FILE_SIZE}MB`);
        return;
      }

      if (existingFiles.includes(file.name)) {
        setError("This file has already been uploaded");
        return;
      }

      setError("");
      setHasBeenUploaded(true);
      onFileSelect(file);
    },
    [existingFiles, onFileSelect]
  );

  useEffect(() => {
    // Only show toast when a file has been manually uploaded AND is no longer uploading
    if (fileUploaded && !isUploading && hasBeenUploaded) {
      toast.success("File Uploaded Successfully", {
        icon: <Image src={checkIcon} width={20} height={20} alt="Success" />,
        style: { background: "#EEFFEE" },
        action: {
          label: <p className="bg-inherit">Close</p>,
          onClick: () => toast.dismiss(),
        },
      });
      
      // Reset the flag after showing the toast
      setHasBeenUploaded(false);
    }
  }, [fileUploaded, isUploading, hasBeenUploaded]);

  // Update onDrop with proper dependencies
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragging(false);
      if (acceptedFiles.length > 0) {
        handleFile(acceptedFiles[0]);
      }
    },
    [handleFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  // Handle manual file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="md:w-[620px] h-[370px] rounded-[16px] border-[1.21px] border-[#33333333] relative flex-1">
      <div
        className={cn(
          "flex flex-col gap-[12px] h-full",
          isUploading ? "p-3 md:p-[16px_16px_58px]" : "p-3 md:p-[23.5px_47px]"
        )}
      >
        <h2 className="text-base sm:text-lg md:text-[19px] lg:text-2xl font-semibold">
          {title}
        </h2>

        {/* Drag & Drop Wrapper */}
        <div
          {...getRootProps()}
          className={cn(
            "w-full max-w-full h-[224.7px] rounded-[12px]",
            "flex flex-col items-center justify-center gap-[12px]",
            isDragging || isUploading ? "border-dashed border-2" : "border",
            "border-[#33333380]",
            "mx-auto transition-all duration-200",
            error
              ? "border-[#C50700]"
              : isDragging
              ? "border-[#2F855A] bg-[#2F855A]/5"
              : "hover:bg-gray-100"
          )}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <UploadProgress progress={uploadProgress} fileName={fileName!} />
          ) : !fileUploaded ? (
            <>
              <Image
                src={uploadIcon}
                width={36}
                height={36}
                alt="Upload"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              />
              <p className="text-sm sm:text-base md:text-lg font-medium text-[#4A5568] text-center px-4">
                <span className="hidden md:inline mr-2">
                  Drag & Drop files here or
                </span>
                <span className="text-[#2F855A] font-semibold underline cursor-pointer">
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
          <p className="text-xs sm:text-sm md:text-base font-light">
            Supported format: CSV
          </p>
          <p className="text-xs sm:text-sm md:text-base font-light">
            Maximum size: {MAX_FILE_SIZE}MB
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center md:justify-end md:mt-2 mb-2 md:mb-0">
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
}