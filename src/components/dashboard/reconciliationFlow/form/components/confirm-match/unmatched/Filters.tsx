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
      <div className="border-input flex h-12 w-[295px] items-center gap-2 rounded-lg border px-6 py-4">
        <SearchIcon className="text-muted-foreground h-4 w-4" />
        <input
          type="text"
          placeholder="Search transactions"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="text-foreground placeholder:text-muted-foreground w-full border-none bg-transparent text-base outline-none"
        />
      </div>

      <DropdownFilter
        options={['All Accounts', 'First Bank', 'Access Bank', 'Sterling Bank']}
        selected={selectedAccount}
        onSelect={onAccountChange}
      />
      <DropdownFilter
        options={['All Ledgers', 'Office Rent Payment', 'Inventory Purchase']}
        selected={selectedLedger}
        onSelect={onLedgerChange}
      />
    </div>
  )
}
