'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  date?: DateRange | undefined
  onDateChange?: (date: DateRange | undefined) => void
}

export function DatePickerWithRange({
  className,
  date,
  onDateChange,
}: DatePickerWithRangeProps) {
  const [localDate, setLocalDate] = React.useState<DateRange | undefined>(date)

  const handleSelect = (newDate: DateRange | undefined) => {
    setLocalDate(newDate)
    onDateChange?.(newDate)
  }

  React.useEffect(() => {
    setLocalDate(date)
  }, [date])

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'h-12 justify-start rounded-xl text-left font-normal md:w-[300px]',
              !localDate && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {localDate?.from ? (
              localDate.to ? (
                <>
                  {format(localDate.from, 'LLL dd, y')} -{' '}
                  {format(localDate.to, 'LLL dd, y')}
                </>
              ) : (
                format(localDate.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={localDate?.from}
            selected={localDate}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
