"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ListFilter, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { cn } from "@/src/lib/utils";

interface FilterDropdownProps {
  fromDate: Date | undefined;
  toDate: Date | undefined;
  onFromDateChange: (date: Date | undefined) => void;
  onToDateChange: (date: Date | undefined) => void;
  onReset: () => void;
  onApply: () => void;
  onClear: () => void;
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
  const [open, setOpen] = useState(false);
  const [fromCalendarOpen, setFromCalendarOpen] = useState(false);
  const [toCalendarOpen, setToCalendarOpen] = useState(false);

  const handleFromDateSelect = (date: Date | undefined) => {
    onFromDateChange(date);
    setFromCalendarOpen(false);
  };

  const handleToDateSelect = (date: Date | undefined) => {
    onToDateChange(date);
    setToCalendarOpen(false);
  };

  const handleApply = () => {
    if (fromDate && toDate && fromDate > toDate) {
      alert("Start date cannot be after end date");
      return;
    }
    onApply();
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 px-4 py-2">
          <ListFilter />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-w-[400px] sm:w-[400px] p-4"
        align="start"
      >
        <div className="flex items-center justify-between mb-4">
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

        <div className="flex items-center justify-between mb-4">
          <span className="text-base font-medium text-gray-700">
            Select date
          </span>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/90 h-8 px-2 py-0"
            onClick={onClear}
          >
            Clear
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="text-base mb-1 block">From</span>
            <Popover open={fromCalendarOpen} onOpenChange={setFromCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !fromDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fromDate ? format(fromDate, "MMMM do, yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={handleFromDateSelect}
                  disabled={(date) => (toDate ? date > toDate : false)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <span className="text-base mb-1 block">To</span>
            <Popover open={toCalendarOpen} onOpenChange={setToCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !toDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {toDate ? format(toDate, "MMMM do, yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={handleToDateSelect}
                  disabled={(date) => (fromDate ? date < fromDate : false)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onReset}>
            Reset
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={handleApply}
            disabled={!fromDate && !toDate}
          >
            Apply Now
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
