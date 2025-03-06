import React from "react";
import { Button } from "@/components/ui/button";
import Header from "../coming-soon/components/Header";
import StatementUpload from "@/components/reconciliation/StatementUpload";
import LedgerUpload from "@/components/reconciliation/LedgerUpload";

const UploadFile = () => {
  return (
    <>
      <Header />
      <section className="flex flex-col gap-8 items-center p-8">
        <div className="w-full gap-[40px] flex flex-wrap justify-center items-center h-full">
          <StatementUpload title="Upload Bank Statement" />
          <LedgerUpload title="Upload Company Ledger" />
        </div>
        <Button
          disabled={true}
          className="bg-[#2E604A] w-full md:w-[552px] text-[16px] text-white cursor-pointer"
        >
          Reconcile
        </Button>
      </section>
    </>
  );
};

export default UploadFile;
