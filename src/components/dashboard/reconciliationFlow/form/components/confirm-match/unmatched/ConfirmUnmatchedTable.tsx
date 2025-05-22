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
import { Download, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { SearchIcon } from '@/components/Icon/Icons'
import { useReconciliationStore } from '@/store/reconciliation-store'
import { TStatement } from '@/types/reconciliation'
import { AddLedgerEntryModal } from "@/components/dashboard/ledgers/modals/AddLedgerEntryModal"
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
}

const ConfirmUnmatchedTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAccount, setSelectedAccount] = useState('All Accounts')
  const [selectedLedger, setSelectedLedger] = useState('All Ledgers')

  const { formState } = useReconciliationStore();

  // Map matchedItems to table data
  const transactions: Transaction[] = useMemo(() => {
    return (formState.results?.unmatched_statements as TStatement[]).map((item) => ({
      id: item.id,
      date: item.Date,
      name: '',
      description: {
        title: item.Description,
        text: '',
      },
      accountNumber: `${item.accountNumber}`,
      bal: `${item.Amount}`,
      type: `Expense`,
      amount: item.Amount,
    }))
  }, [formState.results?.unmatched_statements]);


  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
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
        header: 'Matched With',
        cell: () => (
          <div className="relative flex w-full items-center">
            <SearchIcon className="absolute left-3 size-5" />
            <Input
              placeholder="Find possible Match"
              className="placeholder:text-muted-foreground/80 h-9 w-full flex-1 px-3 pl-9 outline-hidden placeholder:italic focus:outline-hidden disabled:cursor-not-allowed"
            />
          </div>
        ),
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
              <Plus className="size-5 stroke-[1.5px] text-black/60" />
              <span>Create entry</span>
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
      // const matchesLedger =
      //   selectedLedger === 'All Ledgers' ||
      //   transaction.match.type === selectedLedger
      const matchesSearch =
        transaction.description.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.description.text
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

      // return matchesAccount && matchesLedger && matchesSearch
      return matchesAccount && matchesSearch
    })
  }, [searchTerm, selectedAccount, transactions])

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
            <Download className="size-5 text-black/60" />
            <span>Export</span>
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
      <AddLedgerEntryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}

export default ConfirmUnmatchedTable
