'use client'

import { useReconcilations } from '@/app/queries'
import { PaginationControls } from '@/components/PaginationControl'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useReconciliationStore } from '@/hooks/use-reconcilation'
import { cn } from '@/lib/utils'
import { RecordItem } from '@/types/global'
import {
  type ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  endOfDay,
  format,
  isAfter,
  isBefore,
  isWithinInterval,
  parseISO,
  startOfDay,
} from 'date-fns'
import { ArrowUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

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
          className={cn(
            'border-primary text-primary border-2',
            !isComplete
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-primary/10 cursor-pointer'
          )}
          disabled={!isComplete}
          onClick={(e) => {
            if (!isComplete) {
              e.preventDefault()
              return
            }
          }}
        >
          View <ArrowUpRight className="h-3 w-3" />
        </Button>
      )
    },
  },
]

export function ReconciliationHistoryCard() {
  const router = useRouter()
  const { data: reconciliations } = useReconcilations()
  const { fromDate, isFilterApplied, toDate } = useReconciliationStore()
  const [pageSize, setPageSize] = useState(10)

  const formatDate = (dateString: string) => {
    try {
      const parsedDate = parseISO(dateString)
      return format(parsedDate, 'dd MMM yyyy')
    } catch (error) {
      console.warn(`Date formatting error: ${error}`)
      return dateString
    }
  }

  const filteredData = useMemo(() => {
    if (!isFilterApplied || (!fromDate && !toDate) || !reconciliations) {
      return reconciliations || []
    }

    return reconciliations.filter((item) => {
      try {
        const itemDate = parseISO(item.date)
        if (fromDate && toDate) {
          return isWithinInterval(itemDate, {
            start: startOfDay(fromDate),
            end: endOfDay(toDate),
          })
        }
        if (fromDate) {
          return isAfter(itemDate, startOfDay(fromDate))
        }
        if (toDate) {
          return isBefore(itemDate, endOfDay(toDate))
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    })
  }, [fromDate, toDate, isFilterApplied, reconciliations])

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
      <div className="space-y-4">
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <Card key={row.id} className="w-full border border-[#E4E7EC]">
              <CardContent className="space-y-3 p-4">
                <div className="text-sm text-[#333333]">
                  {formatDate(row.original.date)}
                </div>
                <div className="font-medium text-[#333333]">
                  {row.original.title}
                </div>

                <div
                  className={cn(
                    'w-fit rounded-full px-2 py-1 text-xs font-medium',
                    row.original.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  )}
                >
                  {row.original.status === 'Completed' ? (
                    <p className="flex items-center gap-[6px]">
                      Complete{' '}
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 1L3.5 6.5L1 4"
                          stroke="#12B76A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </p>
                  ) : (
                    <p className="flex items-center gap-[6px]">
                      Pending{' '}
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 1L3.5 6.5L1 4"
                          stroke="#E17100"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </p>
                  )}
                </div>

                <Button
                  variant="outline"
                  className={cn(
                    'border-primary text-primary w-full border-2',
                    row.original.status !== 'Completed'
                      ? 'pointer-events-none cursor-not-allowed opacity-50'
                      : 'hover:bg-primary/10 cursor-pointer'
                  )}
                  disabled={row.original.status !== 'Completed'}
                  onClick={(e) => {
                    if (row.original.status !== 'Completed') {
                      e.preventDefault()
                      return
                    }
                    router.push(`/reconciliation/${row.original.id}`)
                  }}
                >
                  View <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="py-4 text-center">No results.</div>
        )}
      </div>

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
