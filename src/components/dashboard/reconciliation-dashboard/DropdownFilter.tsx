import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export default function DropdownFilter({
  options,
  selected,
  onSelect,
  type,
}: {
  options: string[]
  selected: string
  onSelect: (value: string) => void
  type?: string
}) {
  return (
    <Select value={selected} onValueChange={(value) => onSelect(value)}>
      <SelectTrigger className="flex [height:48px_!important] flex-1 items-center justify-center gap-2 rounded-lg border border-black/20 p-3">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="absolute top-full z-10 mt-1">
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className={cn('[height:48px_!important]', {
              'min-w-56': type === 'bank',
            })}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
