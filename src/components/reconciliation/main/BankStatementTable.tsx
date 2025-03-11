"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { cn } from "@/src/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { bankColumns } from "./columns";
import { useReconciliationLogic } from "@/src/components/reconciliation/main/useReconciliationLogic";

interface BankStatementTableProps {
  statusData: { matched: boolean }[];
}

export function BankStatementTable({ statusData }: BankStatementTableProps) {
  const { pagination, setPagination, paginatedBankData } =
    useReconciliationLogic();

  const table = useReactTable({
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

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader className="bg-[#F9FAFB] h-[52px] border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="!border-b-0">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="px-6">
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
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row, index) => {
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
                        "px-6 h-[64px] relative",
                        "max-w-[200px] md:max-w-none",
                        "whitespace-nowrap overflow-hidden text-ellipsis",
                        cellIndex !== row.getVisibleCells().length - 1 &&
                          "border-r"
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
  );
}
