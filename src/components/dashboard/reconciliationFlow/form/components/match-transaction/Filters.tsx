import { Check, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DropdownFilter from '../DropdownFilter'

interface FiltersProps {
  searchTerm: string
  confidenceThreshold: string
  onSearchChange: (value: string) => void
  onConfidenceChange: (value: string) => void
  onAccept: () => void
}

export default function Filters({
  searchTerm,
  confidenceThreshold,
  onSearchChange,
  onConfidenceChange,
  onAccept,
}: FiltersProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <div className="flex h-12 w-[295px] items-center gap-2 rounded-lg border border-black/20 px-6 py-4 dark:border-white/20">
        <SearchIcon className="h-4 w-4 text-black/60 dark:text-white/60" />
        <input
          type="text"
          placeholder="Search transactions"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full border-none text-base text-black outline-none placeholder:text-black/60 dark:bg-transparent dark:text-white dark:placeholder:text-white/60"
        />
      </div>

      <DropdownFilter
        options={[
          'High Confidence',
          '85% Confidence',
          '80% Confidence',
          '75% Confidence',
          '70% Confidence',
        ]}
        selected={confidenceThreshold}
        onSelect={onConfidenceChange}
      />
      <Button
        variant="outline"
        type="button"
        onClick={onAccept}
        className="h-12 cursor-pointer dark:border-white/20 dark:text-white dark:hover:bg-white/10"
      >
        <Check className="size-5 text-black/60 dark:text-white/60" />
        Accept High Confidence
      </Button>
    </div>
  )
}
