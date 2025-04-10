import { SearchIcon } from 'lucide-react'
import DropdownFilter from '../../DropdownFilter'

interface FiltersProps {
  searchTerm: string
  selectedAccount: string
  selectedLedger: string
  onSearchChange: (value: string) => void
  onAccountChange: (value: string) => void
  onLedgerChange: (value: string) => void
}

export default function Filters({
  searchTerm,
  selectedAccount,
  selectedLedger,
  onSearchChange,
  onAccountChange,
  onLedgerChange,
}: FiltersProps) {
  return (
    <div className="flex items-center gap-2">
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

      <div className="relative overflow-hidden">
        <DropdownFilter
          options={[
            'All Accounts',
            'First Bank',
            'Access Bank',
            'Sterling Bank',
          ]}
          selected={selectedAccount}
          onSelect={onAccountChange}
        />
      </div>
      <div className="relative overflow-hidden">
        <DropdownFilter
          options={['All Ledgers', 'Office Rent Payment', 'Inventory Purchase']}
          selected={selectedLedger}
          onSelect={onLedgerChange}
        />
      </div>
    </div>
  )
}
