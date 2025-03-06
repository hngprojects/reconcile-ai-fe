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
import { StatusBadge } from "./StatusBadge";
import { useReconciliationLogic } from "@/hooks/useReconciliationLogic";
import {
  BankStatement,
  CompanyLedger,
  formatCurrency,
} from "@/data/reconciliationSampleData";

// Create column helpers
const bankColumnHelper = createColumnHelper<BankStatement>();
const ledgerColumnHelper = createColumnHelper<CompanyLedger>();

type ReconciliationTableProps = {
  leftTableTitle?: string;
  rightTableTitle?: string;
};

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
  } = useReconciliationLogic();

  // Define bank statement columns
  const bankColumns = React.useMemo(
    () => [
      bankColumnHelper.accessor("date", {
        header: "Date",
        cell: (info) => info.getValue(),
      }),
      bankColumnHelper.accessor("description", {
        header: "Description",
        cell: (info) => info.getValue(),
      }),
      bankColumnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => formatCurrency(info.getValue()),
      }),
    ],
    []
  );

  // Define company ledger columns
  const ledgerColumns = React.useMemo(
    () => [
      ledgerColumnHelper.accessor("date", {
        header: "Date",
        cell: (info) => info.getValue(),
      }),
      ledgerColumnHelper.accessor("description", {
        header: "Description",
        cell: (info) => info.getValue(),
      }),
      ledgerColumnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => formatCurrency(info.getValue()),
      }),
      ledgerColumnHelper.accessor("matched", {
        header: "Status",
        cell: (info) => <StatusBadge matched={info.getValue()} />,
      }),
    ],
    []
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

  return (
    <div className="space-y-6 py-6">
      <h1 className="text-2xl font-semibold">Matched Result</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bank Statement Table */}
        <div>
          <h2 className="mb-2 text-lg font-medium">{leftTableTitle}</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-[#F9FAFB]">
                {bankTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="border-r last:border-r-0"
                      >
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
                {bankTable.getRowModel().rows.length ? (
                  bankTable.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="border-r last:border-r-0 h-14"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
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

        {/* Company Ledger Table */}
        <div>
          <h2 className="mb-2 text-lg font-medium">{rightTableTitle}</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-[#F9FAFB]">
                {ledgerTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="border-r last:border-r-0"
                      >
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
                {ledgerTable.getRowModel().rows.length ? (
                  ledgerTable.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="border-r last:border-r-0 h-14"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
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

      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {pageStart}-{pageEnd} out of {totalItems}
        </div>

        <div className="space-x-2">
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
