"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";
import { useReconciliationLogic } from "@/hooks/useReconciliationLogic";
import { formatCurrency } from "@/data/reconciliationSampleData";

export function MobileReconciliationView() {
  const {
    combinedData,
    currentPage,
    onPreviousPage,
    onNextPage,
    canPreviousPage,
    canNextPage,
    totalItems,
    pagination,
  } = useReconciliationLogic();

  const data = combinedData.slice(
    currentPage * pagination.pageSize,
    (currentPage + 1) * pagination.pageSize
  );

  return (
    <div className="space-y-3 py-6">
      <h1 className="text-2xl font-semibold">Matched Result</h1>

      {/* Transaction Cards */}
      {data.map((item, index) => (
        <div
          key={`${item.bankStatement.description}-${index}`}
          className={cn(
            "rounded-lg border shadow-sm",
            item.matched ? "bg-[#F3FEFA]" : "bg-[#FFF4F0]",
            {
              "rounded-t-lg": index === 0,
            }
          )}
        >
          {/* Column Headers */}
          {index === 0 && (
            <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-t-md border-b">
              <div className="text-sm font-medium text-gray-500">
                Date/Description
              </div>
              <div className="text-sm font-medium text-gray-500">Amount</div>
            </div>
          )}

          <div className="p-4 space-y-4">
            {/* Bank Statement */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">
                Bank Statement
              </div>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">
                    {item.bankStatement.date}
                  </div>
                  <div className="font-medium text-gray-900">
                    {item.bankStatement.description}
                  </div>
                </div>
                <div className="font-medium text-gray-900">
                  {formatCurrency(item.bankStatement.amount)}
                </div>
              </div>
              {item.matched && (
                <div className="pt-1">
                  <div className="flex gap-3 items-center">
                    <div className="inline-block border-[0.5px] border-[#007A55] p-2 rounded-3xl">
                      <StatusBadge matched={true} />
                    </div>
                    <hr className="border border-gray-200/70 flex-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Company Ledger - Only show if matched */}
            {item.matched && item.companyLedger && (
              <div className="space-y-2 pt-2">
                <div className="text-sm font-medium text-gray-500">
                  Company Ledger
                </div>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">
                      {item.companyLedger.date}
                    </div>
                    <div className="font-medium text-gray-900">
                      {item.companyLedger.description}
                    </div>
                  </div>
                  <div className="font-medium text-gray-900">
                    {formatCurrency(item.companyLedger.amount)}
                  </div>
                </div>
              </div>
            )}

            {/* Show Unmatched status if not matched */}
            {!item.matched && (
              <div className="pt-1">
                <div className="inline-block border-[0.5px] border-[#C50700] p-2 rounded-3xl">
                  <StatusBadge matched={false} />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-gray-500">
          Showing {currentPage * data.length + 1}-
          {Math.min((currentPage + 1) * data.length, totalItems)} out of{" "}
          {totalItems}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviousPage}
            disabled={!canPreviousPage}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextPage}
            disabled={!canNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
