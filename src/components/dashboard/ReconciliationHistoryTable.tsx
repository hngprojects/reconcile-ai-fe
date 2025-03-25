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

// Columns definition
const columns: ColumnDef<ReconciliationHistoryTypes>[] = [
  {
    accessorKey: "id",
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
          className={`font-medium ${isComplete ? "text-green-700" : "text-amber-600"}`}
        >
          {isComplete ? "Complete" : "Pending"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: () => (
      <Button variant="outline" size="sm" className="flex items-center gap-1">
        View <ArrowUpRight className="h-3 w-3" />
      </Button>
    ),
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
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
