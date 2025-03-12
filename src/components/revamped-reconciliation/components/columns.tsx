import { ColumnDef } from "@tanstack/react-table";
import { ReconciliationItem } from "../types/frontendResponseTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { CheckIcon, MoreVertical, XIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

// Bank Statement column definition
export const bankColumns: ColumnDef<ReconciliationItem>[] = [
  {
    accessorKey: "bank_txn.date",
    header: "Date",
    cell: ({ row }) => {
      const item = row.original;
      return item.bank_txn ? item.bank_txn.date : null;
    },
  },
  {
    accessorKey: "bank_txn.description",
    header: "Description",
    cell: ({ row }) => {
      const item = row.original;
      return item.bank_txn ? item.bank_txn.description : null;
    },
  },
  {
    accessorKey: "bank_txn.amount",
    header: "Amount",
    cell: ({ row }) => {
      const item = row.original;
      return item.bank_txn ? item.bank_txn.amount : null;
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      console.log({ row });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Find Possible Match</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Company Ledger column definition
export const ledgerColumns: ColumnDef<ReconciliationItem>[] = [
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
      const ledger = row.original.ledger_txn;
      console.log({ ledger });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Find Possible Match</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Status column definition
export const statusColumn: ColumnDef<ReconciliationItem>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const matched = row.original.matched;

      return (
        <div
          className={cn(
            "flex justify-center items-center text-sm font-semibold px-1 h-10",
            matched
              ? "bg-[#F3FEFA] text-[#007A55]"
              : "bg-[#FFF4F0] text-[#C50700]"
          )}
        >
          {matched ? "Matched" : "Unmatched"}
          <div
            className={cn(
              "h-4 w-4 rounded-full ml-2 flex items-center justify-center",
              matched ? "bg-[#007A55]" : "bg-[#C50700]"
            )}
          >
            {matched ? (
              <CheckIcon className="h-3 w-3 text-white" />
            ) : (
              <XIcon className="h-3 w-3 text-white" />
            )}
          </div>
        </div>
      );
    },
  },
];
