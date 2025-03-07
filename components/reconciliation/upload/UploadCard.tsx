import { useState } from "react";
import { UploadCardProps } from "./types";
import { FilePreview } from "./FilePreview";
import { UploadProgress } from "./UploadProgress";
import ErrorMessage from "./ErrorMessage";
import uploadIcon from "@/public/uploadIcon.svg";
import Image from "next/image";

export default function UploadCard({
  title,
  fileUploaded,
  fileName,
  onFileSelect,
  onFileDelete,
  isUploading,
  uploadProgress = 0,
}: UploadCardProps) {
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith(".csv")) {
        setError("File format not supported");
        return;
      }
      setError("");
      onFileSelect(file);
    }
  };

  return (
    <div className="w-[620px] h-[370px] rounded-[16px] border-[1.21px] border-[#33333333]">
      <div className="px-[47px] py-[23.5px] flex flex-col gap-[12px]">
        <h2 className="text-[24px] font-semibold">{title}</h2>

        <label
          className={`w-[526px] h-[224.7px] rounded-[12px] 
                    px-[80px] py-[40px] flex flex-col items-center 
                    justify-center gap-[20px] border border-[#33333380] 
                    cursor-pointer ${error ? "border-[#C50700]" : ""}`}
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
              <p className="underline text-[20px] font-normal text-[#333333B2]">Choose file here</p>
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

        <div className="flex justify-between items-center">
          <p className="font-inter text-[16px] font-light leading-[140%]">
            Supported format: CSV
          </p>
          <ErrorMessage message={error} />
        </div>
      </div>
    </div>
  );
}
