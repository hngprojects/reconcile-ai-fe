'use client'

import { Calendar, ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function DateRange() {
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
    return date ? format(date, 'MMM d, yyyy') : ''
  }

  return (
    <div className="relative inline-block text-left">
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        type="button"
        size="lg"
        className="min-w-[104px] cursor-pointer border-black/20"
      >
        {fromDate && toDate ? (
          <span>{`${formatDate(fromDate)} - ${formatDate(toDate)}`}</span>
        ) : (
          <span className="text-sm font-medium">Period</span>
        )}

        <ChevronDownIcon
          className={cn(
            'size-4 text-black/60 transition-transform duration-300 ease-in-out',
            isOpen && 'rotate-180'
          )}
        />
      </Button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-[335px] rounded-lg border border-[#EAECF0] bg-white p-4 shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between">
            <span className="font-inter text-base font-normal text-[#00160A99]">
              Select period
            </span>
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
              <label className="font-inter mb-1 block text-sm font-normal text-[#333]">
                From
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-[rgba(0,0,0,0.20)] bg-white p-[10px_8px]">
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
              <label className="font-inter mb-1 block text-sm font-normal text-[#333]">
                To
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-[rgba(0,0,0,0.20)] bg-white p-[10px_8px]">
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
        </div>
      )}
    </div>
  )
}
