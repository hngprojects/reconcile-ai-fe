'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, ListFilter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface FilterDropdownProps {
  fromDate: Date | undefined
  toDate: Date | undefined
  onFromDateChange: (date: Date | undefined) => void
  onToDateChange: (date: Date | undefined) => void
  onReset: () => void
  onApply: () => void
  onClear: () => void
}

export function FilterDropdown({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onReset,
  onApply,
  onClear,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const [fromCalendarOpen, setFromCalendarOpen] = useState(false)
  const [toCalendarOpen, setToCalendarOpen] = useState(false)

  // Temporary state to store selected dates before applying
  const [tempFromDate, setTempFromDate] = useState<Date | undefined>(fromDate)
  const [tempToDate, setTempToDate] = useState<Date | undefined>(toDate)

  const handleFromDateSelect = (date: Date | undefined) => {
    setTempFromDate(date)
    setFromCalendarOpen(false)
  }

  const handleToDateSelect = (date: Date | undefined) => {
    setTempToDate(date)
    setToCalendarOpen(false)
  }

  const handleApply = () => {
    // Update the actual dates when Apply is clicked
    onFromDateChange(tempFromDate)
    onToDateChange(tempToDate)
    onApply()
    setOpen(false)
  }

  const handleReset = () => {
    // Reset both temporary and actual dates
    setTempFromDate(undefined)
    setTempToDate(undefined)
    onFromDateChange(undefined)
    onToDateChange(undefined)
    onReset()
  }

  const handleClear = () => {
    // Clear both temporary and actual dates
    setTempFromDate(undefined)
    setTempToDate(undefined)
    onFromDateChange(undefined)
    onToDateChange(undefined)
    onClear()
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 px-4 py-2">
          <ListFilter />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-w-[400px] p-4 sm:min-w-[400px]"
        align="start"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Filter</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-base font-medium text-gray-700">
            Select date
          </span>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/90 h-8 px-2 py-0"
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <span className="mb-1 block text-base">From</span>
            <Popover open={fromCalendarOpen} onOpenChange={setFromCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !tempFromDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="h-4 w-4" />
                  {tempFromDate
                    ? format(tempFromDate, 'MMMM do, yyyy')
                    : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={tempFromDate}
                  onSelect={handleFromDateSelect}
                  disabled={(date) => (tempToDate ? date > tempToDate : false)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <span className="mb-1 block text-base">To</span>
            <Popover open={toCalendarOpen} onOpenChange={setToCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !tempToDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="h-4 w-4" />
                  {tempToDate
                    ? format(tempToDate, 'MMMM do, yyyy')
                    : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={tempToDate}
                  onSelect={handleToDateSelect}
                  disabled={(date) =>
                    tempFromDate ? date < tempFromDate : false
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={handleApply}
            disabled={!tempFromDate && !tempToDate}
          >
            Apply Now
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
