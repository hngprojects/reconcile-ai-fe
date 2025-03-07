"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Header from "../coming-soon/components/Header";
import StatementUpload from "@/components/reconciliation/StatementUpload";
import LedgerUpload from "@/components/reconciliation/LedgerUpload";
import DeleteMsg from "@/components/reconciliation/DeleteMsg";

const UploadFile = () => {
  const router = useRouter();
  const [statement, setStatement] = useState<boolean>(false);
  const [statementFile, setStatementFile] = useState<string>("");

  const [ledger, setLedger] = useState<boolean>(false);
  const [ledgerFile, setLedgerFile] = useState<string>("");

  const [deleted, setDeleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleReconcile = () => {
    setLoading(true);

    setTimeout(() => {
      router.push("/reconciliation");
    }, 2000);
  };

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
              setStatement={setStatement}
              statementFile={statementFile}
              setStatementFile={setStatementFile}
            />
            <LedgerUpload
              title="Upload Company Ledger"
              ledger={ledger}
              setLedger={setLedger}
              ledgerFile={ledgerFile}
              setLedgerFile={setLedgerFile}
            />
          </div>
        </div>
        <Button
          disabled={!(statement && ledger) || loading}
          className="bg-[#2E604A] w-full md:w-[552px] md:h-[64px] h-[48px] md:text-[16px] text-[14px] text-white cursor-pointer flex justify-center items-center"
          onClick={handleReconcile}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Reconcile"
          )}
        </Button>
      </section>
    </>
  );
};

export default UploadFile;
