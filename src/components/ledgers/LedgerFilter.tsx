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
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div className="relative flex min-h-[44px] w-full items-center">
        <Search className="absolute left-3 h-4 w-4 text-[#00000099]" />
        <Input
          placeholder="Search"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          className="!min-h-[44px] gap-3 rounded-lg border-[0.5px] pt-4 pr-6 pb-4 pl-8 text-base leading-6 font-light tracking-normal text-[#00000033] lg:max-w-[295px]"
        />
      </div>

      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex h-10 min-h-[44px] flex-1 items-center justify-start gap-2 text-left text-sm leading-[24px] font-medium tracking-[0%] max-sm:flex-none sm:min-h-[44px] sm:min-w-[150px]"
            >
              <Calendar1 size={16} className="text-gray-500" />
              <span className="max-sm:hidden">Select Dates</span>
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
          <SelectTrigger className="!font-inter !border-[0.5px m-0 min-h-[44px] flex-1 gap-[8px] rounded-[8px] text-sm !leading-[24px] !font-medium !tracking-[0%] !text-[#000000] lg:max-w-[201px]">
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
          className="font-inter h-10 min-h-[44px] px-4 text-sm leading-[24px] font-medium tracking-[0%]"
        >
          <ListFilter />
          <span className="max-sm:hidden">More Filter</span>
        </Button>
      </div>
    </div>
  )
}

export default FilterComponent
