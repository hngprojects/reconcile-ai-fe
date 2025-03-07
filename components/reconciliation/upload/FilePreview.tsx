import Image from "next/image";
import csvIcon from "@/public/csvIcon.svg";
import deleteIcon from "@/public/deleteIcon.svg";
import { FilePreviewProps } from "./types";

export function FilePreview({ fileName, onDelete }: FilePreviewProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full relative">
      <button
        onClick={(e) => {
          e.preventDefault();
          onDelete();
        }}
        className="absolute mt-[14px] mr-[18px] top-0 right-0 p-2 
                   hover:bg-gray-100 rounded-full transition-colors"
      >
        <Image src={deleteIcon} width={20} height={20} alt="Delete" />
      </button>
      <Image src={csvIcon} width={30} height={40} alt="File" />
      <span className="text-[16px] text-[#344054] font-medium truncate max-w-[300px]">
        {fileName}
      </span>
    </div>
  );
}
