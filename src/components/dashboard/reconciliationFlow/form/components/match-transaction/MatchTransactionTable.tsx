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
import { Check, Download } from 'lucide-react'
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
import { matchedItem } from '@/types/reconciliation'

export type Transaction = {
  id: string
  date: string
  description: {
    title: string
    text: string
  }
  amount: number
  match: {
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
  const { formState } = useReconciliationStore();

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
        title: item.ledger.Description,
        type: item.matched_by,
        amount: item.ledger.Amount,
        percentage: item.score,
      },
    }))
  }, [formState.results?.matches]);

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
          <div className="text-sm text-[#333]">{row.getValue('date')}</div>
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
              <div className="text-sm text-[#333]">{description.title}</div>
              <div className="text-xs text-[#475467]">{description.text}</div>
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
              className={`min-w-24 text-sm ${amount < 0 ? 'text-[#E63946]' : 'text-[#4CAF50]'}`}
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
                <div className="text-sm text-[#333]">{match.title}</div>
                <div className="flex items-center justify-center gap-1 text-xs text-[#475467]">
                  <span>{match.type}</span>
                  <DotIcon className="size-1.5" />
                  <span>
                    <div
                      className={`${amount < 0 ? 'text-[#E63946]' : 'text-[#4CAF50]'}`}
                    >
                      {formatted}
                    </div>
                  </span>
                </div>
              </div>
              <div
                className={`text-sm ${getConfidenceColor(match.percentage)} w-fit rounded-2xl px-2 py-0.5 font-medium`}
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
        cell: () => (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              type="button"
              size="sm"
              className="cursor-pointer text-black"
            >
              Match
            </Button>
          </div>
        ),
      },
    ],
    [getConfidenceColor]
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
        <h6 className="text-xl font-medium">Transactions Needing Review</h6>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            type="button"
            className="h-12 cursor-pointer"
          >
            <Download className="size-5 text-black/60" />
            <span>Export</span>
          </Button>
          <Button
            disabled={Object.keys(rowSelection).length === 0}
            type="button"
            className="h-12 cursor-pointer"
          >
            <Check className="size-5 text-white" />
            <span>Accept Selected</span>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="overflow-hidden rounded-xl border border-[#d9d9d9] bg-white">
          <Table>
            <TableHeader className="bg-[#f9fafb]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="h-[52px]" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        `border-r border-[#EAECF0] px-4 text-base font-bold text-[#333]`,
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
                    className="border-t border-gray-100"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          `border-r px-4 py-3`,
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
                    className="h-24 text-center"
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
            {/* Rows per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#344054]">
                Rows per page
              </span>
              <div className="relative overflow-hidden">
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => table.setPageSize(Number(value))}
                >
                  <SelectTrigger className="h-8 w-[58px] p-2">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 25, 50].map((size) => (
                      <SelectItem key={size} value={`${size}`}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pagination details */}
            <div className="text-sm text-gray-500">
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

          {/* Pagination controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
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
