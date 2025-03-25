"use client";

import { useMemo, useState, useEffect } from "react";
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
import { cn } from "@/src/lib/utils";
import { parse, isWithinInterval } from "date-fns";
import { fetchReconciliationHistory } from "@/src/lib/api";
import { ReconciliationHistory } from "@/src/types/reconciliation";
import Link from "next/link";

// Columns definition
const columns: ColumnDef<ReconciliationHistory>[] = [
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
    accessorKey: "title",
    header: "Reconciliation ID",
  },
  {
    accessorKey: "progress",
    header: "Status",
    cell: ({ row }) => {
      const isComplete = row.original.status === "Completed";

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
      const isComplete = row.original.status === "Completed";

      return (
        <Link href={`/reconciliation/${row.original.id}`}>
        <Button
          variant="outline"
          size="sm"
          className="border-primary border-2 text-primary hover:text-primary cursor-pointer"
          disabled={!isComplete}
        >
          View <ArrowUpRight className="h-3 w-3" />
        </Button>
        </Link>
      );
    },
  },
];

interface ReconciliationHistoryTableProps {
  fromDate?: Date;
  toDate?: Date;
  isFilterApplied: boolean;
}

export function ReconciliationHistoryTable({
  fromDate,
  toDate,
  isFilterApplied,
}: ReconciliationHistoryTableProps) {
  const [pageSize, setPageSize] = useState(10);
  const [reconciliations, setReconciliations] = useState<ReconciliationHistory[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchReconciliationHistory();
      setReconciliations(res.data as ReconciliationHistory[]);
    }

    fetch();
  },[]);


  const filteredData = useMemo(() => {
    if (!isFilterApplied || (!fromDate && !toDate)) {
      return reconciliations;
    }

    return reconciliations.filter((item) => {
      // Parse the date string to a Date object
      const itemDate = parse(item.date, "dd/MM/yyyy", new Date());

      // If only fromDate is provided
      if (fromDate && !toDate) {
        return itemDate >= fromDate;
      }

      // If only toDate is provided
      if (!fromDate && toDate) {
        return itemDate <= toDate;
      }

      // If both dates are provided
      if (fromDate && toDate) {
        return isWithinInterval(itemDate, { start: fromDate, end: toDate });
      }

      return true;
    });
  }, [fromDate, toDate, isFilterApplied, reconciliations]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const totalItems = filteredData.length;

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
                        "w-[190px]": header.column.id === "action",
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
        totalItems={totalItems}
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
