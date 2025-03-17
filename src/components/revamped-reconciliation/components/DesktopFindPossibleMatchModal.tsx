"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import {
  ReconciliationItem,
  Transaction,
} from "../types/frontendResponseTypes";
import { StatusBadge } from "./StatusBadge";
import { TransactionTable } from "./TransactionTable";
import { SearchIcon } from "../../Icon/Icons";

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
  const [selectedTransactionIndexes, setSelectedTransactionIndexes] = useState<
    number[]
  >([]);
  const [isMatched, setIsMatched] = useState(false);
  const [selectedTransactions, setSelectedTransactions] =
    useState<Transaction[]>([]);
  console.log({ reconciledDataRow });
  // console.log({ reconciledDataRow });

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setSelectedTransactionIndexes([]);
      setIsMatched(false);
      setSelectedTransactions([]);
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
      selectedTransactionIndexes.length &&
      (!reconciledDataRow.bank_txn || !reconciledDataRow.ledger_txn)
    ) {
      setSelectedTransactions(selectedTransactionIndexes.map((_, index) => filteredTransactions[index]))
      // setSelectedTransactions(filteredTransactions[selectedTransactionIndex]);
      setIsMatched(true);
    }
  };

  const handleCancelMatch = () => {
    setIsMatched(false);
    setSelectedTransactions([]);
    setSelectedTransactionIndexes([]);
  };

  const handleFinishClick = () => {
    if (selectedTransactions.length) {
      // if there is a bank transaction the selected transaction goes to the right side
      if (reconciledDataRow.bank_txn) {
        // onMatch(reconciledDataRow.bank_txn, selectedTransactions);
        onClose();
      }

      // if there is a ledger transaction the selected transaction goes to the left side
      if (reconciledDataRow.ledger_txn) {
        // onMatch(selectedTransaction, reconciledDataRow.ledger_txn);
        onClose();
      }
    }
  };

  const isDefaultMatch = reconciledDataRow.matched;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[85vh] overflow-y-auto py-0">
        <DialogHeader>
          <DialogTitle>Find possible match</DialogTitle>
          <DialogDescription className="sr-only" id="unlink-description">
            Match Possible Transactions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-2 mx-4">
          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4">
            {/* Bank Transaction Details */}
            {
              reconciledDataRow.bank_txn ? (
                <TransactionTable
                  transactions={[reconciledDataRow.bank_txn]}
                  status={
                    !isMatched &&
                    !isDefaultMatch &&
                    !selectedTransactions.length &&
                    !reconciledDataRow.bank_txn
                      ? "empty"
                      : isMatched || isDefaultMatch
                        ? "matched"
                        : "unmatched"
                  }
                  NoOfMatchedData={selectedTransactions.length}
                />
              ) : (
                <TransactionTable
                  transactions={selectedTransactions}
                  status={
                    !isMatched &&
                    !isDefaultMatch &&
                    !selectedTransactions.length &&
                    !reconciledDataRow.bank_txn
                      ? "empty"
                      : isMatched || isDefaultMatch
                        ? "matched"
                        : "unmatched"
                  }
                />
              )
            }


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
                    <TableCell style={{
                      height: `${selectedTransactions.length ? selectedTransactions.length*64 : 64}px`
                    }} className="text-center">
                      <StatusBadge matched={isDefaultMatch || isMatched} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Company Ledger Details */}
              {
                reconciledDataRow.ledger_txn ?(
                  <TransactionTable
                    transactions={[reconciledDataRow.ledger_txn]}
                    status={
                      !isMatched &&
                      !isDefaultMatch &&
                      !selectedTransactions.length &&
                      !reconciledDataRow.ledger_txn
                        ? "empty"
                        : isMatched || isDefaultMatch
                          ? "matched"
                          : "unmatched"
                    }
                    NoOfMatchedData={selectedTransactions.length}
                  />
                ) :(
                  <TransactionTable
                  transactions={selectedTransactions}
                  status={
                    !isMatched &&
                    !isDefaultMatch &&
                    !selectedTransactions.length &&
                    !reconciledDataRow.ledger_txn
                      ? "empty"
                      : isMatched || isDefaultMatch
                        ? "matched"
                        : "unmatched"
                  }
                />
                )
              }
          </div>

          {/* Search Input */}
          {!isMatched && (
            <div className="w-full flex justify-end">
              <div className="relative w-full max-w-[460px] mt-3">
                <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-8" />
                <Input
                  className="pr-10 h-12 text-base placeholder:text-base rounded-xl placeholder:text-[#333]"
                  placeholder="Search by description, date, or amount"
                  value={searchTerm}
                  onChange={(e) => {
                    setSelectedTransactionIndexes([]);
                    setSearchTerm(e.target.value);
                  }}
                />
              </div>
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
                    filteredTransactions?.map((transaction, index) => {
                      const isSelectedIndex = selectedTransactionIndexes?.some((transactionIndex) => transactionIndex === index)
                      return (
                      <TableRow
                        key={transaction.id}
                        className={`cursor-pointer h-[52px] ${
                          isSelectedIndex
                            ? "bg-gray-100"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedTransactionIndexes((prev) =>
                            isSelectedIndex ? prev?.filter((i) => i !== index) : [...prev, index]
                          )
                        }
                      >
                        <TableCell className="px-6 border-r w-10">
                          <div className="flex justify-center">
                            <div
                              className={`w-5 h-5 rounded-sm flex items-center justify-center border-2 ${
                                isSelectedIndex
                                  ? "border-[#297B65]"
                                  : "border-gray-300"
                              }`}
                            >
                              {isSelectedIndex && (
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
                    )})
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

        <DialogFooter className="sticky bottom-0 left-0 right-0 bg-white py-4">
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
                !selectedTransactionIndexes.length ||
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
