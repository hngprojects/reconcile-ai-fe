'use client'

import { DotIcon } from '@/components/Icon/Icons'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import { Matched } from '@/types/backendResponseTypes'
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
import { useMemo, useState } from 'react'

const MatchTable = ({
  matchedTransactions,
}: {
  matchedTransactions?: Matched[]
}) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const columns = useMemo<ColumnDef<Matched>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => {
          const date = formatDate(row.original.statement.Date)

          return <div className="text-center text-sm text-[#333] dark:text-white">{date}</div>
        },
      },
      {
        accessorKey: 'description',
        header: 'Bank Description',
        cell: ({ row }) => {
          const description = row.original.statement.Description

          return (
            <div className="text-center text-sm text-[#333] dark:text-white">{description}</div>
          )
        },
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
          const amount = Number(row.original.statement.Amount)
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }).format(amount)

          return (
            <div
              className={`min-w-24 text-center text-sm ${amount < 0 ? 'text-[#E63946]' : 'text-[#4CAF50]'}`}
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
          const match = row.original.ledger

          const amount = Number(match.Amount)
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }).format(amount)

          return (
            <div className="flex items-center justify-start gap-2">
              <div className="flex flex-col gap-1">
                <div className="text-start text-sm text-[#333] dark:text-white">
                  {match.type}
                </div>
                <div className="flex items-center justify-center gap-1 text-xs text-[#475467] dark:text-gray-300">
                  <span>{match.Description}</span>
                  <DotIcon className="size-1.5" />
                  <span
                    className={`${amount < 0 ? 'text-[#E63946]' : 'text-[#4CAF50]'}`}
                  >
                    {formatted}
                  </span>
                </div>
              </div>
            </div>
          )
        },
      },
      // {
      //   id: 'actions',
      //   header: 'Action',
      //   cell: () => (
      //     <div className="flex w-full items-center justify-center gap-2">
      //       <Button
      //         variant="ghost"
      //         type="button"
      //         size="sm"
      //         className="cursor-pointer text-black"
      //       >
      //         <EllipsisVertical />
      //       </Button>
      //     </div>
      //   ),
      // },
    ],
    []
  )

  const table = useReactTable({
    data: matchedTransactions as Matched[],
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
    },
  })

  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <div className="grid overflow-hidden rounded-xl border border-[#d9d9d9] dark:border-white/20">
          <Table>
            <TableHeader className="bg-[#f9fafb] dark:bg-card">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="h-[52px]" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        `border-r border-[#EAECF0] dark:border-white/20 px-4 text-center text-base font-semibold text-[#333] dark:text-white`,
                        header.id === 'match' && 'text-start',
                        header.id === 'actions' && 'w-[72px]'
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
                          `border-r px-4 py-3 text-center dark:text-white`,
                          cell.column.id === 'actions' && 'w-[72px]'
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

        <div className="flex flex-col justify-between gap-y-3 py-4 max-sm:!text-xs sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            {/* Rows per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#344054] dark:text-white">
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
            <div className="text-sm text-gray-500 dark:text-white">
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

export default MatchTable
