import React from "react";
import Image from "next/image";

const FileUploaded = ({ width }: { width: string }) => {
  return (
    <div className="w-full h-[220px] py-[40px] px-[20px] text-[#333] flex flex-col justify-center items-center gap-[20px] border-1 border-[#333] rounded-[12px]">
      <Image src="/csv-icon.svg" width={30} height={40} alt="+" />
      <div className="w-full flex gap-2">
        <div className="flex-1 ">
          <p className="text-[16px] mb-2">Bank Statement.csv</p>
          <div className="w-full h-[8px] bg- rounded-full">
            <div
              style={{ width: `${width}` }}
              className={`bg-[#2e604a] h-full rounded-full`}
            ></div>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col">
          <Image src="/delete-icon.svg" width={17} height={17} alt="x" />
          <small>{width}</small>
        </div>
      </div>
    </div>
  );
};

export default FileUploaded;
