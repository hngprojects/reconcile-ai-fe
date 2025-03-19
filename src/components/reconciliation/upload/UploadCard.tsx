import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCardProps } from "./types";
import { toast } from "sonner";
import { cn } from "@/src/lib/utils";
import { FileUploadIcon } from "../../Icon/Icons";
import { FileItem } from "./FileItem";

const MAX_FILE_SIZE = 2;

const UploadCard = ({
  title,
  files,
  onFilesSelect,
  onFileDelete,
  existingFiles = [],
}: UploadCardProps) => {
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

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

      // Check if file already exists in either upload box
      if (existingFiles.includes(file.name)) {
        setError("This file has already been uploaded");
        return;
      }

      setError("");
      onFilesSelect([...files, file]);

      toast.success("File Added", {
        duration: 3000,
      });
    },
    [existingFiles, files, onFilesSelect],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragging(false);
      if (acceptedFiles.length > 0) {
        handleFile(acceptedFiles[0]);
      }
    },
    [handleFile],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="md:w-[620px] h-[370px] rounded-[16px] border-[1.21px] border-[#33333333]">
        <div
          className={cn(
            "flex flex-col gap-[12px] h-full p-3 md:p-[23.5px_47px]",
          )}
        >
          <h2 className="text-base sm:text-lg md:text-[19px] lg:text-2xl font-semibold">
            {title}
          </h2>

          <div
            {...getRootProps()}
            className={cn(
              "w-full max-w-full h-[224.7px] rounded-[12px]",
              "flex flex-col items-center justify-center gap-[12px]",
              isDragging ? "border-dashed border-2" : "border cursor-pointer",
              "border-[#33333380]",
              "mx-auto transition-all duration-200",
              error
                ? "border-[#C50700]"
                : isDragging
                  ? "border-[#2F855A] bg-[#2F855A]/5"
                  : "hover:bg-gray-100",
            )}
          >
            <input {...getInputProps()} />
            <FileUploadIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            <p className="text-sm sm:text-base md:text-lg font-medium text-[#4A5568] text-center px-4">
              <span className="hidden md:inline mr-2">
                Drag & Drop files here or
              </span>
              <span className="text-[#2F855A] font-semibold underline cursor-pointer">
                Choose file
              </span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 mt-auto">
            <p className="text-xs sm:text-sm md:text-base font-light">
              Supported format: CSV
            </p>
            <p className="text-xs sm:text-sm md:text-base font-light">
              Maximum size: {MAX_FILE_SIZE}MB
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-4">
          {files.map((file) => (
            <FileItem key={file.name} file={file} onDelete={onFileDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadCard;
