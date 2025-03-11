"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { useReconciliationLogic } from "@/src/components/reconciliation/main/useReconciliationLogic";
import { cn } from "@/src/lib/utils";
import { Transaction } from "@/src/types/reconciliation";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ledgerColumns } from "./columns";
import { FindPossibleMatchModal } from "./FindPossibleMatchModal";

export function LedgerTable() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBankTransaction, setSelectedBankTransaction] =
    useState<Transaction | null>(null);

  const {
    pagination,
    setPagination,
    paginatedBankData,
    paginatedLedgerData,
    data,
    // setData,
    handleMatch,
  } = useReconciliationLogic();

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

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader className="bg-[#F9FAFB] h-[52px] border-b">
          {ledgerTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="!border-b-0">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-6 border-r"
                  // className={cn("px-6 border-r", {
                  //   "border-r-0": index === headerGroup.headers.length - 1,
                  //   "border-r": index !== headerGroup.headers.length - 1,
                  // })}
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
          {paginatedLedgerData.length > 0 ? (
            paginatedBankData.map((bankRowData, index) => {
              // bankTable.getRowModel().rows.map((row, index) => {
              const matchingData = data.matches.find(
                (match) => match.file1_transaction === bankRowData
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
                          "px-6 border-r h-[64px]",
                          "max-w-[200px] md:max-w-none",
                          "whitespace-nowrap overflow-hidden text-ellipsis"
                        )}
                        title={matchingLedger["Date"]}
                      >
                        {matchingLedger["Date"]}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "px-6 border-r h-[64px]",
                          "max-w-[400px] md:max-w-none",
                          "whitespace-nowrap overflow-hidden text-ellipsis"
                        )}
                        title={matchingLedger["Description"]}
                      >
                        {matchingLedger["Description"]}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "px-6 border-r h-[64px]",
                          "max-w-[200px] md:max-w-none",
                          "whitespace-nowrap overflow-hidden text-ellipsis"
                        )}
                        title={matchingLedger?.["Amount"]?.toString() || ""}
                      >
                        {matchingLedger["Amount"] || ""}
                      </TableCell>
                      <TableCell className="px-6 h-[64px]"></TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="px-6 border-r h-[64px]"></TableCell>
                      <TableCell className="px-6 border-r h-[64px]"></TableCell>
                      <TableCell className="px-6 h-[64px]"></TableCell>
                      <TableCell
                        className={cn(
                          "px-6 border-l h-[64px]",
                          "w-[40px] md:max-w-none",
                          "whitespace-nowrap overflow-hidden text-ellipsis"
                        )}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedBankTransaction(bankRowData);
                                setIsOpen(true);
                              }}
                            >
                              Find possible match
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
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

      {selectedBankTransaction && (
        <FindPossibleMatchModal
          isOpen={isOpen}
          onClose={() => {
            setSelectedBankTransaction(null);
            setIsOpen(false);
          }}
          bankTransaction={selectedBankTransaction}
          unmatched_file2={data.unmatched.unmatched_file2}
          onMatch={handleMatch}
        />
      )}
    </div>
  );
}
