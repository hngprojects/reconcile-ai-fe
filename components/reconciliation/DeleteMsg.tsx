import React from "react";
import Image from "next/image";

const DeleteMsg = ({setDeleted} : {setDeleted: (val: boolean) => void }) => {

  const close = () => {
    setDeleted(false)
  }

  return (
    <div className=" flex justify-between items-center px-[24px] py-[12px] bg-[#fff4f0] rounded-[8px] text-[#333]">
      <div className="flex gap-2 justify-center items-center">
        <Image src="/checkmark-delete.svg" width={12} height={10.5} alt="✅" />
        <p className="ml-[4px] text-[14px] text-[#333]">File Deleted</p>
      </div>
      <p
      onClick={close}
      className="text-[16px] font-semibold cursor-pointer">Close</p>
    </div>
  );
};

export default DeleteMsg;
