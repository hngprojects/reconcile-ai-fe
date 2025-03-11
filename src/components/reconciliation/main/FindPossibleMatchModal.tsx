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
import { Transaction } from "@/src/components/reconciliation/main/reconciliation";
import { Check, Search } from "lucide-react";
import { useState } from "react";
import { StatusBadge } from "./StatusBadge";
import { TransactionTable } from "./TransactionTable";

interface FindPossibleMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  bankTransaction: Transaction | null;
  unmatched_file2: Transaction[];
  onMatch: (bankTrans: Transaction, ledgerTrans: Transaction) => void; // Add this prop
}

export function FindPossibleMatchModal({
  isOpen,
  onClose,
  bankTransaction,
  unmatched_file2,
  onMatch,
}: FindPossibleMatchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState<
    number | null
  >(null);
  const [isMatched, setIsMatched] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  // Filter transactions based on search term
  const filteredTransactions = unmatched_file2.filter((filteredTransaction) => {
    const searchLower = searchTerm.toLowerCase();

    return (
      filteredTransaction.Description.toLowerCase().includes(searchLower) ||
      filteredTransaction.Date.toLowerCase().includes(searchLower) ||
      String(filteredTransaction.Amount).toLowerCase().includes(searchLower)
    );
  });

  const handleCancelMatch = () => {
    if (selectedTransactionIndex !== null && bankTransaction) {
      // mark as unmatched
      setIsMatched(false);
      setSelectedTransaction(null);
      setSelectedTransactionIndex(null);
    }
  };

  const handleMatchClick = () => {
    if (selectedTransactionIndex !== null && bankTransaction) {
      // Mark as matched
      setIsMatched(true);

      const selectedLedgerTransaction =
        filteredTransactions[selectedTransactionIndex];
      setSelectedTransaction(selectedLedgerTransaction);
    }
  };

  const handleFinishClick = () => {
    if (bankTransaction && selectedTransaction) {
      onMatch(bankTransaction, selectedTransaction);
    }

    // Close the modal
    onClose();
    // Reset states
    setIsMatched(false);
    setSelectedTransaction(null);
    setSelectedTransactionIndex(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1320px]">
        <DialogHeader>
          <DialogTitle>Find Possible Match</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-2 mx-4">
          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-4">
            {/* Bank Transaction Details */}
            <TransactionTable
              transaction={bankTransaction}
              status={isMatched ? "matched" : "unmatched"}
            />

            {/* Status */}
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader className="bg-[#F9FAFB] h-[52px] border-b">
                  <TableRow className="!border-b-0">
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    className={cn(
                      isMatched ? "bg-[#F3FEFA]" : "bg-[#FFF4F0]",
                      "hover:bg-[#F3FEFA]"
                    )}
                  >
                    <TableCell className="text-center h-[64px]">
                      <StatusBadge matched={isMatched} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Company Ledger Details */}
            <TransactionTable
              transaction={isMatched ? selectedTransaction : null}
              status={isMatched ? "matched" : "empty"}
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
                  <TableRow className="!border-b-0">
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
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction, index) => (
                      <TableRow
                        key={index}
                        className={`cursor-pointer ${
                          selectedTransactionIndex === index
                            ? "bg-gray-100"
                            : ""
                        }`}
                        onClick={() => {
                          if (index === selectedTransactionIndex) {
                            setSelectedTransactionIndex(null);
                          } else {
                            setSelectedTransactionIndex(index);
                          }
                        }}
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
                        <TableCell className="px-6 border-r h-[64px]">
                          {transaction.Date}
                        </TableCell>
                        <TableCell className="px-6 border-r h-[64px]">
                          {transaction.Description}
                        </TableCell>
                        <TableCell className="px-6 h-[64px]">
                          {transaction.Amount}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No matching results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <DialogFooter className="mx-4">
          {isMatched ? (
            <>
              <Button onClick={handleCancelMatch} size="lg" variant="outline">
                Cancel
              </Button>
              <Button
                onClick={handleFinishClick}
                size="lg"
                className="bg-[#297B65] hover:bg-[#297B65]/90"
              >
                Finish
              </Button>
            </>
          ) : (
            <Button
              onClick={handleMatchClick}
              disabled={selectedTransactionIndex === null}
              size="lg"
              className="bg-[#297B65] hover:bg-[#297B65]/90"
            >
              Match
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
