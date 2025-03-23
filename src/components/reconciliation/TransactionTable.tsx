"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { FrontendTransaction } from "../../types/frontendResponseTypes";
import { cn } from "@/src/lib/utils";

interface TransactionTableProps {
  transaction?: FrontendTransaction | null;
  transactions?: FrontendTransaction | FrontendTransaction[] | null;
  status: "matched" | "unmatched" | "empty";
  NoOfMatchedData?: number;
}

export function TransactionTable({
  transaction,
  transactions,
  status,
  NoOfMatchedData,
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

  // Process the transactions to display
  const transactionsToDisplay: FrontendTransaction[] = [];

  if (transaction) {
    // If a single transaction is provided
    transactionsToDisplay.push(transaction);
  } else if (transactions) {
    // If transactions array or single transaction is provided
    if (Array.isArray(transactions)) {
      transactionsToDisplay.push(...transactions);
    } else {
      transactionsToDisplay.push(transactions);
    }
  }

  // Calculate the row height based on number of rows
  const calculateRowHeight = () => {
    // Base height for a single transaction
    const baseHeight = 60;

    // If no transactions or only one, use the base height
    if (transactionsToDisplay.length <= 1) {
      return baseHeight;
    }

    // Otherwise, calculate height based on number of transactions
    return (baseHeight / 2) * transactionsToDisplay.length;
  };

  const rowHeight = calculateRowHeight();

  console.log({ rowHeight, transactionsToDisplay });

  return (
    <div className="rounded-lg border overflow-hidden flex-1">
      <Table>
        <TableHeader className="bg-[#F9FAFB] border-b h-[52px]">
          <TableRow className="!border-b-0">
            <TableHead className="text-left px-6 border-r">Date</TableHead>
            <TableHead className="text-left px-6 border-r">
              Description
            </TableHead>
            <TableHead className="text-left px-6">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {status === "empty" ? (
            <TableRow
              className="hover:bg-white"
              style={{ height: `${rowHeight + 5}px` }}
            >
              <TableCell className="border-r"></TableCell>
              <TableCell className="px-6 border-r"></TableCell>
              <TableCell className="px-6"></TableCell>
            </TableRow>
          ) : transactionsToDisplay.length > 0 ? (
            transactionsToDisplay.length === 1 ? (
              // Single transaction row
              <TableRow
                key={transactionsToDisplay[0].id}
                className={cn(getRowStyles())}
                style={{
                  height: !!NoOfMatchedData
                    ? `${rowHeight * NoOfMatchedData + 5}px`
                    : `${rowHeight}px`,
                }}
              >
                <TableCell className="px-6 border-r whitespace-nowrap text-ellipsis">
                  {transactionsToDisplay[0]?.date}
                </TableCell>
                <TableCell className="px-6 border-r whitespace-nowrap text-ellipsis">
                  {transactionsToDisplay[0]?.description}
                </TableCell>
                <TableCell className="px-6 whitespace-nowrap text-ellipsis">
                  {transactionsToDisplay[0]?.amount}
                </TableCell>
              </TableRow>
            ) : (
              // Multiple transactions
              transactionsToDisplay.map((txn) => (
                <TableRow
                  key={txn.id}
                  className={cn(getRowStyles())}
                  style={{ height: `${rowHeight}px` }}
                >
                  <TableCell className="px-6 border-r whitespace-nowrap text-ellipsis">
                    {txn?.date}
                  </TableCell>
                  <TableCell className="px-6 border-r whitespace-nowrap text-ellipsis">
                    {txn?.description}
                  </TableCell>
                  <TableCell className="px-6 whitespace-nowrap text-ellipsis">
                    {txn?.amount}
                  </TableCell>
                </TableRow>
              ))
            )
          ) : (
            <TableRow
              className={cn(getRowStyles())}
              style={{ height: `${rowHeight}px` }}
            >
              <TableCell colSpan={3} className="px-6 text-center text-gray-500">
                No transaction data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
