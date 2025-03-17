"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import type {
  ReconciliationItem,
  Transaction,
} from "../types/frontendResponseTypes";
import { StatusBadge } from "./StatusBadge";

interface MobileFindPossibleMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  reconciledDataRow: ReconciliationItem;
  unmatchedTransactions: Transaction[];
  onMatch: (
    bankTransaction: Transaction,
    ledgerTransaction: Transaction
  ) => void;
}

export function MobileFindPossibleMatchModal({
  isOpen,
  onClose,
  reconciledDataRow,
  unmatchedTransactions,
  onMatch,
}: MobileFindPossibleMatchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMatchIndexes, setSelectedMatchIndexes] = useState<number[]>([]);
  const [isMatched, setIsMatched] = useState(false);
  const [matchedTransactions, setMatchedTransactions] =
    useState<Transaction[]>([]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setSelectedMatchIndexes([]);
      setIsMatched(false);
      setMatchedTransactions([]);
    }
  }, [isOpen]);

  // Filter transactions based on search term
  const filteredTransactions = unmatchedTransactions?.filter((t) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      t.description.toLowerCase().includes(searchLower) ||
      t.date.toLowerCase().includes(searchLower) ||
      String(t.amount).includes(searchLower)
    );
  });

  const handleMatchClick = () => {
    if (
      selectedMatchIndexes.length &&
      (!reconciledDataRow.bank_txn || !reconciledDataRow.ledger_txn)
    ) {
      setMatchedTransactions(selectedMatchIndexes.map((_, index) => filteredTransactions[index]));
      setIsMatched(true);
    }
  };

  const handleCancelMatch = () => {
    setIsMatched(false);
    setMatchedTransactions([]);
    setSelectedMatchIndexes([]);
  };

  const handleFinishClick = () => {
    if (matchedTransactions.length) {
      // If there is a bank transaction, the selected transaction goes to the ledger side
      if (reconciledDataRow.bank_txn) {
        // onMatch(reconciledDataRow.bank_txn, matchedTransaction);
        onClose();
      }
      // If there is a ledger transaction, the selected transaction goes to the bank side
      else if (reconciledDataRow.ledger_txn) {
        // onMatch(matchedTransaction, reconciledDataRow.ledger_txn);
        onClose();
      }
    }
  };

  const isDefaultMatch = reconciledDataRow.matched;
  const title =
    reconciledDataRow.bank_txn === null
      ? "Company Ledger"
      : reconciledDataRow.ledger_txn === null
        ? "Bank Statement"
        : "";

  const possibleMatchTitle =
    reconciledDataRow.bank_txn === null ? "Bank Statement" : "Company Ledger";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="px-5 py-2 max-w-[500px] rounded-xl max-h-[85vh] overflow-y-auto">
        <h2 className="text-lg font-semibold">Find possible match</h2>

        <div className="space-y-4">
          {/* Transaction Details */}
          <div
            className={cn(
              "flex flex-col gap-3 p-4 rounded-lg border",
              isDefaultMatch || isMatched ? "bg-[#F3FEFA]" : "bg-[#FFF4F0]"
            )}
          >
            {/* {!isMatched && isDefaultMatch && (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-900">
                        Bank Statement
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-700">
                          {reconciledDataRow.bank_txn?.date ||
                            matchedTransaction?.date}
                        </div>
                        <div className="text-base text-gray-700">
                          {reconciledDataRow.bank_txn?.description ||
                            matchedTransaction?.description}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {reconciledDataRow.bank_txn?.amount ||
                        matchedTransaction?.amount}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="inline-block border-[0.5px] p-2 rounded-3xl">
                    <StatusBadge matched={isDefaultMatch} />
                  </div>

                  <hr className="border border-gray-200/70 flex-1" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-900">
                        Company Ledger
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-700">
                          {reconciledDataRow.ledger_txn?.date ||
                            matchedTransaction?.date}
                        </div>
                        <div className="text-base text-gray-700">
                          {reconciledDataRow.ledger_txn?.description ||
                            matchedTransaction?.description}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {reconciledDataRow.ledger_txn?.amount ||
                        matchedTransaction?.amount}
                    </div>
                  </div>
                </div>
              </>
            )} */}

            {!isMatched && !isDefaultMatch && (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-900">
                        {title}
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-700">
                          {reconciledDataRow.bank_txn?.date ||
                            reconciledDataRow.ledger_txn?.date}
                        </div>
                        <div className="text-base text-gray-700">
                          {reconciledDataRow.bank_txn?.description ||
                            reconciledDataRow.ledger_txn?.description}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {reconciledDataRow.bank_txn?.amount ||
                        reconciledDataRow.ledger_txn?.amount}
                    </div>
                  </div>
                </div>

                <div className="self-start inline-block border-[0.5px] p-2 rounded-3xl">
                  <StatusBadge matched={!!matchedTransactions.length} />
                </div>
              </>
            )}

            {isMatched && (
              <>
              {
                !reconciledDataRow.bank_txn ? (
                  matchedTransactions.map((transaction) => (
                    <div key={transaction.id} className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex flex-col">
                          <div className="text-sm font-semibold text-gray-900">
                            Bank Statement
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-gray-700">
                              {transaction.date}
                            </div>
                            <div className="text-base text-gray-700">
                              {transaction.description}
                            </div>
                          </div>
                        </div>
                        <div className="font-medium text-gray-600">
                          {transaction.amount}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-900">
                        Bank Statement
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-700">
                          {reconciledDataRow.bank_txn.date}
                        </div>
                        <div className="text-base text-gray-700">
                          {reconciledDataRow.bank_txn?.description}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {reconciledDataRow.bank_txn?.amount}
                    </div>
                  </div>
                </div>
                )
              }


                <div className="flex items-center gap-3">
                  <div className="inline-block border-[0.5px] p-2 rounded-3xl">
                    <StatusBadge matched={!!matchedTransactions.length} />
                  </div>

                  <hr className="border border-gray-200/70 flex-1" />
                </div>

              {
                !reconciledDataRow.ledger_txn ? (
                  matchedTransactions.map((transaction) => (
                    <div key={transaction.id} className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex flex-col">
                          <div className="text-sm font-semibold text-gray-900">
                            Company Ledger
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-gray-700">
                              {transaction.date}
                            </div>
                            <div className="text-base text-gray-700">
                              {transaction.description}
                            </div>
                          </div>
                        </div>
                        <div className="font-medium text-gray-600">
                          {transaction.amount}
                        </div>
                      </div>
                    </div>
                    ))
                ) : (
                  <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-900">
                        Company Ledger
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-700">
                          {reconciledDataRow.ledger_txn.date}
                        </div>
                        <div className="text-base text-gray-700">
                          {reconciledDataRow.ledger_txn.description}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {reconciledDataRow.ledger_txn.amount}
                    </div>
                  </div>
                </div>
                )
              }

              </>
            )}
          </div>

          {/* Search Input - Only show if not matched */}
          {!isMatched && (
            <div className="relative">
              <Input
                className="pl-4 pr-10 py-2 h-10 text-base placeholder:text-sm rounded-lg"
                placeholder="Search by keyword"
                value={searchTerm}
                onChange={(e) => {
                  setSelectedMatchIndexes([]);
                  setSearchTerm(e.target.value);
                }}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          )}

          {/* Search Results - Only show if not matched */}
          {!isMatched &&
            filteredTransactions &&
            filteredTransactions.length > 0 && (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {filteredTransactions.map((transaction, index) => {
                  const isSelectedIndex = selectedMatchIndexes.some((transactionIndex) => transactionIndex === index)
                  return (
                    <div
                      key={transaction.id}
                      className={cn(
                        "p-3 border rounded-lg cursor-pointer",
                        isSelectedIndex
                          ? "border-[#007A55] bg-primary/5"
                          : "border-gray-200"
                      )}
                      onClick={() =>
                        setSelectedMatchIndexes((prev) => isSelectedIndex ? prev?.filter((i) => i !== index) : [...prev, index])
                      }
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 text-gray-600">
                          <div className="text-sm font-medium">
                            {possibleMatchTitle}
                          </div>
                          <div className="text-xs text-gray-500">
                            {transaction.date}
                          </div>
                          <div className="text-sm mt-1">
                            {transaction.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {transaction.amount}
                          </div>
                        </div>
                      </div>
                    </div>
                  )})}
              </div>
            )}
        </div>

        {/* Footer */}
        <DialogFooter className="py-4 border-t flex gap-3 w-full sticky bottom-0 left-0 right-0 bg-white">
          {isMatched ? (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCancelMatch}
              >
                Cancel Match
              </Button>
              <Button className="flex-1" onClick={handleFinishClick}>
                Confirm Match
              </Button>
            </>
          ) : (
            <Button
              className="w-full bg-[#297B65] hover:bg-[#1e5a4a]"
              disabled={
                !selectedMatchIndexes.length ||
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
