"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
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
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useReconciliation } from "../context/ReconciliationProvider";
import {
  addValueAndLabel,
  TransactionOption,
} from "../helpers/searchComboxOptionExpander";
import {
  ReconciliationItem,
  Transaction,
} from "../types/frontendResponseTypes";
import { DesktopFindPossibleMatchModal } from "./DesktopFindPossibleMatchModal";
import QuickFindAndMatchComboBox from "./quickFind/QuickFindAndMatchComboBox";
import { CheckIcon, VerticalDotsIcon } from "../../Icon/Icons";
import { useAuth } from "../../context/AuthContext";

export function LedgerTable() {
  const { isAuthenticated } = useAuth();

  const {
    pagination,
    setPagination,
    paginatedData,
    unmatchedBankTransactions,
    handleMatch: onMatch,
    setSelectedRow,
    setShowUnlinkModal,
  } = useReconciliation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ReconciliationItem>({} as ReconciliationItem);
  const transactionOptions: TransactionOption[] = addValueAndLabel(
    unmatchedBankTransactions
  );

  const baseColumns: ColumnDef<ReconciliationItem>[] = [
    {
      accessorKey: "ledger_txn.date",
      header: "Date",
      cell: ({ row }) => {
        const item = row.original;
        return item.ledger_txn ? item.ledger_txn.date : null;
      },
    },
    {
      accessorKey: "ledger_txn.description",
      header: "Description",
      cell: ({ row }) => {
        const item = row.original;
        return item.ledger_txn ? item.ledger_txn.description : null;
      },
    },
    {
      accessorKey: "ledger_txn.amount",
      header: "Amount",
      cell: ({ row }) => {
        const item = row.original;
        return item.ledger_txn ? item.ledger_txn.amount : null;
      },
    },
  ];

  const actionColumn: ColumnDef<ReconciliationItem> = {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const reconciledDataRow = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="cursor-pointer flex justify-center items-center">
              <span className="sr-only">Open menu</span>
              <VerticalDotsIcon className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {reconciledDataRow.matched ? (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRow(row.original);
                  setShowUnlinkModal(true);
                }}
                className="gap-0.5"
              >
                <CheckIcon className="text-[#333333] h-7 w-7" />
                <span className="text-sm text-nowrap text-[#333333] cursor-pointer">
                  Unlink Matched
                </span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="gap-0.5"
                onClick={() => {
                  setSelectedTransaction(reconciledDataRow);
                  setModalOpen(true);
                }}
              >
                <CheckIcon className="text-[#333333] h-7 w-7" />
                <span className="text-sm text-nowrap text-[#333333] cursor-pointer">
                  Find Possible Match
                </span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };

  const ledgerColumns = [
    ...baseColumns,
    ...(isAuthenticated ? [actionColumn] : []),
  ];

  const table = useReactTable({
    data: paginatedData,
    columns: ledgerColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    manualPagination: true,
    pageCount: Math.ceil(paginatedData.length / pagination.pageSize),
  });

  const handleSearch = (query: string) => {
    // Always return full list for empty queries
    if (!query.trim()) return transactionOptions;

    return transactionOptions.filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(query.toLowerCase()) ||
        transaction.date.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.id === "action"
                        ? "w-16 max-w-16 text-end px-2 h-12"
                        : "px-6 h-12"
                    }
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
            {table.getRowModel().rows.map((row) => {
              const reconciledDataRow = row.original;

              return (
                <TableRow
                  key={row.id}
                  className={cn(
                    "transition-colors",
                    row.original.matched
                      ? "bg-green-50 hover:bg-green-50"
                      : row.original.ledger_txn
                        ? "bg-red-50 hover:bg-red-50"
                        : "hover:bg-white"
                  )}
                >
                  {row.original.ledger_txn ? (
                    // If ledger transaction exists, render normal cells
                    row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={cn("px-6 py-0 h-[3.5rem]", {
                          "border-r":
                            index !== row.getVisibleCells().length - 1,
                          "flex items-center justify-center":
                            cell.column.id === "action",
                        })}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))
                  ) : (
                    // If no ledger transaction, render a single combobox spanning all cells except action
                    <>
                      <TableCell
                        colSpan={ledgerColumns.length - 1}
                        className="px-4 py-0 h-[3.5rem] border-r"
                      >
                        {/* <TableCell
                        colSpan={ledgerColumns.length}
                        className="px-4 h-[3.5rem]"
                      > */}
                        <QuickFindAndMatchComboBox
                          commandProps={{
                            label: "Select possible match",
                          }}
                          defaultOptions={transactionOptions}
                          onSearchSync={handleSearch}
                          placeholder="Find possible match"
                          hidePlaceholderWhenSelected
                          onConfirm={(option) => {
                            const selectedOption: Transaction = {
                              id: `bank_txn_${Date.now()}`,
                              description: option.description,
                              date: option.date,
                              amount: option.amount,
                            };
                            console.log("Confirmed:", option);

                            if (reconciledDataRow.bank_txn) {
                              onMatch(
                                reconciledDataRow.bank_txn,
                                selectedOption
                              );
                            }
                          }}
                          emptyIndicator={
                            <p className="text-center text-sm">
                              No transactions found
                            </p>
                          }
                        />
                      </TableCell>
                      <TableCell className="px-6 h-[3.5rem] py-0 flex items-center justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="cursor-pointer flex justify-center items-center">
                              <span className="sr-only">Open menu</span>
                              <VerticalDotsIcon className="h-5 w-5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {reconciledDataRow.matched ? (
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRow(row.original);
                                  setShowUnlinkModal(true);
                                }}
                                className="gap-0.5"
                              >
                                <CheckIcon className="text-[#333333] h-7 w-7" />
                                <span className="text-sm text-nowrap text-[#333333] cursor-pointer">
                                  Unlink Matched
                                </span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                className="gap-0.5"
                                onClick={() => {
                                  setSelectedTransaction(reconciledDataRow);
                                  setModalOpen(true);
                                }}
                              >
                                <CheckIcon className="text-[#333333] h-7 w-7" />
                                <span className="text-sm text-nowrap text-[#333333] cursor-pointer">
                                  Find Possible Match
                                </span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <DesktopFindPossibleMatchModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        reconciledDataRow={selectedTransaction}
        potentialMatches={unmatchedBankTransactions}
        onMatch={onMatch}
      />
    </>
  );
}
