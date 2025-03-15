"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { cn } from "@/src/lib/utils"; // Assuming cn is stored in a utils file
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CheckIcon, XIcon } from "lucide-react";
import { useReconciliation } from "../context/ReconciliationProvider";
import { ReconciliationItem } from "../types/frontendResponseTypes";

export function StatusTable() {
  const { paginatedData } = useReconciliation();

  const statusColumn: ColumnDef<ReconciliationItem>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const matched = row.original.matched;

        return (
          <div
            className={cn(
              "flex justify-center items-center text-sm font-semibold px-1 h-[2.29rem]",
              matched
                ? "bg-[#F3FEFA] text-[#007A55]"
                : "bg-[#FFF4F0] text-[#C50700]"
            )}
          >
            {matched ? "Matched" : "Unmatched"}
            <div
              className={cn(
                "h-4 w-4 rounded-full ml-2 flex items-center justify-center",
                matched ? "bg-[#007A55]" : "bg-[#C50700]"
              )}
            >
              {matched ? (
                <CheckIcon className="h-3 w-3 text-white" />
              ) : (
                <XIcon className="h-3 w-3 text-white" />
              )}
            </div>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: paginatedData,
    columns: statusColumn,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-center h-12">
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
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className={cn(
                "transition-colors",
                row.original.matched
                  ? "bg-green-50 hover:bg-green-50"
                  : "bg-red-50 hover:bg-red-50"
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
