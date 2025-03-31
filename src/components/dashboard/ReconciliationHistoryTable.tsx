'use client'

import { useReconcilations } from '@/app/queries'
import { PaginationControls } from '@/components/PaginationControl'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useReconciliationStore } from '@/hooks/use-reconcilation'
import { cn } from '@/lib/utils'
import { RecordItem } from '@/types/global'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { format, isWithinInterval, parseISO } from 'date-fns'
import { ArrowUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

export function ReconciliationHistoryTable() {
  const router = useRouter()
  const [pageSize, setPageSize] = useState(10)
  const { data: reconciliations } = useReconcilations()
  const { fromDate, isFilterApplied, toDate } = useReconciliationStore()

  const formatDate = (dateString: string) => {
    try {
      // Try parsing ISO format first
      const parsedDate = parseISO(dateString)
      return format(parsedDate, 'dd-MM-yyyy')
    } catch (error) {
      console.warn(`Date formatting error: ${error}`)
      return dateString
    }
  }

  const filteredData = useMemo(() => {
    if (!isFilterApplied || (!fromDate && !toDate)) {
      return reconciliations
    }

    return reconciliations?.filter((item) => {
      const itemDate = parseISO(item.date)

      if (fromDate && !toDate) {
        return itemDate >= fromDate
      }

      // If only toDate is provided
      if (!fromDate && toDate) {
        return itemDate <= toDate
      }

      // If both dates are provided
      if (fromDate && toDate) {
        return isWithinInterval(itemDate, { start: fromDate, end: toDate })
      }

      return true
    })
  }, [fromDate, toDate, isFilterApplied, reconciliations])

  // Columns definition
  const columns: ColumnDef<RecordItem>[] = [
    {
      accessorKey: 'serial_number',
      header: 'S/N',
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => formatDate(row.original.date),
    },
    {
      accessorKey: 'title',
      header: 'Reconciliation ID',
    },
    {
      accessorKey: 'progress',
      header: 'Status',
      cell: ({ row }) => {
        const isComplete = row.original.status === 'Completed'

        return (
          <div
            className={cn(
              'font-medium',
              isComplete ? 'text-green-600' : 'text-amber-600'
            )}
          >
            {isComplete ? 'Complete' : 'Pending'}
          </div>
        )
      },
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => {
        const isComplete = row.original.status === 'Completed'

        return (
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:text-primary cursor-pointer border-2"
            disabled={!isComplete}
            onClick={() => {
              router.push(`/reconciliation/${row.original.id}`)
            }}
          >
            View <ArrowUpRight className="h-3 w-3" />
          </Button>
        )
      },
    },
  ]

  const table = useReactTable({
    data: filteredData as RecordItem[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  const totalItems = filteredData?.length

  return (
    <div>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="h-12 bg-gray-100 hover:bg-gray-100"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'px-5 text-black',
                      {
                        'border-r': header.column.id !== 'action',
                      },
                      {
                        'w-[190px]': header.column.id === 'action',
                      },
                      {
                        'w-[84px] text-center md:text-start':
                          header.column.id === 'serial_number',
                      }
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'px-5 py-3',
                        {
                          'border-r text-left':
                            index !== row.getVisibleCells().length - 1,
                        },
                        {
                          'text-center md:text-start':
                            cell.column.id === 'serial_number',
                        }
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
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <PaginationControls
        pageIndex={table.getState().pagination.pageIndex}
        pageSize={pageSize}
        totalItems={totalItems ?? 1}
        onPreviousPage={() => table.previousPage()}
        onNextPage={() => table.nextPage()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        onRowsPerPageChange={(value) => {
          setPageSize(value)
          table.setPageSize(value)
        }}
      />
    </div>
  )
}
