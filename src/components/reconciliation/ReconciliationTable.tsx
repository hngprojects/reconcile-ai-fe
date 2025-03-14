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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { SuccessToast } from "./SuccessToast";
import { DownloadCloudIcon, XIcon } from "../Icon/Icons";
import { SearchCombobox } from "@/src/components/reconciliation/SearchComboBox";
import { toast } from "sonner";
import UnlinkModal from "../modal/UnlinkModal";

interface Transaction {
  Date: string;
  Description: string;
  Amount: number | string;
  [key: string]: string | number;
}

interface Match {
  file1_transaction: Transaction;
  file2_transaction: Transaction;
  status?: string;
}

interface ReconciliationData {
  matches: Match[];
  unmatched?: Record<string, Transaction[]>;
  only_in_file1?: Transaction[];
  only_in_file2?: Transaction[];
}
interface ReconciliationTableProps {
  leftTableTitle?: string;
  rightTableTitle?: string;
}

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
    handleMatch,
    handleUnlink,
  } = useReconciliationLogic();

  const [isExporting, setIsExporting] = React.useState(false);

  // Add state for UnlinkModal
  const [activeStatusIndex, setActiveStatusIndex] = React.useState<
    number | null
  >(null);
  const [showUnlinkModal, setShowUnlinkModal] = React.useState(false);
  const [loadingUnlinkModal, setLoadingUnlinkModal] = React.useState(false);

  // Add state for custom toasts
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [showErrorToast, setShowErrorToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

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
        cell: (info) => info.getValue(),
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
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  const length = pagination.pageSize === paginatedBankData.length ? pagination.pageSize : paginatedBankData.length
  // Create status column data
  const statusData = React.useMemo(
    () =>
      [
        ...paginatedBankData
          .filter(
            (bank) => bank["Date"] && bank["Description"] && bank["Amount"]
          )
          .map((bankItem) => ({
            matched:
              data.matches.find((val) => val.file1_transaction == bankItem) !==
              undefined
                ? true
                : false,
          })),
        ...paginatedLedgerData
          .filter(
            (ledg) =>
              !data.matches.find((val) => val.file2_transaction == ledg) ||
              (!ledg["Date"] && !ledg["Description"] && !ledg["Amount"])
          )
          .map(() => ({
            matched: false,
          })),
      ].slice(0, length),
    [paginatedBankData, data.matches, paginatedLedgerData, pagination.pageSize]
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
    pageCount: Math.ceil(
      (paginatedBankData.length + paginatedLedgerData.length) /
        pagination.pageSize
    ),
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
    pageCount: Math.ceil(
      (paginatedBankData.length + paginatedLedgerData.length) /
        pagination.pageSize
    ),
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

  // Show CSV structure error toast
  React.useEffect(() => {
    if (showErrorModal) {
      setToastMessage("CSV Table Structure not currently supported!");
      setShowErrorToast(true);
      setShowErrorModal(false);
    }
  }, [showErrorModal, setShowErrorModal]);

  // Auto-hide toast after 5 seconds
  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (showSuccessToast || showErrorToast) {
      timer = setTimeout(() => {
        setShowSuccessToast(false);
        setShowErrorToast(false);
      }, 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showSuccessToast, showErrorToast]);

  // Export function
  const handleExport = async () => {
    try {
      setIsExporting(true);

      // Get reconciliation data from localStorage
      const reconciliationData = localStorage.getItem("reconciliation");

      if (!reconciliationData) {
        throw new Error("No reconciliation data found");
      }

      const parsedData = JSON.parse(reconciliationData) as ReconciliationData;

      // Format the data according to the API's expected structure
      const formattedData = {
        matches: (parsedData.matches || []).map((match: Match) => ({
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

      // Show success toast using custom component
      setToastMessage("Your data has been exported successfully!");
      setShowSuccessToast(true);
    } catch (error) {
      console.error("Export error:", error);
      // Show error toast using custom component
      setToastMessage(
        error instanceof Error ? error.message : "Failed to export data"
      );
      setShowErrorToast(true);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <div className="space-y-6 py-6">
        {/* Custom Toast Message */}
        {showSuccessToast && (
          <div className="fixed top-4 right-4 z-50 animate-in fade-in duration-500">
            <SuccessToast
              message={toastMessage}
              onClose={() => {
                setShowSuccessToast(!setShowSuccessToast);
              }}
            />
          </div>
        )}
        {/* header section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Matched Results</h1>
          <button
            className="px-6 py-4 border border-[#2E604A] text-[#2E604A] font-medium hover:bg-gray-100 rounded-md w-[150px] h-12 flex items-center justify-center cursor-pointer"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Exporting...
              </>
            ) : (
              <>
                <DownloadCloudIcon className="mr-2 w-5 h-5" />
                Export
              </>
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
                      if (
                        row.original["Description"] ||
                        row.original["Date"] ||
                        row.original["Amount"]
                      ) {
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
                                    row.getVisibleCells().length - 1 &&
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
                      } else {
                        return (
                          <TableRow key={row.id}>
                            <TableCell
                              colSpan={ledgerColumns.length}
                              className="px-4 h-[64px] italic font-[300] w-full"
                            >
                              <SearchCombobox
                                items={data.unmatched.unmatched_file1.map(
                                  (txn) => ({
                                    label: `${txn["Description"]} - ${txn["Amount"]}`,
                                    value: JSON.stringify(txn),
                                  })
                                )}
                                placeholder="Find possible match"
                                onSelect={async (value) => {
                                  try {
                                    await handleMatch(
                                      paginatedLedgerData[row.index],
                                      "statement",
                                      JSON.parse(value)
                                    );
                                    toast.success(
                                      "Transactions matched successfully!"
                                    );
                                  } catch {
                                    toast.error("Failed to match transactions");
                                  }
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      }
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
                          : "bg-[#FFF4F0] hover:bg-[#FFF4F0]",
                        activeStatusIndex === index &&
                          "bg-[#CEFFED] hover:bg-[#CEFFED]"
                      )}
                    >
                      {/* onClick={() => unlink()} */}
                      <TableCell
                        className={cn(
                          `text-center h-[64px] relative`,
                          item.matched && "cursor-pointer"
                        )}
                        onClick={() => {
                          if (item.matched) {
                            setActiveStatusIndex(index);
                          }
                        }}
                      >
                        {activeStatusIndex === index && (
                          <button
                            className="absolute hover:bg-black/20 p-1 rounded-full cursor-pointer top-2 right-1.5"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.matched) {
                                setShowUnlinkModal(true);
                              }
                            }}
                          >
                            <XIcon className="w-3 h-3 text-[#333333]" />
                          </button>
                        )}
                        <StatusBadge
                          className={cn(
                            activeStatusIndex === index && "bg-[#CEFFED]"
                          )}
                          matched={item.matched}
                          hideIcon={activeStatusIndex === index}
                        />
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
                  {ledgerTable.getRowModel().rows.length > 0 ? (
                    ledgerTable.getRowModel().rows.map((row, index) => {
                      const isMatched = statusData[index]?.matched;
                      if (
                        row.original["Description"] &&
                        row.original["Date"] &&
                        row.original["Amount"]
                      ) {
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
                                    row.getVisibleCells().length - 1 &&
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
                      } else {
                        return (
                          <TableRow key={row.id}>
                            <TableCell
                              colSpan={ledgerColumns.length}
                              className="px-4 h-[64px] italic font-[300] w-full"
                            >
                              <SearchCombobox
                                items={data.unmatched.unmatched_file2.map(
                                  (txn) => ({
                                    label: `${txn["Description"]} - ${txn["Amount"]}`,
                                    value: JSON.stringify(txn),
                                  })
                                )}
                                placeholder="Find possible match"
                                onSelect={async (value) => {
                                  try {
                                    await handleMatch(
                                      paginatedBankData[row.index],
                                      "ledger",
                                      JSON.parse(value)
                                    );
                                    toast.success(
                                      "Transactions matched successfully!"
                                    );
                                  } catch {
                                    toast.error("Failed to match transactions");
                                  }
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      }
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

        {/* Unlink Modal */}
        <UnlinkModal
          isOpen={showUnlinkModal}
          isLoading={loadingUnlinkModal}
          onClose={() => {
            setShowUnlinkModal(false);
            setActiveStatusIndex(null);
          }}
          onConfirm={async () => {
            if (activeStatusIndex !== null) {
              setLoadingUnlinkModal(true);
              try {
                await handleUnlink(
                  paginatedBankData[activeStatusIndex],
                  paginatedLedgerData[activeStatusIndex]
                );
                toast.success("Transactions unlinked successfully!");
              } catch {
                toast.error("Failed to unlink transactions");
              } finally {
                setShowUnlinkModal(false);
                setActiveStatusIndex(null);
                setLoadingUnlinkModal(false);
              }
            }
          }}
        />
      </div>
    </>
  );
}
