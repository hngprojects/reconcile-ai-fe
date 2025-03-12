"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Button } from "@/src/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { bankColumns } from "./columns";
import {
  ReconciliationItem,
  Transaction,
} from "../types/frontendResponseTypes";
import { SearchCombobox } from "./SearchComboBox";

interface BankStatementTableProps {
  data: ReconciliationItem[];
  unmatchedBankTransactions: Transaction[];
  onMatch: (bankId: string, ledgerId: string) => void;
}

export function BankStatementTable({
  data,
  unmatchedBankTransactions,
  onMatch,
}: BankStatementTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: bankColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
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
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className={
                row.original.matched
                  ? "bg-green-50"
                  : row.original.bank_txn
                  ? "bg-red-50"
                  : ""
              }
            >
              {row.original.bank_txn ? (
                // If bank transaction exists, render normal cells
                row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={
                      cell.column.id === "action"
                        ? "px-6 flex items-center justify-center"
                        : "px-6 h-[3.3rem]"
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))
              ) : (
                // If no bank transaction, render a single combobox spanning all cells except action
                <>
                  <TableCell
                    colSpan={bankColumns.length - 1}
                    className="px-4 h-[3.3rem]"
                  >
                    <SearchCombobox
                      items={unmatchedBankTransactions.map((txn) => ({
                        label: `${txn.description} - ${txn.amount}`,
                        value: txn.id,
                      }))}
                      placeholder="Find possible Match"
                      onSelect={(value) => {
                        if (row.original.ledger_txn) {
                          onMatch(value, row.original.ledger_txn.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="px-6 flex items-center justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Find Possible Match</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
