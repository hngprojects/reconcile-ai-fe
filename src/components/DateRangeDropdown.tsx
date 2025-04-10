'use client'

import { Calendar, ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from './ui/button'
import { format } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default function DateRangeDropdown({
  children,
}: {
  children: React.ReactNode
}) {
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const applyFilter = () => {
    setIsOpen(false)
  }

  const reset = () => {
    setFromDate(null)
    setToDate(null)
  }

  const clear = () => {
    reset()
    setIsOpen(false)
  }

  const formatDate = (date: Date | null) => {
    return date ? format(date, 'MMM d') : ''
  }

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          type="button"
          size="lg"
          className="h-12 min-w-[104px] rounded-lg border-black/20"
        >
          {fromDate && toDate ? (
            <span>{`${formatDate(fromDate)} - ${formatDate(toDate)}`}</span>
          ) : (
            <span className="font-normal">{children}</span>
          )}

          <ChevronDownIcon className="text-muted-foreground/50 size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onInteractOutside={() => setIsOpen(false)}
        sideOffset={8}
        align="end"
        className="w-[335px] rounded-lg border border-[#EAECF0] bg-white p-4 shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]"
      >
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[#00160A99]">Select period</span>
          <Button
            onClick={clear}
            type="button"
            variant="link"
            className="text-primary cursor-pointer hover:no-underline"
          >
            Clear
          </Button>
        </div>

        {/* Date Pickers */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <label className="mb-1 text-sm text-[#333]">From</label>
            <div className="flex items-center gap-2 rounded-lg border border-black/20 bg-white px-2 py-2.5">
              <Calendar className="h-7 w-7" />
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                selectsStart
                startDate={fromDate}
                endDate={toDate}
                maxDate={toDate || undefined}
                placeholderText="Select date"
                className="w-full text-sm outline-none"
                dateFormat="MMM dd, yyyy"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="mb-1 text-sm text-[#333]">To</label>
            <div className="flex items-center gap-2 rounded-lg border border-black/20 bg-white px-2 py-2.5">
              <Calendar className="h-7 w-7" />
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                selectsEnd
                startDate={fromDate}
                endDate={toDate}
                minDate={fromDate || undefined}
                placeholderText="Select date"
                className="w-full text-sm outline-none"
                dateFormat="MMM dd, yyyy"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            onClick={reset}
            type="button"
            variant="outline"
            className="cursor-pointer border-black/20 hover:bg-gray-50"
          >
            Reset
          </Button>
          <Button
            onClick={applyFilter}
            type="button"
            className="cursor-pointer"
          >
            Apply Now
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
