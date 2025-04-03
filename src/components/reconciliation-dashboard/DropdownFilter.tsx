import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function DropdownFilter({
  options,
  selected,
  onSelect,
}: {
  options: string[]
  selected: string
  onSelect: (value: string) => void
}) {
  return (
    <Select value={selected} onValueChange={(value) => onSelect(value)}>
      <SelectTrigger className="flex [height:48px_!important] w-[122px] items-center gap-1 rounded-lg border border-black/20 p-3">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="absolute top-full z-10 mt-1 w-[200px]">
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className="[height:48px_!important]"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
