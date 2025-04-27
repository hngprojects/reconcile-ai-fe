'use client'

import { Calendar, ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { UseFormReturn } from 'react-hook-form'
import { FormValues } from './AddNewStatement'

interface DateRangeProps {
  form: UseFormReturn<FormValues>
}

export default function DateRange({ form }: DateRangeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const {
    setValue,
    watch,
    formState: { errors },
  } = form
  const period = watch('period')

  const fromDate = period?.from ? new Date(period.from) : null
  const toDate = period?.to ? new Date(period.to) : null

  const applyFilter = () => setIsOpen(false)

  const clear = () => {
    setValue('period', { from: '', to: '' }, { shouldValidate: true })
    setIsOpen(false)
  }

  const formatDisplay = (date: Date | null) => {
    return date ? format(date, 'MMM d, yyyy') : ''
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          size="lg"
          className={cn(
            `dark:border-border dark:bg-background dark:text-foreground w-full min-w-[104px] cursor-pointer justify-between border-black/20`,
            (errors.period?.from ||
              errors.period?.to ||
              errors.period?.message) &&
              'dark:border-destructive border-[#C50700]'
          )}
        >
          {fromDate && toDate ? (
            <span className="dark:text-foreground">{`${formatDisplay(fromDate)} - ${formatDisplay(toDate)}`}</span>
          ) : (
            <span className="dark:text-muted-foreground text-sm font-medium">
              Period
            </span>
          )}

          <ChevronDownIcon
            className={cn(
              'dark:text-muted-foreground size-4 text-black/60 transition-transform duration-300 ease-in-out',
              isOpen && 'rotate-180'
            )}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={8}
        align="start"
        className="dark:border-border dark:bg-background w-[335px] rounded-lg border border-[#EAECF0] bg-white p-4 shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] dark:shadow-none"
      >
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <span className="dark:text-muted-foreground text-[#00160A99]">
            Select period
          </span>
          <Button
            onClick={clear}
            type="button"
            variant="link"
            className="text-primary dark:text-primary cursor-pointer hover:no-underline"
          >
            Clear
          </Button>
        </div>

        {/* Date Pickers */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <label className="dark:text-foreground mb-1 text-sm text-[#333]">
              From
            </label>
            <div className="dark:border-border dark:bg-background flex items-center gap-2 rounded-lg border border-black/20 bg-white px-2 py-2.5">
              <Calendar
                strokeWidth={1}
                className="dark:text-foreground size-7 text-[#222222]"
              />
              <DatePicker
                selected={fromDate}
                onChange={(date) => {
                  setValue('period.from', date?.toISOString() || '', {
                    shouldValidate: true,
                  })
                  if (date && toDate && date > toDate) {
                    setValue('period.to', '', { shouldValidate: true })
                  }
                }}
                selectsStart
                startDate={fromDate}
                endDate={toDate}
                maxDate={toDate || undefined}
                placeholderText="Select date"
                className="dark:bg-background dark:text-foreground dark:placeholder:text-muted-foreground w-full text-sm outline-none"
                dateFormat="MMM dd, yyyy"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="dark:text-foreground mb-1 text-sm text-[#333]">
              To
            </label>
            <div className="dark:border-border dark:bg-background flex items-center gap-2 rounded-lg border border-black/20 bg-white px-2 py-2.5">
              <Calendar
                strokeWidth={1}
                className="dark:text-foreground size-7 text-[#222222]"
              />
              <DatePicker
                selected={toDate}
                onChange={(date) =>
                  setValue('period.to', date?.toISOString() || '', {
                    shouldValidate: true,
                  })
                }
                selectsEnd
                startDate={fromDate}
                endDate={toDate}
                minDate={fromDate || undefined}
                placeholderText="Select date"
                className="dark:bg-background dark:text-foreground dark:placeholder:text-muted-foreground w-full text-sm outline-none"
                dateFormat="MMM dd, yyyy"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            onClick={() => {
              setValue('period', { from: '', to: '' }, { shouldValidate: true })
              setIsOpen(false)
            }}
            type="button"
            variant="outline"
            className="dark:border-border dark:text-foreground cursor-pointer border-black/20"
          >
            Reset
          </Button>
          <Button
            onClick={applyFilter}
            type="button"
            className="dark:text-primary-foreground cursor-pointer"
          >
            Apply Now
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
