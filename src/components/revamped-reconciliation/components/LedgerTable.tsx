"use client";

import { Button } from "@/src/components/ui/button";
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
import { MoreVertical } from "lucide-react";
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

export function LedgerTable() {
  const {
    pagination,
    setPagination,
    paginatedData,
    unmatchedBankTransactions,
    handleMatch: onMatch,
  } = useReconciliation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ReconciliationItem>({} as ReconciliationItem);
  const transactionOptions: TransactionOption[] = addValueAndLabel(
    unmatchedBankTransactions
  );

  const ledgerColumns: ColumnDef<ReconciliationItem>[] = [
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
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const reconciledDataRow = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {row.original.ledger_txn && (
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedTransaction(reconciledDataRow);
                    setModalOpen(true);
                  }}
                >
                  Find possible match
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
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
                        ? "w-[60px] px-6 h-12"
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
                                reconciledDataRow.reconciliation_pair_id,
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
                            <Button variant="ghost" className="size-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4 text-gray-600" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {row.original.bank_txn && (
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedTransaction(reconciledDataRow);
                                  setModalOpen(true);
                                }}
                              >
                                Find possible match
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
