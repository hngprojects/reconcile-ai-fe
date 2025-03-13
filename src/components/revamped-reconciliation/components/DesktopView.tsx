"use client";

import { useLogic } from "../hooks/useLogic";
import { BankStatementTable } from "./BankTable";
import { LedgerTable } from "./LedgerTable";
import { StatusTable } from "./StatusTable";

export default function DesktopView() {
  const {
    paginatedData,
    unmatchedBankTransactions,
    unmatchedLedgerTransactions,
    handleMatch,
    // pageIndex,
    // pageSize,
    // totalItems,
    // handlePageChange,
    // handlePageSizeChange,
  } = useLogic();

  return (
    <div className="space-y-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-3">
        {/* Bank Statement Table */}
        <div className="">
          <h2 className="mb-2 ml-2.5 text-lg font-medium">Bank Statement</h2>
          <BankStatementTable
            data={paginatedData}
            unmatchedBankTransactions={unmatchedBankTransactions}
            onMatch={handleMatch}
          />
        </div>

        {/* Status Column */}
        <div className="mt-[36px] w-[150px]">
          <StatusTable data={paginatedData} />
        </div>

        {/* Company Ledger Table */}
        <div className="">
          <h2 className="mb-2 ml-2.5 text-lg font-medium">Company Ledger</h2>
          <LedgerTable
            data={paginatedData}
            unmatchedLedgerTransactions={unmatchedLedgerTransactions}
            onMatch={handleMatch}
          />
        </div>
      </div>
    </div>
  );
}
