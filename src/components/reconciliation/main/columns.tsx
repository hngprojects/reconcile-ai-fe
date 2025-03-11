"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "./reconciliation";

export const bankColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => row.getValue("date"),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.getValue("description"),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => row.getValue("amount"),
  },
];

export const ledgerColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => row.getValue("date"),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.getValue("description"),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => row.getValue("amount"),
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => row.getValue("action"),
  },
];
