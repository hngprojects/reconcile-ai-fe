import csvIcon from "@/public/csvIcon.svg";
import { UploadProgressProps } from "@/types/upload";
import Image from "next/image";

export function UploadProgress({ progress, fileName }: UploadProgressProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full px-4 md:px-[16px] py-[58px]">
      <Image src={csvIcon} width={30} height={40} alt="Uploading" />
      <div className="w-full space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[14px] text-[#344054] truncate max-w-[150px] md:max-w-none">
            {fileName}
          </span>
          <span className="text-[14px] text-[#344054]">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-[#E9ECEF] rounded-[4px] overflow-hidden">
          <div
            className="h-full bg-[#2E604A] rounded-[4px] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
