"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "../coming-soon/components/Header";
import StatementUpload from "@/components/reconciliation/StatementUpload";
import LedgerUpload from "@/components/reconciliation/LedgerUpload";
import DeleteMsg from "@/components/reconciliation/DeleteMsg";

const UploadFile = () => {
  const [statement, setStatement] = useState(false);
  const [ledger, setLedger] = useState(false);
  const [deleted, setDeleted] = useState(false);

  return (
    <>
      <Header />
      <section className="flex flex-col gap-8 items-center px-8 pb-8">
        <div className="md:w-fit w-full py-0 flex flex-col items-center md:items-end justify-center">
          <div
            className={`w-full max-w-[438px] my-2 ${
              deleted ? "visible" : "invisible"
            }`}
          >
            <DeleteMsg setDeleted={setDeleted} />
          </div>
          <div className="w-full gap-[40px] flex flex-wrap justify-center items-center h-full">
            <StatementUpload
              title="Upload Bank Statement"
              statement={statement}
            />
            <LedgerUpload title="Upload Company Ledger" ledger={ledger} />
          </div>
        </div>
        <Button
          disabled={statement && ledger ? false : true}
          className="bg-[#2E604A] w-full md:w-[552px] md:h-[64px] h-[48px] md:text-[16px] text-[14px] text-white cursor-pointer"
        >
          Reconcile
        </Button>
      </section>
    </>
  );
};

export default UploadFile;
