"use client";

import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { cn } from "@/src/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { ChevronDown, Loader2 } from "lucide-react";
import { useReconciliationLogic } from "@/src/hooks/useReconciliationLogic";
import { formatCurrency } from "@/src/data/reconciliationSampleData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import ErrorModal from "../modal/ErrorModal";
import SuccessModal from "../modal/SuccessModal";
import {
  ReconciliationTableProps,
  Transaction,
} from "@/src/types/reconciliation";

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
    showErrorModal,
    setShowErrorModal,
    data,
  } = useReconciliationLogic();

  // Add loading state for export
  const [isExporting, setIsExporting] = React.useState(false);
  // Add error state for export
  const [exportError, setExportError] = React.useState<{
    show: boolean;
    message: string;
  }>({
    show: false,
    message: "",
  });
  // Add success state for export
  const [exportSuccess, setExportSuccess] = React.useState<{
    show: boolean;
    message: string;
  }>({
    show: false,
    message: "",
  });

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

  // Export function
  const handleExport = async () => {
    try {
      setIsExporting(true);
      setExportError({ show: false, message: "" });
      setExportSuccess({ show: false, message: "" });

      // Get reconciliation data from localStorage
      const reconciliationData = localStorage.getItem("reconciliation");

      if (!reconciliationData) {
        throw new Error("No reconciliation data found");
      }

      const parsedData = JSON.parse(reconciliationData);

      // Format the data according to the API's expected structure
      const formattedData = {
        matches: (parsedData.matches || []).map((match: any) => ({
          ...match,
          status: match.status || "matched",
        })),
        unmatched: parsedData.unmatched || {},
        only_in_file1: parsedData.only_in_file1 || [],
        only_in_file2: parsedData.only_in_file2 || [],
      };

      // Send POST request to API
      const response = await fetch(
        "https://api-dev.reconxi.com/api/v1/reconcile/export",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: formattedData,
          }),
        }
      );

      // Check for errors with better error reporting
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.message || `Export failed with status: ${response.status}`;
        console.error("API error:", errorData);
        throw new Error(errorMessage);
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reconciliation_export_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Show success modal after successful download
      setExportSuccess({
        show: true,
        message:
          "Export completed successfully! Your file has been downloaded.",
      });
    } catch (error) {
      console.error("Export error:", error);
      setExportError({
        show: true,
        message:
          error instanceof Error ? error.message : "Failed to export data",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {showErrorModal && (
        <ErrorModal
          title="Oops"
          open={showErrorModal}
          onOpenChange={(open) => setShowErrorModal(open)}
          buttonTitle="Go to Upload"
          buttonHref="/file-upload"
          message="CSV Table Structure not currently supported!"
        />
      )}

      {exportError.show && (
        <ErrorModal
          title="Export Failed"
          open={exportError.show}
          onOpenChange={(open) =>
            setExportError({ ...exportError, show: open })
          }
          buttonTitle="Close"
          buttonHref="#"
          message={
            exportError.message || "Failed to export data. Please try again."
          }
        />
      )}

      {exportSuccess.show && (
        <SuccessModal
          title="Export Successful"
          open={exportSuccess.show}
          onOpenChange={(open) =>
            setExportSuccess({ ...exportSuccess, show: open })
          }
          buttonTitle="Close"
          buttonHref="#"
          message={
            exportSuccess.message || "Your data has been exported successfully!"
          }
        />
      )}

      <div className="space-y-6 py-6">
        {/* header section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Matched Results</h1>
          <button
            className="px-14 py-4 bg-[#2E604A] text-white rounded-md w-[165px] h-[50px] flex items-center justify-center"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Exporting...
              </>
            ) : (
              "Export"
            )}
          </button>
        </div>

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
