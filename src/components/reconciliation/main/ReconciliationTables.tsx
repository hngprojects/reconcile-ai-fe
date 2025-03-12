"use client";

import { useReconciliationLogic } from "@/src/components/reconciliation/main/useReconciliationLogic";
import { BankStatementTable } from "./BankStatementTable";
import { LedgerTable } from "./CompanyLedgerTable";
import { StatusColumn } from "./StatusColumn";

interface ReconciliationTableProps {
  leftTableTitle?: string;
  rightTableTitle?: string;
}

export function ReconciliationTables({
  leftTableTitle = "Bank Statement",
  rightTableTitle = "Company Ledger",
}: ReconciliationTableProps) {
  const { paginatedBankData, data } = useReconciliationLogic();

  // status column data
  const statusData = paginatedBankData.map((bankItem) => ({
    matched: data.matches.find((match) => match.file1_transaction === bankItem)
      ? true
      : false,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-3">
      {/* Bank Statement Table */}
      <div className="">
        <h2 className="mb-2 ml-2.5 text-lg font-medium">{leftTableTitle}</h2>
        <BankStatementTable statusData={statusData} />
      </div>

      {/* Status Column */}
      <div className="">
        <StatusColumn statusData={statusData} />
      </div>

      {/* Company Ledger Table */}
      <div className="">
        <h2 className="mb-2 ml-2.5 text-lg font-medium">{rightTableTitle}</h2>
        <LedgerTable />
      </div>
    </div>
  );
}
// <>
{
  /* Custom Toast Message */
}
{
  /* {showSuccessToast && (
      <div className="fixed top-4 right-4 z-50 animate-in fade-in duration-500">
        <SuccessToast
          message={toastMessage}
          onClose={() => {
            setShowSuccessToast(!setShowSuccessToast);
          }}
        />
      </div>
    )} */
}
{
  /* header section */
}
{
  /* <div className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-semibold">Matched Results</h1>
    <ExportButton
      onSuccess={(message) => {
        setToastMessage(message)
        setShowSuccessToast(true)
      }}
      onError={(message) => {
        setToastMessage(message)
        setShowErrorToast(true)
      }}
      />
      </div> */
}

{
  /* Pagination section */
}
{
  /* <PaginationControls
          pagination={pagination}
          totalItems={totalItems}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          onRowsPerPageChange={onRowsPerPageChange}
        /> */
}
