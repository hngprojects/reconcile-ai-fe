import React from 'react'
import { Calendar1, ListFilter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
// import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const FilterComponent = () => {
  // const [date, setDate] = React.useState(null)

  return (
    <div className="flex items-center justify-between gap-[24px]">
      <div className="relative flex min-h-[44px] w-full items-center">
        <Search className="absolute left-3 h-4 w-4 text-[#00000099]" />
        <Input
          placeholder="Search"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          className="!min-h-[44px] max-w-[295px] gap-3 rounded-lg border-[0.5px] pt-4 pr-6 pb-4 pl-8 text-base leading-6 font-light tracking-normal text-[#00000033]"
        />
      </div>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex h-10 min-h-[44px] min-w-[150px] flex-1 items-center justify-start gap-2 text-left text-[14px] leading-[24px] font-medium tracking-[0%] md:flex-none"
            >
              <Calendar1 size={16} className="text-gray-500" />
              Select Dates
              {/* {date
                ? new Intl.DateTimeFormat('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }).format(date)
                : 'Select Dates'} */}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            {/* <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate)
              }}
              initialFocus
            /> */}
          </PopoverContent>
        </Popover>

        <Select>
          <SelectTrigger className="!font-inter m-0 min-h-[44px] max-w-[201px] gap-[8px] rounded-[8px] !border-[0.5px] !text-[14px] !leading-[24px] !font-medium !tracking-[0%] !text-[#000000]">
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
          className="font-inter h-10 min-h-[44px] px-4 text-[16px] leading-[24px] font-medium tracking-[0%]"
        >
          <ListFilter />
          More Filter
        </Button>
      </div>
    </div>
  )
}

export default FilterComponent
