import { useState, useEffect } from 'react'
import { SearchIcon } from '../../Icon/Icons'
import DropdownFilter from './DropdownFilter'
import DateRangeDropdown from '@/components/DateRangeDropdown'
import { Input } from '@/components/ui/input'

export default function Filters({
  onFilterChange,
}: {
  onFilterChange: (filters: {
    searchTerm: string
    selectedBank: string
    selectedStatus: string
  }) => void
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBank, setSelectedBank] = useState('All Banks')
  const [selectedStatus, setSelectedStatus] = useState('All Status')

  useEffect(() => {
    onFilterChange({
      searchTerm,
      selectedBank,
      selectedStatus,
    })
  }, [searchTerm, selectedBank, selectedStatus, onFilterChange])

  return (
    <div className="flex flex-col justify-between gap-4 self-stretch xl:flex-row xl:items-center">
      <h1 className="font-inter text-[20px] font-medium text-black">
        Reconciliation History
      </h1>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex min-h-11 w-full flex-1 items-center">
          <SearchIcon className="absolute left-3 -z-10 size-6 text-gray-500" />
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="min-h-11 max-w-xs gap-3 rounded-lg border-[0.5px] pl-10 text-base font-light lg:max-w-[295px]"
          />
        </div>

        <div className="flex items-center gap-2">
          <DateRangeDropdown>Period</DateRangeDropdown>
          <DropdownFilter
            options={[
              'All Banks',
              'GTB Business',
              'Access Vendor Account',
              'Zenith POS Account',
              'UBA Business',
              'Wema Vendor Account',
              'Union Business',
              'Fidelity Business',
              'Ecobank Vendor Account',
            ]}
            selected={selectedBank}
            onSelect={(value) => setSelectedBank(value)}
            type="bank"
          />
          <DropdownFilter
            options={['All Status', 'Completed', 'Pending']}
            selected={selectedStatus}
            onSelect={(value) => setSelectedStatus(value)}
          />
        </div>
      </div>
    </div>
  )
}
