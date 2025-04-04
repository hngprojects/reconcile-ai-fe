// components/DropdownFilter.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DropdownFilterProps {
  options: string[]
  selected: string
  onSelect: (value: string) => void
}

export default function DropdownFilter({
  options,
  selected,
  onSelect,
}: DropdownFilterProps) {
  return (
    <Select value={selected} onValueChange={onSelect}>
      <SelectTrigger className="min-h-12 w-[170px] border border-black/20 p-3 text-sm font-medium">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="absolute top-full z-10 mt-1 w-[200px]">
        {options.map((option) => (
          <SelectItem key={option} value={option} className="min-h-12">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
