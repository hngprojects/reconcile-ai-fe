import { PaginationControls } from '@/components/PaginationControl'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/helpers/formatCurrency'
import { cn } from '@/lib/utils'
import { AccountCategory, AccountItem } from '@/types/chartOfAccounts'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

export function AccountTable({ category }: { category: AccountCategory }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const accountColumn: ColumnDef<AccountItem>[] = [
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => (
        <div className="px-3 py-4">{formatCurrency(row.original.amount)}</div>
      ),
    },
    {
      accessorKey: 'account_name',
      header: 'Account Name',
      cell: ({ row }) => (
        <div className="px-3 py-4">{row.original.account_name}</div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <div className="px-3 py-4">{row.original.description}</div>
      ),
    },
    {
      accessorKey: 'balance',
      header: 'Balance',
      cell: ({ row }) => (
        <div className="px-3 py-4">{formatCurrency(row.original.amount)}</div>
      ),
    },
  ]

  const accountTable = useReactTable({
    data: category.data,
    columns: accountColumn,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  })

  return (
    <div key={category.id} className="overflow-hidden rounded-md border">
      <div className="px-5 pt-5 pb-4 md:p-4">
        <h2 className="font-semibold">{category.name} Accounts</h2>
        <p className="text-muted-foreground text-sm">
          {category.full_description}
        </p>
      </div>

      <div>
        <div
          className={cn(
            'grid overflow-hidden border-t',
            category.data.length > 10 && 'border-b'
          )}
        >
          <Table>
            <TableHeader className="bg-gray-50 text-gray-700 dark:bg-[#1A1A1A] dark:!text-white">
              {accountTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index, array) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'h-12 bg-gray-100 px-6 text-center font-semibold text-gray-700 dark:text-white',
                        index < array.length - 1 && 'border-r'
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {accountTable.getRowModel().rows.length ? (
                accountTable.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className={cn('transition-colors')}>
                    {row.getVisibleCells().map((cell, index, array) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          'text-center',
                          index < array.length - 1 && 'border-r'
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
                    colSpan={accountColumn.length}
                    className="py-4 text-center"
                  >
                    No transaction has been added to this account yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {category.data.length > 10 && (
          <div className="px-4 lg:px-6">
            <PaginationControls
              pageIndex={accountTable.getState().pagination.pageIndex}
              pageSize={accountTable.getState().pagination.pageSize}
              totalItems={category.data.length}
              onPreviousPage={() => accountTable.previousPage()}
              onNextPage={() => accountTable.nextPage()}
              canPreviousPage={accountTable.getCanPreviousPage()}
              canNextPage={accountTable.getCanNextPage()}
              onRowsPerPageChange={(value) => accountTable.setPageSize(value)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
