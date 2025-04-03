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
    <div className="flex flex-col items-start justify-between gap-4 self-stretch lg:flex-row lg:items-center">
      <h1 className="font-inter text-[20px] font-medium text-black">
        Reconciliation History
      </h1>
      <div className="flex flex-col items-start gap-2 max-xl:w-full lg:flex-row lg:items-center">
        <div className="flex h-12 w-full items-center gap-2 rounded-lg border border-black/20 px-6 py-4 lg:w-[295px]">
          <SearchIcon className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="font-[Plus Jakarta Sans] overflow-hidden border-none text-base font-light text-ellipsis text-black outline-none"
          />
        </div>
        <div className="flex items-center gap-2 max-lg:w-full">
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
