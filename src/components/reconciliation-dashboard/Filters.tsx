import { useState, useEffect } from 'react'
import { SearchIcon } from '../Icon/Icons'
import DropdownFilter from './DropdownFilter'

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
    <div className="flex items-center justify-between self-stretch">
      <h1 className="font-inter text-[20px] font-medium text-black">
        Reconciliation History
      </h1>
      <div className="flex items-center gap-2">
        <div className="flex h-12 w-[295px] items-center gap-2 rounded-lg border border-black/20 px-6 py-4">
          <SearchIcon className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="font-[Plus Jakarta Sans] overflow-hidden border-none text-base font-light text-ellipsis text-black outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
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
