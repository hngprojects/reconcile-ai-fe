'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

type AmountRange = {
  min: number
  max: number | null
  label: string
  value: string
}

type AmountRangeSelectorProps = {
  onRangeChange?: (range: { min: number; max: number | null }) => void
  className?: string
  placeholder?: string
  defaultValue?: AmountRange
}

const predefinedRanges: AmountRange[] = [
  { min: 0, max: 5000, label: '0 - 5,000', value: '0-5000' },
  { min: 5000, max: 10000, label: '5,000 - 10,000', value: '5000-10000' },
  { min: 10000, max: 50000, label: '10,000 - 50,000', value: '10000-50000' },
  { min: 50000, max: 100000, label: '50,000 - 100,000', value: '50000-100000' },
  {
    min: 100000,
    max: 1000000,
    label: '100,000 - 1,000,000',
    value: '100000-1000000',
  },
]

export function AmountRangeSelector({
  onRangeChange,
  className,
  placeholder = 'Select amount range',
  defaultValue,
}: AmountRangeSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState<string>(
    defaultValue?.value || ''
  )
  const [showCustomInputs, setShowCustomInputs] = useState(false)
  const [customMin, setCustomMin] = useState<string>('')
  const [customMax, setCustomMax] = useState<string>('')
  const minInputRef = useRef<HTMLInputElement>(null)
  const maxInputRef = useRef<HTMLInputElement>(null)

  // Custom implementation to prevent closing the dropdown
  const handleCustomClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowCustomInputs(true)
  }

  const handleSelectPredefined = (value: string) => {
    if (value !== 'custom') {
      const selectedPredefinedRange = predefinedRanges.find(
        (range) => range.value === value
      )

      if (selectedPredefinedRange && onRangeChange) {
        onRangeChange({
          min: selectedPredefinedRange.min,
          max: selectedPredefinedRange.max,
        })
      }

      setSelectedRange(value)
      setOpen(false)
      setShowCustomInputs(false)
    }
  }

  const handleApplyCustomRange = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const min = Number.parseInt(customMin) || 0
    const max = customMax ? Number.parseInt(customMax) : null

    // const newLabel = max
    //   ? `${formatNumber(min)} - ${formatNumber(max)}`
    //   : `${formatNumber(min)}+`;
    setSelectedRange('custom')

    if (onRangeChange) {
      onRangeChange({ min, max })
    }

    setOpen(false)
    setShowCustomInputs(false)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  // Create a custom display value
  const displayValue = () => {
    if (!selectedRange) return placeholder

    if (selectedRange === 'custom') {
      const min = Number.parseInt(customMin) || 0
      const max = customMax ? Number.parseInt(customMax) : null
      return max
        ? `${formatNumber(min)} - ${formatNumber(max)}`
        : `${formatNumber(min)}+`
    }

    const range = predefinedRanges.find((r) => r.value === selectedRange)
    return range?.label || placeholder
  }

  useEffect(() => {
    if (showCustomInputs && minInputRef.current) {
      minInputRef.current.focus()
    }
  }, [showCustomInputs])

  return (
    <div className={cn('', className)}>
      <Select
        open={open}
        onOpenChange={setOpen}
        value={selectedRange}
        onValueChange={handleSelectPredefined}
      >
        <SelectTrigger className="!h-12 w-full rounded-xl text-sm md:min-w-44">
          <SelectValue
            placeholder={placeholder}
            className="text-sm text-gray-600"
          >
            {displayValue()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {predefinedRanges.map((range) => (
            <SelectItem key={range.value} value={range.value} className="p-2">
              {range.label}
            </SelectItem>
          ))}

          {/* Custom option */}
          <div
            className={cn(
              'focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative cursor-default rounded-sm p-2 text-sm outline-none select-none',
              showCustomInputs && 'bg-accent text-accent-foreground'
            )}
            onClick={handleCustomClick}
          >
            <span>Custom</span>
          </div>

          {/* Custom inputs section */}
          {showCustomInputs && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
              className="mt-1 max-w-64 overflow-hidden border-t px-1 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor="min-amount" className="mb-1 text-xs">
                    Min Amount
                  </Label>
                  <Input
                    id="min-amount"
                    type="number"
                    placeholder="0"
                    className="h-8"
                    value={customMin}
                    onChange={(e) => setCustomMin(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    ref={minInputRef}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="max-amount" className="mb-1 text-xs">
                    Max Amount
                  </Label>
                  <Input
                    id="max-amount"
                    type="number"
                    placeholder="No limit"
                    className="h-8"
                    value={customMax}
                    onChange={(e) => setCustomMax(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    ref={maxInputRef}
                  />
                </div>
              </div>
              <Button
                size="sm"
                className="w-full"
                onClick={handleApplyCustomRange}
              >
                Apply
              </Button>
            </motion.div>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
