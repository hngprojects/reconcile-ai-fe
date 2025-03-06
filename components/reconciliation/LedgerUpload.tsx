"use client";
import React, { useState } from "react";
import FileComponent from "./FileComponent";
import FileUploaded from "./FileUploaded";

const LedgerUpload = ({ title }: { title: string }) => {
  const [ledgerIsLoading, setLedgerIsLoading] = useState(false);
  const [statementIsLoading, setStatementIsLoading] = useState(false);
  const [ledger, setLedger] = useState(true);

  return (
    <div className="w-[620px] rounded-xl py-[16px] md:py-[10px] px-[24px] flex flex-col gap-[24px] justify-center max-w-[450px] border-[1.2px] border-[#333]">
      <h2 className="text-[24px] font-semibold">{title}</h2>
      {!ledger ? <FileComponent /> : <FileUploaded width="40%"/>}
      <div className="w-full flex justify-between text-gray-[#333]">
        <small>Supported format: CVS</small>
      </div>
    </div>
  );
};

export default LedgerUpload;
