"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "./reconciliation";

export const bankColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "Date",
    header: "Date",
    cell: ({ row }) => row.getValue("Date"),
  },
  {
    accessorKey: "Description",
    header: "Description",
    cell: ({ row }) => row.getValue("Description"),
  },
  {
    accessorKey: "Amount",
    header: "Amount",
    cell: ({ row }) => row.getValue("Amount"),
  },
];

export const ledgerColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "Date",
    header: "Date",
    cell: ({ row }) => row.getValue("Date"),
  },
  {
    accessorKey: "Description",
    header: "Description",
    cell: ({ row }) => row.getValue("Description"),
  },
  {
    accessorKey: "Amount",
    header: "Amount",
    cell: ({ row }) => row.getValue("Amount"),
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => row.getValue("action"),
  },
];
