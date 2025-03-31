'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SearchIcon } from '../../Icon/Icons'
import { AmountRangeSelector } from '../AmountRangeSelector'
import { DatePickerWithRange } from '../DateRangePicker'
import { StatusBadge } from '../StatusBadge'
import { TransactionTable } from '../TransactionTable'
import type {
  ReconciliationItem,
  FrontendTransaction,
} from '../../../types/frontendResponseTypes'
import { DateRange } from 'react-day-picker'
import { useReconciliation } from '@/context/ReconciliationProvider'

interface FindPossibleMatchModalProps {
  isOpen: boolean
  onClose: () => void
  reconciledDataRow: ReconciliationItem | null
  potentialMatches: FrontendTransaction[]
  onMatch: (
    bankTransactions: FrontendTransaction[],
    ledgerTransactions: FrontendTransaction[]
  ) => void
}

export function FindPossibleMatchModal({
  isOpen,
  onClose,
  reconciledDataRow,
  potentialMatches,
  onMatch,
}: FindPossibleMatchModalProps) {
  const { userPlan } = useReconciliation()
  const [selectedRange, setSelectedRange] = useState<{
    min: number
    max: number | null
  } | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTransactionIndices, setSelectedTransactionIndices] = useState<
    number[]
  >([])
  const [isMatched, setIsMatched] = useState(false)
  const [selectedTransactions, setSelectedTransactions] = useState<
    FrontendTransaction[]
  >([])
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  // Get bank and ledger transactions from the new structure
  const bankTransaction =
    reconciledDataRow?.statements && reconciledDataRow?.statements.length > 0
      ? reconciledDataRow?.statements[0].bank_txn
      : null

  const ledgerTransaction =
    reconciledDataRow?.ledgers && reconciledDataRow?.ledgers.length > 0
      ? reconciledDataRow?.ledgers[0].ledger_txn
      : null

  // Calculate the number of rows to display for consistent table heights
  const transactionCount = Math.max(
    selectedTransactions.length || 1,
    bankTransaction ? 1 : 0,
    ledgerTransaction ? 1 : 0
  )

  const hasPlanAccess = (featureType: 'export' | 'unlink' | 'match') => {
    if (!featureType) return false

    switch (userPlan) {
      case 'starter':
        return true
      case 'basic':
        return false
      default:
        return true // business plan has all features
    }
  }

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('')
      setSelectedTransactionIndices([])
      setIsMatched(false)
      setSelectedTransactions([])
      setDateRange(undefined)
      setSelectedRange(null)
    }
  }, [isOpen])

  // Improved search filter function to handle multiple search terms
  const filteredTransactions = potentialMatches?.filter((transaction) => {
    let matchesSearch = true
    let matchesDateRange = true
    let matchesAmountRange = true

    // Search term filter (description)
    if (searchTerm.trim()) {
      const description = transaction.description.toLowerCase()
      const searchTerms = searchTerm
        .toLowerCase()
        .split(/\s+/)
        .filter((term) => term.length > 0)

      matchesSearch = searchTerms.some((term) => description.includes(term))
    }

    // Date range filter
    // filter potential transactions if only from value is selected
    if (dateRange?.from && !dateRange?.to) {
      try {
        const transactionDate = new Date(transaction.date)
        const fromDate = new Date(dateRange.from)

        // Set all dates to midnight for comparison
        transactionDate.setHours(0, 0, 0, 0)
        fromDate.setHours(0, 0, 0, 0)

        matchesDateRange = transactionDate >= fromDate
      } catch (error) {
        console.error('Error parsing date:', error)
        matchesDateRange = false
      }
    }
    // filter potential transactions if both from and to values are selected
    if (dateRange?.from && dateRange?.to) {
      try {
        const transactionDate = new Date(transaction.date)
        const fromDate = new Date(dateRange.from)
        const toDate = new Date(dateRange.to)

        // Set all dates to midnight for comparison
        transactionDate.setHours(0, 0, 0, 0)
        fromDate.setHours(0, 0, 0, 0)
        toDate.setHours(0, 0, 0, 999)

        matchesDateRange =
          transactionDate >= fromDate && transactionDate <= toDate
      } catch (error) {
        console.error('Error parsing date:', error)
        matchesDateRange = false
      }
    }

    // Amount range filter
    if (selectedRange) {
      try {
        const amount = parseFloat(
          String(transaction.amount).replace(/[^0-9.-]+/g, '')
        )
        matchesAmountRange =
          amount >= selectedRange.min &&
          (selectedRange.max === null || amount <= selectedRange.max)
      } catch (error) {
        console.error('Error parsing amount:', error)
        matchesAmountRange = false
      }
    }

    return matchesSearch && matchesDateRange && matchesAmountRange
  })

  const handleMatchClick = () => {
    if (
      selectedTransactionIndices.length > 0 &&
      (!bankTransaction || !ledgerTransaction)
    ) {
      const selectedTransactionsArray = selectedTransactionIndices.map(
        (index) => filteredTransactions[index]
      )
      setSelectedTransactions(selectedTransactionsArray)
      setIsMatched(true)
    }
  }

  const handleCancelMatch = () => {
    setIsMatched(false)
    setSelectedTransactions([])
    setSelectedTransactionIndices([])
  }

  const handleFinishClick = () => {
    if (selectedTransactions.length > 0) {
      // Create arrays for onMatch based on which side needs matching
      if (bankTransaction) {
        // If we have a bank transaction, the selected transactions are ledger transactions
        // Convert to LedgerWithScore array
        const ledgerTransactions = selectedTransactions

        // Use existing StatementWithScore from reconciledDataRow
        onMatch(
          reconciledDataRow?.statements?.map((stat) => stat.bank_txn) || [],
          ledgerTransactions
        )
        onClose()
      } else if (ledgerTransaction) {
        // If we have a ledger transaction, the selected transactions are bank transactions
        // Convert to StatementWithScore array
        const bankTransactions = selectedTransactions

        // Use existing LedgerWithScore from reconciledDataRow
        onMatch(
          bankTransactions,
          reconciledDataRow?.ledgers?.map((ledg) => ledg.ledger_txn) || []
        )
        onClose()
      }
    }
  }

  const toggleTransactionSelection = (index: number) => {
    setSelectedTransactionIndices((prev) => {
      const isSelected = prev.includes(index)
      if (isSelected) {
        return prev.filter((idx) => idx !== index)
      } else {
        return [...prev, index]
      }
    })
  }

  const handleAmountRangeChange = (range: {
    min: number
    max: number | null
  }) => {
    setSelectedRange(range)
    console.log('Selected range:', range)
  }

  const isDefaultMatch = reconciledDataRow?.matched

  const title = !bankTransaction
    ? 'Company Ledger'
    : !ledgerTransaction
      ? 'Bank Statement'
      : ''

  const possibleMatchTitle = !bankTransaction
    ? 'Bank Statement'
    : 'Company Ledger'

  // Calculate row height for status column in order to align with other tables' height
  const statusRowHeight = transactionCount * 61.4

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-h-[85vh] overflow-y-auto py-0 sm:max-w-7xl"
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
        <div className="mt-2 hidden space-y-6 md:block lg:mx-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
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
                  ? 'empty'
                  : isMatched || isDefaultMatch
                    ? 'matched'
                    : 'unmatched'
              }
              NoOfMatchedData={transactionCount}
            />

            {/* Status */}
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader className="h-[52px] border-b bg-[#F9FAFB]">
                  <TableRow>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    style={{ height: `${statusRowHeight}px` }}
                    className={cn(
                      isDefaultMatch || isMatched
                        ? 'bg-[#F3FEFA] hover:bg-[#F3FEFA]'
                        : 'bg-[#FFF4F0] hover:bg-[#FFF4F0]'
                    )}
                  >
                    <TableCell className="h-[64px] text-center">
                      <StatusBadge matched={isDefaultMatch || isMatched} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

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
                  ? 'empty'
                  : isMatched || isDefaultMatch
                    ? 'matched'
                    : 'unmatched'
              }
              NoOfMatchedData={transactionCount}
            />
          </div>

          {/* Search Input */}
          {!isMatched && (
            <div className="flex w-full items-center justify-end gap-4">
              <div className="relative w-full max-w-[200px]">
                <Input
                  className="h-12 rounded-xl pl-9 text-base placeholder:text-sm placeholder:text-gray-600"
                  placeholder="Search by description"
                  value={searchTerm}
                  onChange={(e) => {
                    setSelectedTransactionIndices([])
                    setSearchTerm(e.target.value)
                  }}
                />
                <SearchIcon className="absolute top-1/2 left-2 size-6 -translate-y-1/2" />
              </div>

              {hasPlanAccess('match') && (
                <DatePickerWithRange
                  date={dateRange}
                  onDateChange={setDateRange}
                />
              )}

              {hasPlanAccess('match') && (
                <AmountRangeSelector onRangeChange={handleAmountRangeChange} />
              )}
            </div>
          )}

          {/* Potential Matches List */}
          {!isMatched &&
            (searchTerm.trim() !== '' || dateRange?.from || selectedRange) && (
              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader className="h-[52px] border-b bg-[#F9FAFB]">
                    <TableRow>
                      <TableHead className="w-10 border-r px-6 text-left"></TableHead>
                      <TableHead className="border-r px-6 text-left">
                        Date
                      </TableHead>
                      <TableHead className="border-r px-6 text-left">
                        Description
                      </TableHead>
                      <TableHead className="px-6 text-left">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="h-full max-h-[35vh]">
                    {filteredTransactions?.length > 0 ? (
                      filteredTransactions?.map((transaction, index) => (
                        <TableRow
                          key={transaction.id}
                          className={`h-[52px] cursor-pointer ${
                            selectedTransactionIndices.includes(index)
                              ? 'bg-gray-100'
                              : ''
                          }`}
                          onClick={() => toggleTransactionSelection(index)}
                        >
                          <TableCell className="w-10 border-r">
                            <div className="flex justify-center">
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 ${
                                  selectedTransactionIndices.includes(index)
                                    ? 'border-[#297B65]'
                                    : 'border-gray-300'
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
                          <TableCell className="border-r px-6">
                            {transaction.date}
                          </TableCell>
                          <TableCell className="border-r px-6">
                            {transaction.description}
                          </TableCell>
                          <TableCell className="px-6">
                            {transaction.amount}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="py-4 text-center">
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
        <div className="block space-y-4 py-2 md:hidden">
          {/* Transaction Details */}
          <div
            className={cn(
              'flex flex-col gap-3 rounded-lg border p-4',
              isDefaultMatch || isMatched ? 'bg-[#F3FEFA]' : 'bg-[#FFF4F0]'
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
                              : '')}
                        </div>
                        <div className="text-base text-gray-700">
                          {bankTransaction?.description ||
                            (selectedTransactions.length > 0
                              ? selectedTransactions[0]?.description
                              : '')}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {bankTransaction?.amount ||
                        (selectedTransactions.length > 0
                          ? selectedTransactions[0]?.amount
                          : '')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="inline-block rounded-3xl border-[0.5px] p-2">
                    <StatusBadge matched={isDefaultMatch} />
                  </div>

                  <hr className="flex-1 border border-gray-200/70" />
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
                              : '')}
                        </div>
                        <div className="text-base text-gray-700">
                          {ledgerTransaction?.description ||
                            (selectedTransactions.length > 0
                              ? selectedTransactions[0]?.description
                              : '')}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {ledgerTransaction?.amount ||
                        (selectedTransactions.length > 0
                          ? selectedTransactions[0]?.amount
                          : '')}
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

                <div className="inline-block self-start rounded-3xl border-[0.5px] p-2">
                  <StatusBadge matched={selectedTransactions.length > 0} />
                </div>
              </>
            )}

            {isMatched && (
              <>
                {reconciledDataRow?.statements === null ? (
                  <div className="flex flex-col gap-3">
                    {selectedTransactions.map((transaction) => (
                      <div key={transaction.id}>
                        <div className="flex justify-between">
                          <div className="flex flex-col">
                            <div className="text-sm font-semibold text-gray-900">
                              Bank Statement
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm text-gray-700">
                                {bankTransaction?.date ||
                                  transaction?.date ||
                                  ''}
                              </div>
                              <div className="text-base text-gray-700">
                                {bankTransaction?.description ||
                                  transaction?.description ||
                                  ''}
                              </div>
                            </div>
                          </div>
                          <div className="font-medium text-gray-600">
                            {bankTransaction?.amount ||
                              transaction?.amount ||
                              ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-900">
                        Bank Statement
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-700">
                          {bankTransaction?.date}
                        </div>
                        <div className="text-base text-gray-700">
                          {bankTransaction?.description}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {bankTransaction?.amount}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="inline-block rounded-3xl border-[0.5px] p-2">
                    <StatusBadge matched={selectedTransactions.length > 0} />
                  </div>

                  <hr className="flex-1 border border-gray-200/70" />
                </div>

                {reconciledDataRow?.ledgers === null ? (
                  <div className="flex flex-col gap-3">
                    {selectedTransactions.map((transaction) => (
                      <div key={transaction.id}>
                        <div className="flex justify-between">
                          <div className="flex flex-col">
                            <div className="text-sm font-semibold text-gray-900">
                              Company Ledger
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm text-gray-700">
                                {ledgerTransaction?.date || transaction?.date}
                              </div>
                              <div className="text-base text-gray-700">
                                {ledgerTransaction?.description ||
                                  transaction?.description}
                              </div>
                            </div>
                          </div>
                          <div className="font-medium text-gray-600">
                            {ledgerTransaction?.amount || transaction?.amount}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-900">
                        Company Ledger
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-700">
                          {ledgerTransaction?.date}
                        </div>
                        <div className="text-base text-gray-700">
                          {ledgerTransaction?.description}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-600">
                      {ledgerTransaction?.amount}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Search Input - Only show if not matched */}
          {!isMatched && (
            <div className="flex w-full flex-col gap-2">
              {hasPlanAccess('match') && (
                <DatePickerWithRange
                  date={dateRange}
                  onDateChange={setDateRange}
                />
              )}
              <div className="relative">
                <Input
                  className="h-12 rounded-xl pl-9 text-base placeholder:text-sm placeholder:text-gray-600"
                  placeholder="Search by description"
                  value={searchTerm}
                  onChange={(e) => {
                    setSelectedTransactionIndices([])
                    setSearchTerm(e.target.value)
                  }}
                />
                <SearchIcon className="absolute top-1/2 left-2 size-6 -translate-y-1/2" />
              </div>
              {hasPlanAccess('match') && (
                <AmountRangeSelector onRangeChange={handleAmountRangeChange} />
              )}
            </div>
          )}

          {/* Search Results - Only show if not matched */}
          {!isMatched &&
          (searchTerm.trim() !== '' || selectedRange || dateRange?.from) ? (
            filteredTransactions.length > 0 ? (
              <div className="max-h-[300px] space-y-2 overflow-y-auto">
                {filteredTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className={cn(
                      'cursor-pointer rounded-lg border p-3',
                      selectedTransactionIndices.includes(index)
                        ? 'bg-primary/5 border-[#007A55]'
                        : 'border-gray-200'
                    )}
                    onClick={() => toggleTransactionSelection(index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 text-gray-600">
                        <div className="text-sm font-medium">
                          {possibleMatchTitle}
                        </div>
                        <div className="text-xs text-gray-500">
                          {transaction.date}
                        </div>
                        <div className="mt-1 text-sm">
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
              <div className="space-y-4 text-center text-gray-600">
                <hr />
                <p>No matching transactions found.</p>
              </div>
            )
          ) : null}
        </div>

        {/* Footer */}
        <DialogFooter className="sticky right-0 bottom-0 left-0 bg-white py-4">
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
              className="w-full cursor-pointer md:w-fit"
              disabled={
                selectedTransactionIndices.length === 0 ||
                (!!bankTransaction && !!ledgerTransaction)
              }
              onClick={handleMatchClick}
            >
              Match{' '}
              {selectedTransactionIndices.length > 0
                ? `(${selectedTransactionIndices.length})`
                : ''}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
