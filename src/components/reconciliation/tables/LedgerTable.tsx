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
import { CheckIcon, VerticalDotsIcon } from "../../Icon/Icons";
import { useAuth } from "../../context/AuthContext";
import { useReconciliation } from "@/src/context/ReconciliationProvider";
import {
  addValueAndLabel,
  TransactionOption,
} from "../../../helpers/searchComboxOptionExpander";
import { FindPossibleMatchModal } from "../modals/FindPossibleMatchModal";
import {
  ReconciliationItem,
  FrontendTransaction,
} from "../../../types/frontendResponseTypes";
import QuickFindAndMatchComboBox from "../quickFind/QuickFindAndMatchComboBox";
import useRowHeights from "../../../hooks/useRowHeights";

export function LedgerTable() {
  const { isAuthenticated } = useAuth();

  const {
    pagination,
    setPagination,
    paginatedData,
    unmatchedLedgerTransactions,
    handleMatch: onMatch,
    setSelectedRow,
    setShowUnlinkModal,
    userPlan,
  } = useReconciliation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ReconciliationItem>({} as ReconciliationItem);
  const transactionOptions: TransactionOption[] = addValueAndLabel(
    unmatchedLedgerTransactions
  );
  const rowHeights = useRowHeights(paginatedData);

  // Add plan validation helper
  const hasPlanAccess = (featureType: "export" | "unlink" | "match") => {
    if (!featureType) return false;

    switch (userPlan) {
      case "starter":
        return true;
      case "basic":
        return false;
      default:
        return true; // business plan has all features
    }
  };

  const baseColumns: ColumnDef<ReconciliationItem>[] = [
    {
      accessorKey: "ledger_txn.date",
      header: "Date",
      cell: ({ row }) => {
        const ledgers = row.original.ledgers;
        if (!ledgers || ledgers.length === 0) return null;

        return (
          <div className="flex flex-col px-1">
            {ledgers.map((ledger, index) => (
              <div
                key={`${ledger.ledger_txn.id}-${index}`}
                className={cn(
                  "px-3 py-5",
                  index > 0 ? "border-t border-gray-200" : ""
                )}
              >
                {ledger.ledger_txn.date}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "ledger_txn.description",
      header: "Description",
      cell: ({ row }) => {
        const ledgers = row.original.ledgers;
        if (!ledgers || ledgers.length === 0) return null;

        return (
          <div className="flex flex-col px-1">
            {ledgers.map((ledger, index) => (
              <div
                key={`${ledger.ledger_txn.id}-${index}`}
                className={cn(
                  "px-3 py-5",
                  index > 0 ? "border-t border-gray-200" : ""
                )}
              >
                {ledger.ledger_txn.description}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "ledger_txn.amount",
      header: "Amount",
      cell: ({ row }) => {
        const ledgers = row.original.ledgers;
        if (!ledgers || ledgers.length === 0) return null;

        return (
          <div className="flex flex-col px-1">
            {ledgers.map((ledger, index) => (
              <div
                key={`${ledger.ledger_txn.id}-${index}`}
                className={cn(
                  "px-3 py-5",
                  index > 0 ? "border-t border-gray-200" : ""
                )}
              >
                {ledger.ledger_txn.amount}
              </div>
            ))}
          </div>
        );
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
    ...(isAuthenticated && hasPlanAccess("match") ? [actionColumn] : []),
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
                      : row.original.ledgers
                        ? "bg-red-50 hover:bg-red-50"
                        : "hover:bg-white"
                  )}
                  style={{ height: `${rowHeights[index]}px` }}
                >
                  {row.original.ledgers ? (
                    // If ledger transactions exist, render normal cells
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
                    // If no ledger transaction, render a single combobox spanning all cells except action
                    <>
                      <TableCell
                        colSpan={
                          isAuthenticated && hasPlanAccess("match")
                            ? ledgerColumns.length - 1
                            : ledgerColumns.length
                        }
                        className={cn("px-4 !h-[0px]", {
                          "border-r": isAuthenticated && hasPlanAccess("match"),
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
                          onConfirm={(option) => {
                            const selectedOption: FrontendTransaction = {
                              id: option.id,
                              description: option.description,
                              date: option.date,
                              amount: option.amount,
                            };
                            console.log("Confirmed:", option);

                            if (
                              reconciledDataRow.statements &&
                              reconciledDataRow.statements[0]?.bank_txn
                            ) {
                              onMatch(
                                reconciledDataRow.statements.map(
                                  (stat) => stat?.bank_txn
                                ),
                                [selectedOption]
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
                      {isAuthenticated && hasPlanAccess("match") && (
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
        reconciledDataRow={selectedTransaction}
        potentialMatches={unmatchedLedgerTransactions}
        onMatch={onMatch}
      />
    </>
  );
}
