import React, { useState } from 'react'
import { Calendar as CalendarIcon, ListFilter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DateRange } from 'react-day-picker'

interface FilterComponentProps {
  onSearch: (query: string) => void
  onDateRangeChange: (range: DateRange | undefined) => void
  onStatusChange: (status: string) => void
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  onSearch,
  onDateRangeChange,
  onStatusChange,
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range)
    onDateRangeChange(range)
  }

  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div className="relative flex min-h-11 w-full flex-1 items-center">
        <Search className="absolute left-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
          className="min-h-11 max-w-xs gap-3 rounded-lg border-[0.5px] pl-8 text-base font-light lg:max-w-[295px]"
        />
      </div>

      <div className="flex flex-1 flex-row justify-end gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex h-10 min-h-11 items-center justify-start gap-2 text-left text-sm font-medium max-sm:flex-none sm:min-h-11 sm:min-w-[150px]"
            >
              <CalendarIcon size={16} />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {dateRange.from.toLocaleDateString()} -{' '}
                    {dateRange.to.toLocaleDateString()}
                  </>
                ) : (
                  dateRange.from.toLocaleDateString()
                )
              ) : (
                'Select Dates'
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateRangeChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select onValueChange={(value) => onStatusChange(value)}>
          <SelectTrigger className="font-inter min-h-11 min-w-[201px] flex-1 gap-2 rounded-lg border-[0.5px] text-sm font-medium lg:max-w-[201px]">
            <SelectValue placeholder="Reconciliation Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="reconciled">Reconciled</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          className="font-inter h-10 min-h-11 px-4 text-sm font-medium"
        >
          <ListFilter />
          <span className="max-sm:hidden">More Filter</span>
        </Button>
      </div>
    </div>
  )
}

export default FilterComponent
