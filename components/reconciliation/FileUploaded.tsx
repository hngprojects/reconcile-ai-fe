import React from "react";
import Image from "next/image";

interface FileUploadedProps {
  document: string;
  onDelete: () => void;
}

const FileUploaded: React.FC<FileUploadedProps> = ({ document, onDelete }) => {
  return (
    <div className="w-full max-md:w-full md:h-[220px] h-[124px] py-[40px] px-[20px] text-[#333] flex flex-col justify-center items-center gap-[20px] border-1 border-[#333] rounded-[12px] relative">
      <Image
        className="w-[16px] h-[24px] md:h-[40px] md:w-[30px]"
        src="/csv-icon.svg"
        width={30}
        height={40}
        alt="+"
      />
      <div>{document}</div>
      <div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Image src="/red-delete.svg" width={15} height={16.67} alt="x" />
      </div>
    </div>
  );
};

export default FileUploaded;
