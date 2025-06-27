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

  selectedAccount,
  selectedLedger,

  onAccountChange,
  onLedgerChange,
}: FiltersProps) {
  return (
    <div className="flex items-center gap-2">
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
