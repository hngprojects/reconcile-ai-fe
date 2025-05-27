'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PaginationControlsProps {
  pageIndex: number
  pageSize: number
  totalItems: number
  onPreviousPage: () => void
  onNextPage: () => void
  canPreviousPage: boolean
  canNextPage: boolean
  onRowsPerPageChange: (value: number) => void
}

export function PaginationControls({
  pageIndex,
  pageSize,
  totalItems,
  onPreviousPage,
  onNextPage,
  canPreviousPage,
  canNextPage,
  onRowsPerPageChange,
}: PaginationControlsProps) {
  const startItem = pageIndex * pageSize + 1
  const endItem = Math.min((pageIndex + 1) * pageSize, totalItems)

  const rowOptions = [10, 25, 50]

  const isOptionDisabled = (size: number) => {
    return (size > 10 && totalItems <= 10) || (size > 25 && totalItems <= 25)
  }

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-700 dark:text-gray-300 sm:text-sm">Rows per page</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onRowsPerPageChange(Number(value))}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={pageSize.toString()} />
          </SelectTrigger>
          <SelectContent>
            {rowOptions.map((option) => (
              <SelectItem
                key={option}
                disabled={isOptionDisabled(option)}
                value={option.toString()}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-xs text-gray-700 dark:text-gray-300 sm:text-sm">
          {startItem} - {endItem} of {totalItems} rows
        </span>
      </div>
      <p className="hidden text-xs font-medium text-[#344054] dark:text-[#a8c2f9] sm:text-sm">
        Showing {endItem} out of {totalItems}
      </p>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm"
          onClick={onPreviousPage}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm"
          onClick={onNextPage}
          disabled={!canNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
