import React from "react";
import Image from "next/image";

const FileComponent = () => {
  return (
    <div className="w-full h-[220px] py-[40px] px-[80px] text-[#333] flex flex-col justify-center items-center gap-[20px] border-1 border-[#333] rounded-[12px]">
      <Image src="/icon-upload.svg" width={30} height={40} alt="+" />
      <p className="font-bold text-[16px] md:text-[18px] text-[#678e82]">
        Upload file
      </p>
      <p className="underline cursor-pointer text-[20px]">Choose file here</p>
    </div>
  );
};

export default FileComponent;
