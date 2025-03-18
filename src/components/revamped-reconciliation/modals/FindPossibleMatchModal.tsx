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
import { SearchIcon } from "../../Icon/Icons";
import { AmountRangeSelector } from "../components/AmountRangeSelector";
import { DatePickerWithRange } from "../components/DateRangePicker";
import { StatusBadge } from "../components/StatusBadge";
import { TransactionTable } from "../components/TransactionTable";
import type {
  ReconciliationItem,
  Transaction,
} from "../types/frontendResponseTypes";
import { DateRange } from "react-day-picker";

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

export function FindPossibleMatchModal({
  isOpen,
  onClose,
  reconciledDataRow,
  potentialMatches,
  onMatch,
}: FindPossibleMatchModalProps) {
  const [selectedRange, setSelectedRange] = useState<{
    min: number;
    max: number | null;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState<
    number | null
  >(null);
  const [isMatched, setIsMatched] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  console.log({ selectedRange });

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setSelectedTransactionIndex(null);
      setIsMatched(false);
      setSelectedTransaction(null);
      setDateRange(undefined);
      setSelectedRange(null);
    }
  }, [isOpen]);

  // Improved search filter function to handle multiple search terms
  const filteredTransactions = potentialMatches?.filter((transaction) => {
    let matchesSearch = true;
    let matchesDateRange = true;
    let matchesAmountRange = true;

    // Search term filter (description)
    if (searchTerm.trim()) {
      const description = transaction.description.toLowerCase();
      const searchTerms = searchTerm
        .toLowerCase()
        .split(/\s+/)
        .filter((term) => term.length > 0);

      matchesSearch = searchTerms.some((term) => description.includes(term));
    }

    // Date range filter
    // filter potential transactions if only from value is selected
    if (dateRange?.from && !dateRange?.to) {
      try {
        const transactionDate = new Date(transaction.date);
        const fromDate = new Date(dateRange.from);

        // Set all dates to midnight for comparison
        transactionDate.setHours(0, 0, 0, 0);
        fromDate.setHours(0, 0, 0, 0);

        matchesDateRange = transactionDate >= fromDate;
      } catch (error) {
        console.error("Error parsing date:", error);
        matchesDateRange = false;
      }
    }
    // filter potential transactions if both from and to values are selected
    if (dateRange?.from && dateRange?.to) {
      try {
        const transactionDate = new Date(transaction.date);
        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);

        // Set all dates to midnight for comparison
        transactionDate.setHours(0, 0, 0, 0);
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(0, 0, 0, 999);

        matchesDateRange =
          transactionDate >= fromDate && transactionDate <= toDate;
      } catch (error) {
        console.error("Error parsing date:", error);
        matchesDateRange = false;
      }
    }

    // Amount range filter
    if (selectedRange) {
      try {
        const amount = parseFloat(
          String(transaction.amount).replace(/[^0-9.-]+/g, ""),
        );
        matchesAmountRange =
          amount >= selectedRange.min &&
          (selectedRange.max === null || amount <= selectedRange.max);
      } catch (error) {
        console.error("Error parsing amount:", error);
        matchesAmountRange = false;
      }
    }

    return matchesSearch && matchesDateRange && matchesAmountRange;
  });

  console.log({ filteredTransactions });

  const handleMatchClick = () => {
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
      if (reconciledDataRow.bank_txn) {
        onMatch(reconciledDataRow.bank_txn, selectedTransaction);
        onClose();
      } else if (reconciledDataRow.ledger_txn) {
        onMatch(selectedTransaction, reconciledDataRow.ledger_txn);
        onClose();
      }
    }
  };

  const handleAmountRangeChange = (range: {
    min: number;
    max: number | null;
  }) => {
    setSelectedRange(range);
    console.log("Selected range:", range);
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

  // const rangeOptions = []

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-7xl max-h-[85vh] overflow-y-auto py-0"
        aria-describedby="find-match-description"
      >
        <div className="sr-only" id="find-match-description">
          Modal for finding and matching possible transactions
        </div>
        <DialogHeader className="mt-3">
          <DialogTitle className="text-left">Find possible match</DialogTitle>
          <DialogDescription className="sr-only" id="unlink-description">
            Match Possible Transactions
          </DialogDescription>
        </DialogHeader>

        {/* Desktop View */}
        <div className="hidden md:block space-y-6 mt-2 lg:mx-4">
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
                        ? "bg-[#F3FEFA] hover:bg-[#F3FEFA]"
                        : "bg-[#FFF4F0] hover:bg-[#FFF4F0]",
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
            <div className="w-full flex items-center justify-end gap-4">
              <div className="relative w-full max-w-[200px]">
                <Input
                  className="pl-9 h-12 text-base placeholder:text-sm rounded-xl placeholder:text-gray-600"
                  placeholder="Search by description"
                  value={searchTerm}
                  onChange={(e) => {
                    setSelectedTransactionIndex(null);
                    setSearchTerm(e.target.value);
                  }}
                />
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-6" />
              </div>

              <DatePickerWithRange
                date={dateRange}
                onDateChange={setDateRange}
              />

              <AmountRangeSelector onRangeChange={handleAmountRangeChange} />
            </div>
          )}

          {/* Potential Matches List */}
          {!isMatched &&
            (searchTerm.trim() !== "" || dateRange?.from || selectedRange) && (
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
                          <TableCell className="border-r w-10">
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

        {/* Mobile View */}
        <div className="block md:hidden space-y-4 py-2">
          {/* Transaction Details */}
          <div
            className={cn(
              "flex flex-col gap-3 p-4 rounded-lg border",
              isDefaultMatch || isMatched ? "bg-[#F3FEFA]" : "bg-[#FFF4F0]",
            )}
          >
            {!isMatched && isDefaultMatch && (
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
                            selectedTransaction?.date}
                        </div>
                        <div className="text-base text-gray-700">
                          {reconciledDataRow.bank_txn?.description ||
                            selectedTransaction?.description}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {reconciledDataRow.bank_txn?.amount ||
                        selectedTransaction?.amount}
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
                            selectedTransaction?.date}
                        </div>
                        <div className="text-base text-gray-700">
                          {reconciledDataRow.ledger_txn?.description ||
                            selectedTransaction?.description}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {reconciledDataRow.ledger_txn?.amount ||
                        selectedTransaction?.amount}
                    </div>
                  </div>
                </div>
              </>
            )}

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
                  <StatusBadge matched={!!selectedTransaction} />
                </div>
              </>
            )}

            {isMatched && (
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
                            selectedTransaction?.date}
                        </div>
                        <div className="text-base text-gray-700">
                          {reconciledDataRow.bank_txn?.description ||
                            selectedTransaction?.description}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {reconciledDataRow.bank_txn?.amount ||
                        selectedTransaction?.amount}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="inline-block border-[0.5px] p-2 rounded-3xl">
                    <StatusBadge matched={!!selectedTransaction} />
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
                            selectedTransaction?.date}
                        </div>
                        <div className="text-base text-gray-700">
                          {reconciledDataRow.ledger_txn?.description ||
                            selectedTransaction?.description}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {reconciledDataRow.ledger_txn?.amount ||
                        selectedTransaction?.amount}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Search Input - Only show if not matched */}
          {!isMatched && (
            <div className="w-full flex flex-col gap-2">
              <DatePickerWithRange
                date={dateRange}
                onDateChange={setDateRange}
              />

              <div className="relative">
                <Input
                  className="pl-9 h-12 text-base placeholder:text-sm rounded-xl placeholder:text-gray-600"
                  placeholder="Search by description"
                  value={searchTerm}
                  onChange={(e) => {
                    setSelectedTransactionIndex(null);
                    setSearchTerm(e.target.value);
                  }}
                />
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-6" />
              </div>

              <AmountRangeSelector onRangeChange={handleAmountRangeChange} />
            </div>
          )}

          {/* Search Results - Only show if not matched */}
          {!isMatched &&
          (searchTerm.trim() !== "" || selectedRange || dateRange?.from) ? (
            filteredTransactions.length > 0 ? (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {filteredTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer",
                      selectedTransactionIndex === index
                        ? "border-[#007A55] bg-primary/5"
                        : "border-gray-200",
                    )}
                    onClick={() =>
                      setSelectedTransactionIndex(
                        index === selectedTransactionIndex ? null : index,
                      )
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
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 space-y-4">
                <hr />
                <p>No matching transactions found.</p>
              </div>
            )
          ) : null}
        </div>

        {/* Footer */}
        <DialogFooter className="sticky bottom-0 left-0 right-0 bg-white py-4">
          {isMatched ? (
            <>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={handleCancelMatch}
              >
                Cancel Match
              </Button>
              <Button onClick={handleFinishClick} className="cursor-pointer">
                Confirm Match
              </Button>
            </>
          ) : (
            <Button
              className="w-full md:w-fit cursor-pointer"
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
