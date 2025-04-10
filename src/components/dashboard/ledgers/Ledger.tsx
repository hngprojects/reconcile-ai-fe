'use client'

import { useState } from 'react'
import { Download, Plus, Upload } from 'lucide-react'
import { parse } from 'date-fns'
import { Button } from '@/components/ui/button'
import FilterComponent from './LedgerFilter'
import LedgerTable from './LedgerTable'
import AddLedgerEntryModal from './modals/AddLedgerEntryModal'
import UploadLedgerCSVDialog from './modals/UploadLedgerCSVDialog'
import { DateRange } from 'react-day-picker'
import {
  generalData as mockGeneralData,
  vendorsData as mockVendorsData,
  customersData as mockCustomersData,
} from '@/mocks/mockdata' // Adjust import path as needed

interface LedgerEntry {
  date: string
  description: string
  amount: number
  reconciled: boolean
  bankReference: string
}
export function Ledger() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const [selectedStatus, setSelectedStatus] = useState('all')

  const handleUpload = (file: File) => {
    console.log('CSV file uploaded:', file)
    // Implement actual upload logic here
  }

  const handleSave = (data: unknown) => {
    console.log('Ledger entry saved:', data)
    // Implement actual save logic here
  }

  const parseDate = (dateStr: string) => {
    try {
      return parse(dateStr, 'MMM d, yyyy', new Date())
    } catch {
      console.error('Error parsing date:', dateStr)
      return new Date(0) // Return epoch date as fallback
    }
  }

  const filterData = <T extends LedgerEntry>(data: T[]): T[] => {
    return data.filter((item) => {
      const description = item.description || ''
      const matchesSearch = description
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

      const itemDate = parseDate(item.date)

      const isWithinDateRange =
        (!dateRange?.from || itemDate >= dateRange.from) &&
        (!dateRange?.to || itemDate <= dateRange.to)

      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'reconciled' && item.reconciled) ||
        (selectedStatus === 'pending' &&
          !item.reconciled &&
          item.bankReference) ||
        (selectedStatus === 'failed' && !item.reconciled && !item.bankReference)

      return matchesSearch && isWithinDateRange && matchesStatus
    })
  }

  const filteredGeneralData = filterData(mockGeneralData)
  const filteredVendorsData = filterData(mockVendorsData)
  const filteredCustomersData = filterData(mockCustomersData)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-inter text-xl leading-5 font-semibold tracking-tight">
              Ledgers
            </h1>
            <p className="font-inter text-base leading-none font-normal">
              View and manage your accounting ledger entries
            </p>
          </div>
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              className="border-primary dark:border-primary/40 text-primary dark:text-primary flex flex-1 cursor-pointer gap-2 rounded-lg border bg-transparent px-4 py-2 text-sm font-medium shadow-none"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Entry
            </Button>
            <Button
              variant="outline"
              className="border-primary dark:border-primary/40 text-primary dark:text-primary flex flex-1 cursor-pointer gap-2 rounded-lg border bg-transparent px-4 py-2 text-sm font-medium shadow-none"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Upload className="h-4 w-4" />
              Upload CSV
            </Button>
            <Button className="bg-primary hover:bg-primary/90 flex-1 cursor-pointer text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-green-800 dark:hover:bg-green-700">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        <FilterComponent
          onSearch={setSearchQuery}
          onDateRangeChange={setDateRange}
          onStatusChange={setSelectedStatus}
        />
      </div>
      <div>
        <LedgerTable
          generalData={filteredGeneralData}
          vendorsData={filteredVendorsData}
          customersData={filteredCustomersData}
        />
      </div>
      <AddLedgerEntryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSave}
      />
      <UploadLedgerCSVDialog
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  )
}
