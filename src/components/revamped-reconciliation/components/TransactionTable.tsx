"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Transaction } from "../types/frontendResponseTypes";
import { cn } from "@/src/lib/utils";

interface TransactionTableProps {
  transaction: Transaction | null;
  status: "matched" | "unmatched" | "empty";
}

export function TransactionTable({
  transaction,
  status,
}: TransactionTableProps) {
  const getRowStyles = () => {
    switch (status) {
      case "matched":
        return "bg-[#F3FEFA] hover:!bg-[#F3FEFA]";
      case "unmatched":
        return "bg-[#FFF4F0] hover:!bg-[#FFF4F0]";
      default:
        return "";
    }
  };
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        {/* Table Header */}
        <TableHeader className="bg-[#F9FAFB] h-[52px] border-b">
          <TableRow className="!border-b-0">
            <TableHead className="text-left px-6 border-r">Date</TableHead>
            <TableHead className="text-left px-6 border-r">
              Description
            </TableHead>
            <TableHead className="text-left px-6">Amount</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {status === "empty" ? (
            <TableRow className="hover:bg-white">
              <TableCell className="border-r h-[64px]"></TableCell>
              <TableCell className="px-6 border-r h-[64px]"></TableCell>
              <TableCell className="px-6 h-[64px]"></TableCell>
            </TableRow>
          ) : (
            <TableRow className={cn(getRowStyles())}>
              <TableCell className="px-6 border-r h-[64px] whitespace-nowrap overflow-hidden text-ellipsis">
                {transaction?.date}
              </TableCell>
              <TableCell className="px-6 border-r h-[64px] whitespace-nowrap overflow-hidden text-ellipsis">
                {transaction?.description}
              </TableCell>
              <TableCell className="px-6 h-[64px] whitespace-nowrap overflow-hidden text-ellipsis">
                {transaction?.amount}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
