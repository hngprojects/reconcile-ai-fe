import { useState, useEffect } from "react";
import { UploadCardProps } from "./types";
import { FilePreview } from "./FilePreview";
import { UploadProgress } from "./UploadProgress";
import ErrorMessage from "./ErrorMessage";
import uploadIcon from "@/public/uploadIcon.svg";
import Image from "next/image";
import { toast } from "sonner";
import checkIcon from "@/public/check-icon.svg";
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is CSV
      if (!file.name.endsWith(".csv")) {
        setError("File format not supported");
        return;
      }

      // Check if file is already uploaded
      if (existingFiles.includes(file.name)) {
        setError("This file is already uploaded");
        return;
      }

      setError("");
      onFileSelect(file);
    }
  };

  useEffect(() => {
    if (fileUploaded && !isUploading) {
      // Only show toast when upload is completed
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

        <label
          className={cn(
            "w-full max-w-full h-[224.7px] rounded-[12px]",
            "flex flex-col items-center justify-center gap-[20px]",
            "border border-[#33333380] cursor-pointer",
            "mx-auto",
            error && "border-[#C50700]"
          )}
        >
          {isUploading ? (
            <UploadProgress progress={uploadProgress} fileName={fileName!} />
          ) : !fileUploaded ? (
            <>
              <Image src={uploadIcon} width={48} height={48} alt="Upload" />
              <p
                className={`text-[18px] font-bold ${
                  error ? "text-[#C50700]" : "text-[#678e82]"
                }`}
              >
                {error || "Upload file"}
              </p>
              <p className="underline text-[20px] font-normal text-[#333333B2]">
                Choose file here
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          ) : (
            <FilePreview fileName={fileName!} onDelete={onFileDelete} />
          )}
        </label>

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 mt-auto">
          <p className="font-inter text-[14px] md:text-[16px] font-light leading-[140%]">
            Supported format: CSV
          </p>
          <ErrorMessage message={error} />
        </div>
      </div>
    </div>
  );
}
