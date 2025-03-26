"use client";

import { PaginationControls } from "@/src/components/PaginationControl";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { ReconciliationHistoryType } from "@/src/types/reconciliation";
import {
  type ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  endOfDay,
  format,
  isAfter,
  isBefore,
  isWithinInterval,
  parseISO,
  startOfDay,
} from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

// Columns definition
const columns: ColumnDef<ReconciliationHistoryType>[] = [
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
        <Button
          variant="outline"
          size="sm"
          className={`border-primary border-2 text-primary ${
            !isComplete
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-primary/10 cursor-pointer"
          }`}
          disabled={!isComplete}
          onClick={(e) => {
            if (!isComplete) {
              e.preventDefault();
              return;
            }
          }}
        >
          View <ArrowUpRight className="h-3 w-3" />
        </Button>
      );
    },
  },
];

interface ReconciliationHistoryCardProps {
  fromDate?: Date;
  toDate?: Date;
  isFilterApplied: boolean;
  reconciliations: ReconciliationHistoryType[];
}

export function ReconciliationHistoryCard({
  fromDate,
  toDate,
  isFilterApplied,
  reconciliations,
}: ReconciliationHistoryCardProps) {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(10);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    try {
      // Try parsing ISO format first
      const parsedDate = parseISO(dateString);
      return format(parsedDate, "dd MMM yyyy");
    } catch (error) {
      // Fallback to original string if parsing fails
      console.warn(`Date formatting error: ${error}`);
      return dateString;
    }
  };

  const filteredData = useMemo(() => {
    if (!isFilterApplied || (!fromDate && !toDate)) {
      return reconciliations;
    }

    return reconciliations.filter((item) => {
      // Parse ISO date
      const itemDate = parseISO(item.date);

      if (fromDate && toDate) {
        return isWithinInterval(itemDate, {
          start: startOfDay(fromDate),
          end: endOfDay(toDate),
        });
      }

      if (fromDate) {
        return isAfter(itemDate, startOfDay(fromDate));
      }

      if (toDate) {
        return isBefore(itemDate, endOfDay(toDate));
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
      <div className="space-y-4">
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <Card key={row.id} className="w-full border border-[#E4E7EC]">
              <CardContent className="p-4 space-y-3">
                <div className="text-sm text-[#333333]">
                  {formatDate(row.original.date)}
                </div>
                <div className="text-[#333333] font-medium">
                  {row.original.id}
                </div>

                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                    row.original.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {row.original.status === "Completed" ? (
                    <p className="flex items-center gap-[6px]">
                      Complete{" "}
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 1L3.5 6.5L1 4"
                          stroke="#12B76A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </p>
                  ) : (
                    <p className="flex items-center gap-[6px]">
                      Pending{" "}
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 1L3.5 6.5L1 4"
                          stroke="#E17100"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </p>
                  )}
                </div>

                <Button
                  variant="outline"
                  className={`w-full border-primary border-2 text-primary ${
                    row.original.status !== "Completed"
                      ? "opacity-50 cursor-not-allowed pointer-events-none"
                      : "hover:bg-primary/10 cursor-pointer"
                  }`}
                  disabled={row.original.status !== "Completed"}
                  onClick={(e) => {
                    if (row.original.status !== "Completed") {
                      e.preventDefault();
                      return;
                    }
                    router.push(`/reconciliation/${row.original.id}`);
                  }}
                >
                  View <ArrowUpRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-4">No results.</div>
        )}
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
