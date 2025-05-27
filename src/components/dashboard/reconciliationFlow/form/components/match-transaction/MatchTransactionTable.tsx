'use client'

import React, { useState, useMemo, useCallback } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import Filters from './Filters'
import { Check, Download, Loader2 } from 'lucide-react'
import { DotIcon } from '@/components/Icon/Icons'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useReconciliationStore } from '@/store/reconciliation-store'
import { matchedItem, MatchRequestBody, TMatch } from '@/types/reconciliation'
import { match_unmatch_transactions } from '@/actions/reconcilation-server'
import { toast } from 'sonner'
import { SuccessToast } from '@/components/reconciliation/SuccessToast'
import { ErrorToast } from '@/components/reconciliation/ErrorToast'

export type Transaction = {
  id: string
  date: string
  description: {
    title: string
    text: string
  }
  amount: number
  match: {
    id: string
    title: string
    type: string
    amount: number
    percentage: number
  }
}

const MatchTransactionTable = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [confidenceThreshold, setConfidenceThreshold] =
    useState('High Confidence')
  const [isProcessing, setIsProcessing] = useState(false)
  const { formState, updateFormState } = useReconciliationStore()

  const parseConfidence = (option: string) => {
    if (option === 'High Confidence') return 90
    return parseInt(option.replace('% Confidence', ''), 10)
  }

  const thresholdValue = parseConfidence(confidenceThreshold)

  const getConfidenceColor = useCallback(
    (percentage: number) => {
      if (percentage >= thresholdValue) return 'text-[#027A48] bg-[#ECFDF3]'
      if (percentage >= thresholdValue - 20)
        return 'text-[#B54708] bg-[#FFFAEB]'
      return 'text-[#B42318] bg-[#FEF3F2]'
    },
    [thresholdValue]
  )

  // Map matchedItems to table data
  const transactions: Transaction[] = useMemo(() => {
    return (formState.results?.matches as matchedItem[]).map((item) => ({
      id: item.statement.id,
      date: item.statement.Date,
      description: {
        title: item.statement.Description,
        text: '',
      },
      amount: item.statement.Amount,
      match: {
        id: item.ledger.id,
        title: item.ledger.Description,
        type: item.matched_by,
        amount: item.ledger.Amount,
        percentage: item.score,
      },
    }))
  }, [formState.results?.matches])

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <div className="flex shrink-0 items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex shrink-0 items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => (
          <div className="text-sm text-[#333] dark:text-white">
            {row.getValue('date')}
          </div>
        ),
      },
      {
        accessorKey: 'description',
        header: 'Bank Description',
        cell: ({ row }) => {
          const description = row.getValue(
            'description'
          ) as Transaction['description']
          return (
            <div className="flex flex-col gap-1">
              <div className="text-sm text-[#333] dark:text-white">
                {description.title}
              </div>
              <div className="text-xs text-[#475467] dark:text-gray-400">
                {description.text}
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
          const amount = row.getValue('amount') as number
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }).format(amount)

          return (
            <div
              className={`min-w-24 text-sm ${amount < 0 ? 'text-[#E63946] dark:text-red-400' : 'text-[#4CAF50] dark:text-green-400'}`}
            >
              {formatted}
            </div>
          )
        },
      },
      {
        accessorKey: 'match',
        header: 'Suggested Match',
        cell: ({ row }) => {
          const match = row.getValue('match') as Transaction['match']
          const amount = match.amount as number
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }).format(amount)
          return (
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col gap-1">
                <div className="text-sm text-[#333] dark:text-white">
                  {match.title}
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-[#475467] dark:text-gray-400">
                  <span>{match.type}</span>
                  <DotIcon className="size-1.5 dark:text-gray-400" />
                  <span>
                    <div
                      className={`${amount < 0 ? 'text-[#E63946] dark:text-red-400' : 'text-[#4CAF50] dark:text-green-400'}`}
                    >
                      {formatted}
                    </div>
                  </span>
                </div>
              </div>
              <div
                className={`text-sm ${getConfidenceColor(match.percentage)} dark:bg-opacity-20 w-fit rounded-2xl px-2 py-0.5 font-medium`}
              >
                {match.percentage}%
              </div>
            </div>
          )
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              type="button"
              size="sm"
              className="cursor-pointer text-black dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              onClick={() => handleIndividualMatch(row.original)}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Match'
              )}
            </Button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getConfidenceColor, isProcessing]
  )

  const table = useReactTable({
    data: transactions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter: searchTerm,
    },
  })

  const handleMatchTransactions = async (
    selectedRows: Record<string, boolean>
  ) => {
    if (isProcessing) return

    setIsProcessing(true)
    try {
      console.log('=== Match Transactions Debug ===')
      console.log('1. Selected Rows:', selectedRows)

      const matches: TMatch[] = table
        .getRowModel()
        .rows.filter((row) => selectedRows[row.id])
        .map((row) => {
          const transaction = row.original
          const match: TMatch = {
            ledger: transaction.match.id,
            statement: transaction.id,
            matched_by: 'manual' as const,
            score: `${transaction.match.percentage}%`,
            action: 'match' as const,
          }
          console.log('2. Created Match:', match)
          return match
        })

      console.log('3. All Matches:', matches)
      if (matches.length === 0) {
        toast.custom((t) => (
          <ErrorToast
            message="No transactions selected"
            onClose={() => toast.dismiss()}
          />
        ))
        return
      }

      console.log('4. Sending to API matches array:', matches)
      console.log('4a. Full request body:', { matches })

      // Create a proper MatchRequestBody object
      const matchRequestBody: MatchRequestBody = { matches }

      const response = await match_unmatch_transactions(
        formState.reconciliation_id as string,
        matchRequestBody
      )

      console.log('5. API Response:', response)

      if (response.status === 'success') {
        updateFormState({
          results: response.data!,
          summary: response.data!.summary,
        })
        setRowSelection({})
        toast.custom((t) => (
          <SuccessToast
            message="Transactions matched successfully"
            onClose={() => toast.dismiss()}
          />
        ))
      } else {
        throw new Error(response.message || 'Failed to match transactions')
      }
    } catch (error) {
      console.error('6. Match Error:', error)
      toast.custom((t) => (
        <ErrorToast
          message={
            error instanceof Error
              ? error.message
              : 'Failed to match transactions'
          }
          onClose={() => toast.dismiss()}
        />
      ))
    } finally {
      setIsProcessing(false)
    }
  }

  const handleAcceptHighConfidence = () => {
    const newSelection: Record<string, boolean> = {}
    table.getRowModel().rows.forEach((row) => {
      const transaction = row.original
      if (transaction.match.percentage >= thresholdValue) {
        newSelection[row.id] = true
      }
    })
    setRowSelection(newSelection)
  }

  const handleIndividualMatch = async (transaction: Transaction) => {
    if (isProcessing) return

    setIsProcessing(true)
    try {
      console.log('=== Individual Match Debug ===')
      console.log('1. Transaction:', transaction)

      const match: TMatch = {
        ledger: transaction.match.id,
        statement: transaction.id,
        matched_by: 'manual' as const,
        score: `${transaction.match.percentage}%`,
        action: 'match' as const,
      }

      console.log('2. Created Match:', match)
      console.log('3. Sending to API match array:', [match])
      console.log('3a. Full request body:', { matches: [match] })

      const response = await match_unmatch_transactions(
        formState.reconciliation_id as string,
        { matches: [match] }
      )

      console.log('4. API Response:', response)

      if (response.success) {
        updateFormState({
          results: response.data!,
          summary: response.data!.summary,
        })
        toast.custom((t) => (
          <SuccessToast
            message="Transaction matched successfully"
            onClose={() => toast.dismiss()}
          />
        ))
      } else {
        throw new Error(response.message || 'Failed to match transaction')
      }
    } catch (error) {
      console.error('5. Match Error:', error)
      toast.custom((t) => (
        <ErrorToast
          message={
            error instanceof Error
              ? error.message
              : 'Failed to match transaction'
          }
          onClose={() => toast.dismiss()}
        />
      ))
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <Filters
        searchTerm={searchTerm}
        confidenceThreshold={confidenceThreshold}
        onSearchChange={setSearchTerm}
        onConfidenceChange={setConfidenceThreshold}
        onAccept={handleAcceptHighConfidence}
      />

      <div className="flex items-center justify-between">
        <h6 className="text-xl font-medium text-black dark:text-white">
          Transactions Needing Review
        </h6>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            type="button"
            className="h-12 cursor-pointer dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            <Download className="size-5 text-black/60 dark:text-white/60" />
            <span>Export</span>
          </Button>
          <Button
            disabled={Object.keys(rowSelection).length === 0 || isProcessing}
            type="button"
            className="h-12 cursor-pointer"
            onClick={() => handleMatchTransactions(rowSelection)}
          >
            {isProcessing ? (
              <Loader2 className="size-5 animate-spin text-white dark:text-black" />
            ) : (
              <Check className="da size-5 text-white dark:text-black" />
            )}
            <span>{isProcessing ? 'Processing...' : 'Accept Selected'}</span>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="overflow-hidden rounded-xl border border-[#d9d9d9] dark:border-white/20">
          <Table>
            <TableHeader className="dark:bg-card">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  className="h-[52px] dark:border-b dark:border-white/20"
                  key={headerGroup.id}
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        `px-4 text-base font-bold dark:text-white`,
                        header.id === 'select' &&
                          'p-4 [&:has([role=checkbox])]:p-4'
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="dark:hover:bg-card/90 dark:border-b dark:border-white/20"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          `border-r px-4 py-3 dark:border-white/20`,
                          cell.column.id === 'select' &&
                            'p-4 [&:has([role=checkbox])]:p-4'
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center dark:text-white"
                  >
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#344054] dark:text-white">
                Rows per page
              </span>
              <div className="relative overflow-hidden">
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => table.setPageSize(Number(value))}
                >
                  <SelectTrigger className="h-8 w-[58px] p-2 dark:border-white/20 dark:bg-transparent dark:text-white">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-card dark:border-white/20">
                    {[10, 25, 50].map((size) => (
                      <SelectItem
                        key={size}
                        value={`${size}`}
                        className="dark:text-white dark:focus:bg-white/10"
                      >
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{' '}
              of {table.getFilteredRowModel().rows.length} rows
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              Previous
            </Button>

            {(() => {
              const currentPage = table.getState().pagination.pageIndex + 1
              const pageCount = table.getPageCount()
              const buttons = []

              if (pageCount <= 4) {
                // If total pages are 4 or fewer, show all pages
                for (let i = 1; i <= pageCount; i++) {
                  buttons.push(i)
                }
              } else if (currentPage <= 2) {
                // First two pages: Show 1 2 ... lastPage
                buttons.push(1)
                buttons.push(2)
                buttons.push('...')
                buttons.push(pageCount)
              } else if (currentPage >= pageCount - 1) {
                // Last two pages: Show 1 ... secondLastPage lastPage
                buttons.push(1)
                buttons.push('...')
                buttons.push(pageCount - 1)
                buttons.push(pageCount)
              } else if (currentPage === 3) {
                // Page 3: Show 1 2 3 lastPage
                buttons.push(1)
                buttons.push(2)
                buttons.push(3)
                buttons.push(pageCount)
              } else if (currentPage === pageCount - 2) {
                // Third last page: Show 1 ... thirdLastPage secondLastPage
                buttons.push(1)
                buttons.push('...')
                buttons.push(pageCount - 2)
                buttons.push(pageCount - 1)
              } else {
                // Middle pages: Show 1 ... currentPage lastPage
                buttons.push(1)
                buttons.push('...')
                buttons.push(currentPage)
                buttons.push(pageCount)
              }

              return buttons.map((button, index) => {
                if (button === '...') {
                  return (
                    <Button
                      key={`ellipsis-${index}`}
                      variant="outline"
                      type="button"
                      size="sm"
                      disabled
                      className="cursor-default"
                    >
                      ...
                    </Button>
                  )
                }

                const page = Number(button)
                const isActive = currentPage === page

                return (
                  <Button
                    key={page}
                    type="button"
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => table.setPageIndex(page - 1)}
                  >
                    {page}
                  </Button>
                )
              })
            })()}

            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchTransactionTable
