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
import {
  ReconciliationItem,
  Transaction,
} from "../types/frontendResponseTypes";
import { ledgerColumns } from "./columns";
import { SearchCombobox } from "./SearchComboBox";

interface LedgerTableProps {
  data: ReconciliationItem[];
  unmatchedLedgerTransactions: Transaction[];
  onMatch: (bankId: string, ledgerId: string) => void;
}

export function LedgerTable({
  data,
  unmatchedLedgerTransactions,
  onMatch,
}: LedgerTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: ledgerColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="px-6 h-12">
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
                  : row.original.ledger_txn
                  ? "bg-red-50"
                  : ""
              }
            >
              {row.original.ledger_txn ? (
                // If ledger transaction exists, render normal cells
                row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-6">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))
              ) : (
                // If no ledger transaction, render a single combobox spanning all cells except action
                <>
                  <TableCell
                    colSpan={ledgerColumns.length - 1}
                    className="px-4"
                  >
                    <SearchCombobox
                      items={unmatchedLedgerTransactions.map((txn) => ({
                        label: `${txn.description} - ${txn.amount}`,
                        value: txn.id,
                      }))}
                      placeholder="Find possible Match"
                      onSelect={(value) => {
                        if (row.original.bank_txn) {
                          onMatch(row.original.bank_txn.id, value);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
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
