// // Filters.tsx
// import { useState, useEffect } from 'react'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Check, SearchIcon } from 'lucide-react'
// import DropdownFilter from './DropdownFilter'

// export default function Filters({
//   onFilterChange,
// }: {
//   onFilterChange: (searchTerm: string, confidenceOption: string) => void
// }) {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedConfidence, setSelectedConfidence] =
//     useState('High Confidence')

//   useEffect(() => {
//     onFilterChange(searchTerm, selectedConfidence)
//   }, [searchTerm, selectedConfidence, onFilterChange])

//   return (
//     <div className="mb-4 flex items-center justify-end gap-4">
//       <div className="relative">
//         <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
//         <Input
//           placeholder="Search transactions..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-[300px] pl-8"
//         />
//       </div>
//       <DropdownFilter
//         options={[
//           'High Confidence',
//           '90% Confidence',
//           '85% Confidence',
//           '80% Confidence',
//           '75% Confidence',
//           '70% Confidence',
//         ]}
//         selected={selectedConfidence}
//         onSelect={setSelectedConfidence}
//       />
//       <Button>
//         <Check className="mr-2 h-4 w-4" />
//         Accept High Confidence
//       </Button>
//     </div>
//   )
// }

// components/Filters.tsx
import { Check, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DropdownFilter from './DropdownFilter'

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
      <div className="flex h-12 w-[295px] items-center gap-2 rounded-lg border border-black/20 px-6 py-4">
        <SearchIcon className="h-4 w-4 text-black/60" />
        <input
          type="text"
          placeholder="Search transactions"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full border-none text-base text-black outline-none placeholder:text-black/60"
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
        className="h-12 cursor-pointer"
      >
        <Check className="size-5 text-black/60" />
        Accept High Confidence
      </Button>
    </div>
  )
}
