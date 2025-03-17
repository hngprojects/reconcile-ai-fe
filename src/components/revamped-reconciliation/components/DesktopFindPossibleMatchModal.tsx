"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { cn } from "@/src/lib/utils";
import { Check, Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  ReconciliationItem,
  Transaction,
} from "../types/frontendResponseTypes";
import { StatusBadge } from "./StatusBadge";
import { TransactionTable } from "./TransactionTable";

interface FindPossibleMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  reconciledDataRow: ReconciliationItem;
  potentialMatches: Transaction[];
  onMatch: (
    bankTransaction: Transaction,
    ledgerTransaction: Transaction,
  ) => void;
}

export function DesktopFindPossibleMatchModal({
  isOpen,
  onClose,
  reconciledDataRow,
  potentialMatches,
  onMatch,
}: FindPossibleMatchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState<
    number | null
  >(null);
  const [isMatched, setIsMatched] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  // console.log({ reconciledDataRow });

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setSelectedTransactionIndex(null);
      setIsMatched(false);
      setSelectedTransaction(null);
    }
  }, [isOpen]);

  // Filter transactions based on search term
  const filteredTransactions = potentialMatches?.filter((t) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      t.description.toLowerCase().includes(searchLower) ||
      t.date.toLowerCase().includes(searchLower) ||
      String(t.amount).includes(searchLower)
    );
  });

  const handleMatchClick = () => {
    // This condition only matches if one transaction is missing (null)
    if (
      selectedTransactionIndex !== null &&
      (!reconciledDataRow.bank_txn || !reconciledDataRow.ledger_txn)
    ) {
      setSelectedTransaction(filteredTransactions[selectedTransactionIndex]);
      setIsMatched(true);
    }
  };

  const handleCancelMatch = () => {
    setIsMatched(false);
    setSelectedTransaction(null);
    setSelectedTransactionIndex(null);
  };

  const handleFinishClick = () => {
    if (selectedTransaction) {
      // if there is a bank transaction the selected transaction goes to the right side
      if (reconciledDataRow.bank_txn) {
        onMatch(reconciledDataRow.bank_txn, selectedTransaction);
        onClose();
      }

      // if there is a ledger transaction the selected transaction goes to the left side
      if (reconciledDataRow.ledger_txn) {
        onMatch(selectedTransaction, reconciledDataRow.ledger_txn);
        onClose();
      }
    }
  };

  const isDefaultMatch = reconciledDataRow.matched;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1320px] max-h-[85vh] overflow-y-auto py-0">
        <DialogHeader>
          <DialogTitle>Find possible match</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-2 mx-4">
          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4">
            {/* Bank Transaction Details */}
            <TransactionTable
              transaction={reconciledDataRow.bank_txn || selectedTransaction}
              status={
                !isMatched &&
                !isDefaultMatch &&
                !selectedTransaction &&
                !reconciledDataRow.bank_txn
                  ? "empty"
                  : isMatched || isDefaultMatch
                    ? "matched"
                    : "unmatched"
              }
            />

            {/* Status */}
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader className="bg-[#F9FAFB] h-[52px] border-b">
                  <TableRow>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    className={cn(
                      isDefaultMatch || isMatched
                        ? "bg-[#F3FEFA]"
                        : "bg-[#FFF4F0]",
                      "hover:bg-[#F3FEFA]",
                    )}
                  >
                    <TableCell className="text-center h-[64px]">
                      <StatusBadge matched={isDefaultMatch || isMatched} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Company Ledger Details */}
            <TransactionTable
              transaction={reconciledDataRow.ledger_txn || selectedTransaction}
              status={
                !isMatched &&
                !isDefaultMatch &&
                !selectedTransaction &&
                !reconciledDataRow.ledger_txn
                  ? "empty"
                  : isMatched || isDefaultMatch
                    ? "matched"
                    : "unmatched"
              }
            />
          </div>

          {/* Search Input */}
          {!isMatched && (
            <div className="relative max-w-md">
              <Search className="absolute right-3 top-[14px] size-5 text-gray-400" />
              <Input
                className="pr-10 h-12 text-base placeholder:text-base rounded-xl placeholder:text-gray-400"
                placeholder="Search by description, date, or amount"
                value={searchTerm}
                onChange={(e) => {
                  setSelectedTransactionIndex(null);
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
          )}

          {/* Potential Matches List */}
          {!isMatched && (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-[#F9FAFB] h-[52px] border-b">
                  <TableRow>
                    <TableHead className="text-left px-6 border-r w-10"></TableHead>
                    <TableHead className="text-left px-6 border-r">
                      Date
                    </TableHead>
                    <TableHead className="text-left px-6 border-r">
                      Description
                    </TableHead>
                    <TableHead className="text-left px-6">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="max-h-[35vh] h-full">
                  {filteredTransactions?.length > 0 ? (
                    filteredTransactions?.map((transaction, index) => (
                      <TableRow
                        key={transaction.id}
                        className={`cursor-pointer h-[52px] ${
                          selectedTransactionIndex === index
                            ? "bg-gray-100"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedTransactionIndex((prev) =>
                            prev === index ? null : index,
                          )
                        }
                      >
                        <TableCell className="px-6 border-r w-10">
                          <div className="flex justify-center">
                            <div
                              className={`w-5 h-5 rounded-sm flex items-center justify-center border-2 ${
                                selectedTransactionIndex === index
                                  ? "border-[#297B65]"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedTransactionIndex === index && (
                                <Check
                                  strokeWidth={3}
                                  className="h-4 w-4 text-[#297B65]"
                                />
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 border-r">
                          {transaction.date}
                        </TableCell>
                        <TableCell className="px-6 border-r">
                          {transaction.description}
                        </TableCell>
                        <TableCell className="px-6">
                          {transaction.amount}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        No transactions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <DialogFooter className="sticky bottom-0 left-0 right-0 bg-white py-4 border-t">
          {isMatched ? (
            <>
              <Button variant="outline" onClick={handleCancelMatch}>
                Cancel Match
              </Button>
              <Button onClick={handleFinishClick}>Confirm Match</Button>
            </>
          ) : (
            <Button
              disabled={
                selectedTransactionIndex === null ||
                (!!reconciledDataRow.bank_txn && !!reconciledDataRow.ledger_txn)
              }
              onClick={handleMatchClick}
            >
              Match
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
