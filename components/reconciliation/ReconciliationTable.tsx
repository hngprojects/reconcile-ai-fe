"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { ChevronDown } from "lucide-react";
import { useReconciliationLogic } from "@/hooks/useReconciliationLogic";
import { formatCurrency } from "@/data/reconciliationSampleData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import ReconciliationErrorModal from "./ReconciliationError";
import { ReconciliationTableProps, Transaction } from "@/types/reconciliation";

// Create column helpers
const bankColumnHelper = createColumnHelper<Transaction>();
const ledgerColumnHelper = createColumnHelper<Transaction>();

export function ReconciliationTable({
  leftTableTitle = "Bank Statement",
  rightTableTitle = "Company Ledger",
}: ReconciliationTableProps) {
  const {
    pagination,
    setPagination,
    paginatedBankData,
    paginatedLedgerData,
    totalItems,
    onPreviousPage,
    onNextPage,
    canPreviousPage,
    canNextPage,
    onRowsPerPageChange,
    // showErrorModal,
    data,
  } = useReconciliationLogic();

  // Define bank statement columns
  const bankColumns = React.useMemo(
    () => [
      bankColumnHelper.accessor("Date", {
        header: "Date",
        cell: (info) => info.getValue(),
      }),
      bankColumnHelper.accessor("Description", {
        header: "Description",
        cell: (info) => info.getValue(),
      }),
      bankColumnHelper.accessor("Amount", {
        header: "Amount",
        cell: (info) => {
          if (info.getValue()) return formatCurrency(info.getValue());
        },
      }),
    ],
    []
  );

  // Define company ledger columns
  const ledgerColumns = React.useMemo(
    () => [
      ledgerColumnHelper.accessor("Date", {
        header: "Date",
        cell: (info) => info.getValue(),
      }),
      ledgerColumnHelper.accessor("Description", {
        header: "Description",
        cell: (info) => info.getValue(),
      }),
      ledgerColumnHelper.accessor("Amount", {
        header: "Amount",
        cell: (info) => {
          if (info.getValue()) return formatCurrency(info.getValue());
        },
      }),
    ],
    []
  );

  // Create status column data
  const statusData = React.useMemo(
    () =>
      paginatedBankData.map((bankItem) => ({
        matched: data.matches.find(
          (match) => match.file1_transaction === bankItem
        )
          ? true
          : false,
      })),
    [paginatedBankData, data.matches]
  );

  // Create tables with shared pagination state
  const bankTable = useReactTable({
    data: paginatedBankData,
    columns: bankColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    manualPagination: true,
    pageCount: Math.ceil(paginatedBankData.length / pagination.pageSize),
  });

  const ledgerTable = useReactTable({
    data: paginatedLedgerData,
    columns: ledgerColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    manualPagination: true,
    pageCount: Math.ceil(paginatedLedgerData.length / pagination.pageSize),
  });

  // Calculate current page range
  const pageStart = pagination.pageIndex * pagination.pageSize + 1;
  const pageEnd = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    totalItems
  );

  // array of row options
  const rowOptions = [10, 25, 50];

  // Add a function to determine if an option should be disabled
  const isOptionDisabled = (size: number) => {
    return (size > 10 && totalItems <= 10) || (size > 25 && totalItems <= 25);
  };

  return (
    <>
      {/* {showErrorModal && <ReconciliationErrorModal />} */}
      <div className="space-y-6 py-6">
        <h1 className="text-2xl font-semibold">Matched Result</h1>

        <div className="grid grid-cols-12 gap-2 max-w-[1440px] mx-auto">
          {/* Bank Statement Table */}
          <div className="col-span-5">
            <h2 className="mb-2 ml-2.5 text-lg font-medium">
              {leftTableTitle}
            </h2>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader className="bg-[#F9FAFB] h-[52px]">
                  {bankTable.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="!border-b-0">
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="text-center">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {bankTable.getRowModel().rows.length > 0 ? (
                    bankTable.getRowModel().rows.map((row, index) => {
                      const isMatched = statusData[index]?.matched;
                      return (
                        <TableRow
                          key={row.id}
                          className={`${
                            isMatched
                              ? "bg-[#F3FEFA] hover:!bg-[#F3FEFA]"
                              : "bg-[#FFF4F0] hover:!bg-[#FFF4F0]"
                          } `}
                        >
                          {row.getVisibleCells().map((cell, cellIndex) => (
                            <TableCell
                              key={cell.id}
                              className={cn(
                                "text-center h-[64px] relative",
                                "max-w-[200px] md:max-w-none",
                                "whitespace-nowrap overflow-hidden text-ellipsis",
                                cellIndex !==
                                  row.getVisibleCells().length - 1 && "border-r"
                              )}
                              title={cell.getValue() as string}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={bankColumns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Status Column */}
          <div className="col-span-2 mt-[36px]">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader className="bg-[#F9FAFB] h-[52px]">
                  <TableRow className="!border-b-0">
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statusData.map((item, index) => (
                    <TableRow
                      key={index}
                      className={cn(
                        item.matched
                          ? "bg-[#F3FEFA] hover:bg-[#F3FEFA]"
                          : "bg-[#FFF4F0] hover:bg-[#FFF4F0]"
                      )}
                    >
                      <TableCell className="text-center h-[64px]">
                        <StatusBadge matched={item.matched} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Company Ledger Table */}
          <div className="col-span-5">
            <h2 className="mb-2 ml-2.5 text-lg font-medium">
              {rightTableTitle}
            </h2>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader className="bg-[#F9FAFB] h-[52px]">
                  {ledgerTable.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="!border-b-0">
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="text-center">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {paginatedLedgerData.length > 0 ? (
                    paginatedBankData.map((bankItem, index) => {
                      const matchingData = data.matches.find(
                        (match) => match.file1_transaction == bankItem
                      );
                      const isMatched = !!matchingData;
                      const matchingLedger =
                        matchingData && matchingData.file2_transaction;

                      return (
                        <TableRow
                          key={index}
                          className={`${
                            isMatched
                              ? "bg-[#F3FEFA] hover:!bg-[#F3FEFA]"
                              : "bg-none hover:bg-white"
                          } `}
                        >
                          {matchingLedger ? (
                            <>
                              <TableCell
                                className={cn(
                                  "text-center border-r h-[64px]",
                                  "max-w-[200px] md:max-w-none",
                                  "whitespace-nowrap overflow-hidden text-ellipsis"
                                )}
                                title={matchingLedger["Date"]}
                              >
                                {matchingLedger["Date"]}
                              </TableCell>
                              <TableCell
                                className={cn(
                                  "text-center border-r h-[64px]",
                                  "max-w-[200px] md:max-w-none",
                                  "whitespace-nowrap overflow-hidden text-ellipsis"
                                )}
                                title={matchingLedger["Description"]}
                              >
                                {matchingLedger["Description"]}
                              </TableCell>
                              <TableCell
                                className={cn(
                                  "text-center h-[64px]",
                                  "max-w-[200px] md:max-w-none",
                                  "whitespace-nowrap overflow-hidden text-ellipsis"
                                )}
                                title={
                                  matchingLedger["Amount"]
                                    ? formatCurrency(matchingLedger["Amount"])
                                    : ""
                                }
                              >
                                {matchingLedger["Amount"]
                                  ? formatCurrency(matchingLedger["Amount"])
                                  : ""}
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell className="text-center border-r h-[64px]"></TableCell>
                              <TableCell className="text-center border-r h-[64px]"></TableCell>
                              <TableCell className="text-center h-[64px]"></TableCell>
                            </>
                          )}
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={ledgerColumns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Pagination section */}
        <div className="flex items-center justify-between py-4 max-w-[1440px] mx-auto border-t-1 border-solid border-[#EFF1F3]">
          <div className="flex items-center gap-3">
            <div className="text-sm text-[#344054] font-medium">
              Rows per page
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-[4px] border-1 border-solid border-[#EFF1F3] px-2 py-1.5">
                <span className="text-sm text-[#344054] font-medium">
                  {pagination.pageSize}
                </span>
                <ChevronDown className="h-4 w-4 text-[#292D32]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {rowOptions.map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => onRowsPerPageChange(size)}
                    disabled={isOptionDisabled(size)}
                    className={cn(
                      "text-sm cursor-pointer",
                      isOptionDisabled(size) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="text-sm text-[#344054] font-medium">
              {pageStart}-{pageEnd} of {totalItems}
            </div>
          </div>

          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPreviousPage}
              disabled={!canPreviousPage}
              className="cursor-pointer"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onNextPage}
              disabled={!canNextPage}
              className="cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
