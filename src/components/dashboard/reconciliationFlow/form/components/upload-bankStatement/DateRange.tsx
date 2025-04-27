'use client'

import { Calendar as CalendarIcon } from 'lucide-react'
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
import { useFormContext } from 'react-hook-form'
import { UploadBankStatementValues } from './UploadBankStatement'

export default function DateRange() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<UploadBankStatementValues>()

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
          className={cn(
            'group hover:bg-accent dark:border-border dark:bg-background dark:text-foreground flex h-10 w-full cursor-pointer items-center justify-between border-black/20',
            (errors.period?.from ||
              errors.period?.to ||
              errors.period?.message) &&
              'dark:border-destructive border-[#C50700]'
          )}
        >
          {fromDate && toDate ? (
            <span className="dark:text-foreground text-sm">{`${formatDisplay(fromDate)} - ${formatDisplay(toDate)}`}</span>
          ) : (
            <span className="dark:text-muted-foreground text-sm font-medium">
              Period
            </span>
          )}

          <CalendarIcon className="dark:text-foreground/60 size-4 text-black/60" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={8}
        align="end"
        className="dark:border-border dark:bg-background w-[335px] rounded-lg border border-[#EAECF0] bg-white p-4 shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] dark:shadow-none"
      >
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

        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <label className="dark:text-foreground mb-1 text-sm text-[#333]">
              From
            </label>
            <div className="dark:border-border dark:bg-background flex items-center gap-2 rounded-lg border border-black/20 bg-white px-2 py-2.5">
              <CalendarIcon className="dark:text-foreground/60 size-4 text-black/60" />
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
              <CalendarIcon className="dark:text-foreground/60 size-4 text-black/60" />
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
