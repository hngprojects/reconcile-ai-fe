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
  FrontendTransaction,
} from "../types/frontendResponseTypes";
import { DateRange } from "react-day-picker";
import { useReconciliation } from "../context/ReconciliationProvider";

interface FindPossibleMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  reconciledDataRow: ReconciliationItem;
  potentialMatches: FrontendTransaction[];
  onMatch: (
    bankTransactions: FrontendTransaction[],
    ledgerTransactions: FrontendTransaction[]
  ) => void;
}

export function FindPossibleMatchModal({
  isOpen,
  onClose,
  reconciledDataRow,
  potentialMatches,
  onMatch,
}: FindPossibleMatchModalProps) {
  const { userPlan } = useReconciliation();
  const [selectedRange, setSelectedRange] = useState<{
    min: number;
    max: number | null;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransactionIndices, setSelectedTransactionIndices] = useState<
    number[]
  >([]);
  const [isMatched, setIsMatched] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<
    FrontendTransaction[]
  >([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Get bank and ledger transactions from the new structure
  const bankTransaction =
    reconciledDataRow.statements && reconciledDataRow.statements.length > 0
      ? reconciledDataRow.statements[0].bank_txn
      : null;

  const ledgerTransaction =
    reconciledDataRow.ledgers && reconciledDataRow.ledgers.length > 0
      ? reconciledDataRow.ledgers[0].ledger_txn
      : null;

  const hasPlanAccess = (featureType: "export" | "unlink" | "match") => {
    if (!featureType) return false;

    switch (userPlan) {
      case "starter":
        return true;
      case "basic":
        return false;
      default:
        return true; // business plan has all features
    }
  };

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setSelectedTransactionIndices([]);
      setIsMatched(false);
      setSelectedTransactions([]);
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
          String(transaction.amount).replace(/[^0-9.-]+/g, "")
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

  const handleMatchClick = () => {
    if (
      selectedTransactionIndices.length > 0 &&
      (!bankTransaction || !ledgerTransaction)
    ) {
      const selectedTransactionsArray = selectedTransactionIndices.map(
        (index) => filteredTransactions[index]
      );
      setSelectedTransactions(selectedTransactionsArray);
      setIsMatched(true);
    }
  };

  const handleCancelMatch = () => {
    setIsMatched(false);
    setSelectedTransactions([]);
    setSelectedTransactionIndices([]);
  };

  const handleFinishClick = () => {
    if (selectedTransactions.length > 0) {
      // Create arrays for onMatch based on which side needs matching
      if (bankTransaction) {
        // If we have a bank transaction, the selected transactions are ledger transactions
        // Convert to LedgerWithScore array
        const ledgerTransactions = selectedTransactions;

        // Use existing StatementWithScore from reconciledDataRow
        onMatch(reconciledDataRow.statements?.map(stat => stat.bank_txn) || [], ledgerTransactions);
        onClose();
      } else if (ledgerTransaction) {
        // If we have a ledger transaction, the selected transactions are bank transactions
        // Convert to StatementWithScore array
        const bankTransactions = selectedTransactions;

        // Use existing LedgerWithScore from reconciledDataRow
        onMatch(bankTransactions, reconciledDataRow.ledgers?.map(ledg => ledg.ledger_txn) || []);
        onClose();
      }
    }
  };

  const toggleTransactionSelection = (index: number) => {
    setSelectedTransactionIndices((prev) => {
      const isSelected = prev.includes(index);
      if (isSelected) {
        return prev.filter((idx) => idx !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleAmountRangeChange = (range: {
    min: number;
    max: number | null;
  }) => {
    setSelectedRange(range);
    console.log("Selected range:", range);
  };

  const isDefaultMatch = reconciledDataRow.matched;

  const title = !bankTransaction
    ? "Company Ledger"
    : !ledgerTransaction
      ? "Bank Statement"
      : "";

  const possibleMatchTitle = !bankTransaction
    ? "Bank Statement"
    : "Company Ledger";

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
              transaction={bankTransaction}
              transactions={
                !bankTransaction && selectedTransactions.length > 0 && isMatched
                  ? selectedTransactions
                  : null
              }
              status={
                !isMatched &&
                !isDefaultMatch &&
                selectedTransactions.length === 0 &&
                !bankTransaction
                  ? "empty"
                  : isMatched || isDefaultMatch
                    ? "matched"
                    : "unmatched"
              }
              NoOfMatchedData={selectedTransactionIndices.length}
            />
            {/* <TransactionTable
              transaction={
                bankTransaction ||
                (selectedTransactions.length > 0 && !ledgerTransaction
                  ? selectedTransactions[0]
                  : null)
              }
              status={
                !isMatched &&
                !isDefaultMatch &&
                selectedTransactions.length === 0 &&
                !bankTransaction
                  ? "empty"
                  : isMatched || isDefaultMatch
                    ? "matched"
                    : "unmatched"
              }
              NoOfMatchedData={selectedTransactionIndices.length}
            /> */}

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
                        : "bg-[#FFF4F0] hover:bg-[#FFF4F0]"
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
            {/* <TransactionTable
              transaction={
                ledgerTransaction ||
                (selectedTransactions.length > 0 && !bankTransaction
                  ? selectedTransactions[0]
                  : null)
              }
              status={
                !isMatched &&
                !isDefaultMatch &&
                selectedTransactions.length === 0 &&
                !ledgerTransaction
                  ? "empty"
                  : isMatched || isDefaultMatch
                    ? "matched"
                    : "unmatched"
              }
              NoOfMatchedData={selectedTransactionIndices.length}
            /> */}
            <TransactionTable
              transaction={ledgerTransaction}
              transactions={
                !ledgerTransaction &&
                selectedTransactions.length > 0 &&
                isMatched
                  ? selectedTransactions
                  : null
              }
              status={
                !isMatched &&
                !isDefaultMatch &&
                selectedTransactions.length === 0 &&
                !ledgerTransaction
                  ? "empty"
                  : isMatched || isDefaultMatch
                    ? "matched"
                    : "unmatched"
              }
              NoOfMatchedData={selectedTransactionIndices.length}
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
                    setSelectedTransactionIndices([]);
                    setSearchTerm(e.target.value);
                  }}
                />
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-6" />
              </div>

              {hasPlanAccess("match") && (
                <DatePickerWithRange
                  date={dateRange}
                  onDateChange={setDateRange}
                />
              )}

              {hasPlanAccess("match") && (
                <AmountRangeSelector onRangeChange={handleAmountRangeChange} />
              )}
            </div>
          )}

          {/* Selected Transactions Count */}
          {!isMatched && selectedTransactionIndices.length > 0 && (
            <div className="text-sm text-gray-700">
              Selected transactions: {selectedTransactionIndices.length}
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
                            selectedTransactionIndices.includes(index)
                              ? "bg-gray-100"
                              : ""
                          }`}
                          onClick={() => toggleTransactionSelection(index)}
                        >
                          <TableCell className="border-r w-10">
                            <div className="flex justify-center">
                              <div
                                className={`w-5 h-5 rounded-sm flex items-center justify-center border-2 ${
                                  selectedTransactionIndices.includes(index)
                                    ? "border-[#297B65]"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedTransactionIndices.includes(index) && (
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
              isDefaultMatch || isMatched ? "bg-[#F3FEFA]" : "bg-[#FFF4F0]"
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
                          {bankTransaction?.date ||
                            (selectedTransactions.length > 0
                              ? selectedTransactions[0]?.date
                              : "")}
                        </div>
                        <div className="text-base text-gray-700">
                          {bankTransaction?.description ||
                            (selectedTransactions.length > 0
                              ? selectedTransactions[0]?.description
                              : "")}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {bankTransaction?.amount ||
                        (selectedTransactions.length > 0
                          ? selectedTransactions[0]?.amount
                          : "")}
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
                          {ledgerTransaction?.date ||
                            (selectedTransactions.length > 0
                              ? selectedTransactions[0]?.date
                              : "")}
                        </div>
                        <div className="text-base text-gray-700">
                          {ledgerTransaction?.description ||
                            (selectedTransactions.length > 0
                              ? selectedTransactions[0]?.description
                              : "")}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {ledgerTransaction?.amount ||
                        (selectedTransactions.length > 0
                          ? selectedTransactions[0]?.amount
                          : "")}
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
                          {bankTransaction?.date || ledgerTransaction?.date}
                        </div>
                        <div className="text-base text-gray-700">
                          {bankTransaction?.description ||
                            ledgerTransaction?.description}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {bankTransaction?.amount || ledgerTransaction?.amount}
                    </div>
                  </div>
                </div>

                <div className="self-start inline-block border-[0.5px] p-2 rounded-3xl">
                  <StatusBadge matched={selectedTransactions.length > 0} />
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
                          {bankTransaction?.date ||
                            (selectedTransactions.length > 0
                              ? selectedTransactions[0]?.date
                              : "")}
                        </div>
                        <div className="text-base text-gray-700">
                          {bankTransaction?.description ||
                            (selectedTransactions.length > 0
                              ? selectedTransactions[0]?.description
                              : "")}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {bankTransaction?.amount ||
                        (selectedTransactions.length > 0
                          ? selectedTransactions[0]?.amount
                          : "")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="inline-block border-[0.5px] p-2 rounded-3xl">
                    <StatusBadge matched={selectedTransactions.length > 0} />
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
                          {ledgerTransaction?.date ||
                            (selectedTransactions.length > 0
                              ? selectedTransactions[0]?.date
                              : "")}
                        </div>
                        <div className="text-base text-gray-700">
                          {ledgerTransaction?.description ||
                            (selectedTransactions.length > 0
                              ? selectedTransactions[0]?.description
                              : "")}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {ledgerTransaction?.amount ||
                        (selectedTransactions.length > 0
                          ? selectedTransactions[0]?.amount
                          : "")}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Selected Transactions Count */}
          {!isMatched && selectedTransactionIndices.length > 0 && (
            <div className="text-sm text-gray-700">
              Selected transactions: {selectedTransactionIndices.length}
            </div>
          )}

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
                    setSelectedTransactionIndices([]);
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
                      selectedTransactionIndices.includes(index)
                        ? "border-[#007A55] bg-primary/5"
                        : "border-gray-200"
                    )}
                    onClick={() => toggleTransactionSelection(index)}
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
                selectedTransactionIndices.length === 0 ||
                (!!bankTransaction && !!ledgerTransaction)
              }
              onClick={handleMatchClick}
            >
              Match{" "}
              {selectedTransactionIndices.length > 0
                ? `(${selectedTransactionIndices.length})`
                : ""}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
