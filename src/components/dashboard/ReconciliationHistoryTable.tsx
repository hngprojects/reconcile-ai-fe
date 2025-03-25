"use client";

import { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { PaginationControls } from "@/src/components/PaginationControl";
import {
  ReconciliationHistoryTypes,
  reconciliations,
} from "./dashboardDummyData";
import { cn } from "@/src/lib/utils";

// Columns definition
const columns: ColumnDef<ReconciliationHistoryTypes>[] = [
  {
    accessorKey: "serial_number",
    header: "S/N",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "reconciliationId",
    header: "Reconciliation ID",
  },
  {
    accessorKey: "progress",
    header: "Status",
    cell: ({ row }) => {
      const isComplete = row.original.status === "complete";

      return (
        <div
          className={`font-medium ${isComplete ? "text-green-600" : "text-amber-600"}`}
        >
          {isComplete ? "Complete" : "Pending"}
        </div>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const isComplete = row.original.status === "complete";

      return (
        <Button
          variant="outline"
          size="sm"
          className="border-primary border-2 text-primary hover:text-primary cursor-pointer"
          disabled={!isComplete}
        >
          View <ArrowUpRight className="h-3 w-3" />
        </Button>
      );
    },
  },
];

export function ReconciliationHistoryTable() {
  const [pageSize, setPageSize] = useState(10);

  const table = useReactTable({
    data: reconciliations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  return (
    <div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-gray-100 hover:bg-gray-100 h-12"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "px-5 text-black",
                      {
                        "border-r": header.column.id !== "action",
                      },
                      {
                        "md:w-[190px]": header.column.id === "action",
                      },
                      {
                        "w-[84px] text-center md:text-start":
                          header.column.id === "serial_number",
                      }
                    )}
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "px-5 py-3",
                        {
                          "border-r text-left":
                            index !== row.getVisibleCells().length - 1,
                        },
                        {
                          "text-center md:text-start":
                            cell.column.id === "serial_number",
                        }
                      )}
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
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <PaginationControls
        pageIndex={table.getState().pagination.pageIndex}
        pageSize={pageSize}
        totalItems={reconciliations.length}
        onPreviousPage={() => table.previousPage()}
        onNextPage={() => table.nextPage()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        onRowsPerPageChange={(value) => {
          setPageSize(value);
          table.setPageSize(value);
        }}
      />
    </div>
  );
}
