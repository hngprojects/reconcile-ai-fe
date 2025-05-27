'use client'

import React, { useState, useMemo } from 'react'
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
import { Button } from '@/components/ui/button'
import Filters from './Filters'
import { Download, EllipsisVertical } from 'lucide-react'
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
  name: string
  accountNumber: string
  bal: string
  type: string
  description: {
    title: string
    text: string
  }
  amount: number
  match: {
    type: string
    name: string
    amount: number
    percentage: number
  }
}

const ConfirmMatchTable = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAccount, setSelectedAccount] = useState('All Accounts')
  const [selectedLedger, setSelectedLedger] = useState('All Ledgers')
  const { formState } = useReconciliationStore()

  // Map matchedItems to table data
  const transactions: Transaction[] = useMemo(() => {
    return (formState.results?.matches as matchedItem[]).map((item) => ({
      id: item.statement.id,
      date: item.statement.Date,
      name: '',
      description: {
        title: item.statement.Description,
        text: '',
      },
      accountNumber: `${item.statement.AccountNumber}`,
      bal: `${item.statement.Amount - item.ledger.Amount}`,
      type: `${item.ledger.type}`,
      amount: item.statement.Amount,
      match: {
        name: item.ledger.Description,
        type: item.matched_by,
        amount: item.ledger.Amount,
        percentage: item.score,
      },
    }))
  }, [formState.results?.matches])

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
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
              className={`min-w-24 text-sm ${amount < 0 ? 'text-[#E63946]' : 'text-[#4CAF50]'}`}
            >
              {formatted}
            </div>
          )
        },
      },
      {
        accessorKey: 'match',
        header: 'Matched With',
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
                  {match.type}
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-[#475467] dark:text-gray-400">
                  <span>{match.name}</span>
                  <DotIcon className="size-1.5 dark:text-gray-400" />
                  <span
                    className={`${amount < 0 ? 'text-[#E63946] dark:text-red-400' : 'text-[#4CAF50] dark:text-green-400'}`}
                  >
                    {formatted}
                  </span>
                </div>
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
              variant="ghost"
              type="button"
              size="sm"
              className="cursor-pointer text-black"
            >
              <EllipsisVertical className='dark:text-white' />
            </Button>
          </div>
        ),
      },
    ],
    []
  )

  const filteredData = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesAccount =
        selectedAccount === 'All Accounts' ||
        transaction.name === selectedAccount
      const matchesLedger =
        selectedLedger === 'All Ledgers' ||
        transaction.match.type === selectedLedger
      const matchesSearch =
        transaction.description.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.description.text
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

      return matchesAccount && matchesLedger && matchesSearch
    })
  }, [searchTerm, selectedAccount, selectedLedger, transactions])

  const table = useReactTable({
    data: filteredData,
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

  return (
    <div className="mt-8 flex w-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <Filters
          searchTerm={searchTerm}
          selectedAccount={selectedAccount}
          selectedLedger={selectedLedger}
          onSearchChange={setSearchTerm}
          onAccountChange={setSelectedAccount}
          onLedgerChange={setSelectedLedger}
        />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            type="button"
            className="h-12 cursor-pointer"
          >
            <Download className="size-5 text-black/60 dark:text-white" />
            <span>Export</span>
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
                        header.id === 'select' && 'p-4'
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
                    className="dark:border-b dark:border-white/20 dark:hover:bg-white/5"
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
                for (let i = 1; i <= pageCount; i++) {
                  buttons.push(i)
                }
              } else if (currentPage <= 2) {
                buttons.push(1)
                buttons.push(2)
                buttons.push('...')
                buttons.push(pageCount)
              } else if (currentPage >= pageCount - 1) {
                buttons.push(1)
                buttons.push('...')
                buttons.push(pageCount - 1)
                buttons.push(pageCount)
              } else if (currentPage === 3) {
                buttons.push(1)
                buttons.push(2)
                buttons.push(3)
                buttons.push(pageCount)
              } else if (currentPage === pageCount - 2) {
                buttons.push(1)
                buttons.push('...')
                buttons.push(pageCount - 2)
                buttons.push(pageCount - 1)
              } else {
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
                    className={
                      !isActive
                        ? 'dark:border-white/20 dark:text-white dark:hover:bg-white/10'
                        : ''
                    }
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

export default ConfirmMatchTable
