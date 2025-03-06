"use client";
import React from "react";
import FileComponent from "./FileComponent";
import FileUploaded from "./FileUploaded";
import Image from "next/image";

const StatementUpload = ({
  title,
  statement,
}: {
  title: string;
  statement: boolean;
}) => {
  return (
    <div className="w-[620px] rounded-xl py-[16px] md:py-[10px] px-[24px] flex flex-col gap-[24px] justify-center max-w-[450px] border-[1.2px] border-[#333]">
      <h2 className="text-[24px] font-semibold">{title}</h2>
      {!statement ? (
        <FileComponent />
      ) : (
        <FileUploaded document="Bank Statement.csv" />
      )}
      <div className="w-full flex flex-col md:flex-row justify-between text-gray-[#333]">
        <small>Supported format: CSV</small>
        <span className="text-[#ff0000] gap-[4px] hidden">
          <Image src="/alert-icon.svg" alt="!" width={13.33} height={13.33} />
          <small>File format not supported!</small>
        </span>
      </div>
    </div>
  );
};

export default StatementUpload;
