import { UploadProgressProps } from "@/src/types/upload";
import { CSVIcon } from "../../Icon/Icons";

export function UploadProgress({ progress, fileName }: UploadProgressProps) {
  return (
    // py is 58 before
    // <div className="flex flex-col items-center gap-4 w-full px-4 md:px-[16px] py-[58px]">

    // now 16
    <div className="flex flex-col items-center gap-4 w-full px-4 md:px-[16px] py-[16px]">
      <CSVIcon className="w-10 h-10" />
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
