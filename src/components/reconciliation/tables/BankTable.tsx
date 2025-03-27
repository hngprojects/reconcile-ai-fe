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
import { useReconciliation } from "@/src/context/ReconciliationProvider";
import { cn } from "@/src/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  addValueAndLabel,
  TransactionOption,
} from "../../../helpers/searchComboxOptionExpander";
import useRowHeights from "../../../hooks/useRowHeights";
import {
  FrontendTransaction,
  ReconciliationItem,
} from "../../../types/frontendResponseTypes";
import { CheckIcon, VerticalDotsIcon } from "../../Icon/Icons";
import { useAuth } from "../../context/AuthContext";
import { FindPossibleMatchModal } from "../modals/FindPossibleMatchModal";
import QuickFindAndMatchComboBox from "../quickFind/QuickFindAndMatchComboBox";

export function BankTable() {
  const { isAuthenticated } = useAuth();

  const {
    pagination,
    setPagination,
    paginatedData,
    unmatchedBankTransactions,
    unmatchedLedgerTransactions,
    handleMatch: onMatch,
    setSelectedRow,
    setShowUnlinkModal,
    userPlan,
  } = useReconciliation();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransactionRow, setSelectedTransactionRow] =
    useState<ReconciliationItem>({} as ReconciliationItem);
  const transactionOptions: TransactionOption[] = addValueAndLabel(
    unmatchedBankTransactions
  );
  const rowHeights = useRowHeights(paginatedData);

  // Base columns that are always visible
  const baseColumns: ColumnDef<ReconciliationItem>[] = [
    {
      accessorKey: "bank_txn.date",
      header: "Date",
      cell: ({ row }) => {
        const statements = row.original.statements;
        if (!statements || statements.length === 0) return null;

        return (
          <div className="flex flex-col px-1">
            {statements.map((statement, index) => (
              <div
                key={`${statement.bank_txn.id}-${index}`}
                className={cn(
                  "px-3 py-5",
                  index > 0 ? "border-t border-gray-200" : ""
                )}
              >
                {statement.bank_txn.date}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "bank_txn.description",
      header: "Description",
      cell: ({ row }) => {
        const statements = row.original.statements;
        if (!statements || statements.length === 0) return null;

        return (
          <div className="flex flex-col px-1">
            {statements.map((statement, index) => (
              <div
                key={`${statement.bank_txn.id}-${index}`}
                className={cn(
                  "px-3 py-5",
                  index > 0 ? "border-t border-gray-200" : ""
                )}
              >
                {statement.bank_txn.description}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "bank_txn.amount",
      header: "Amount",
      cell: ({ row }) => {
        const statements = row.original.statements;
        if (!statements || statements.length === 0) return null;

        return (
          <div className="flex flex-col px-1">
            {statements.map((statement, index) => (
              <div
                key={`${statement.bank_txn.id}-${index}`}
                className={cn(
                  "px-3 py-5",
                  index > 0 ? "border-t border-gray-200" : ""
                )}
              >
                {statement.bank_txn.amount}
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  // Conditional action column
  const actionColumn: ColumnDef<ReconciliationItem> = {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const reconciledDataRow = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="cursor-pointer flex justify-center items-center w-full"
            >
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
                  setSelectedTransactionRow(reconciledDataRow);
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

  // Combine columns based on authentication
  const bankColumns = [
    ...baseColumns,
    ...(isAuthenticated && userPlan === "business" ? [actionColumn] : []),
  ];

  const table = useReactTable({
    data: paginatedData,
    columns: bankColumns,
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
                        ? "w-16 max-w-16 text-center px-2 h-12"
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
            {table.getRowModel().rows.map((row, index) => {
              const reconciledDataRow = row.original;

              return (
                <TableRow
                  key={row.id}
                  className={cn(
                    "transition-colors",
                    row.original.matched
                      ? "bg-green-50 hover:bg-green-50"
                      : row.original.statements
                        ? "bg-red-50 hover:bg-red-50"
                        : "hover:bg-white"
                  )}
                  style={{ height: `${rowHeights[index]}px` }}
                >
                  {row.original.statements ? (
                    // If bank statements exist, render normal cells
                    row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={cn("py-0", {
                          "border-r":
                            index !== row.getVisibleCells().length - 1,
                        })}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))
                  ) : (
                    // If no bank transaction, render a single combobox spanning all cells except action
                    <>
                      <TableCell
                        colSpan={
                          isAuthenticated && userPlan === "business"
                            ? bankColumns.length - 1
                            : bankColumns.length
                        }
                        className={cn("px-4 !h-[0px]", {
                          "border-r":
                            isAuthenticated && userPlan === "business",
                        })}
                      >
                        <QuickFindAndMatchComboBox
                          commandProps={{
                            label: "Select possible match",
                          }}
                          defaultOptions={transactionOptions}
                          onSearchSync={handleSearch}
                          placeholder="Find possible match"
                          hidePlaceholderWhenSelected
                          onConfirm={async (option) => {
                            const selectedOption: FrontendTransaction = {
                              id: option.id,
                              description: option.description,
                              date: option.date,
                              amount: option.amount,
                            };
                            console.log("Confirmed:", option);

                            if (
                              reconciledDataRow.ledgers &&
                              reconciledDataRow.ledgers[0]?.ledger_txn
                            ) {
                              onMatch(
                                [selectedOption],
                                reconciledDataRow.ledgers.map(
                                  (ledg) => ledg.ledger_txn
                                )
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
                      {isAuthenticated && userPlan === "business" && (
                        <TableCell className="py-5 flex items-center justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                type="button"
                                className="cursor-pointer flex justify-center items-center"
                              >
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
                                    setSelectedTransactionRow(
                                      reconciledDataRow
                                    );
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
                      )}
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <FindPossibleMatchModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        reconciledDataRow={selectedTransactionRow}
        potentialMatches={
          selectedTransactionRow.statements
            ? unmatchedLedgerTransactions
            : unmatchedBankTransactions
        }
        onMatch={onMatch}
      />
    </>
  );
}
