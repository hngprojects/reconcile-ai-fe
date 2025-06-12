'use client'

import { useEffect, useState } from 'react'
import { Download, Plus, Upload } from 'lucide-react'
import { parse } from 'date-fns'
import { Button } from '@/components/ui/button'
import FilterComponent from './LedgerFilter'
import LedgerTable from './LedgerTable'
import { AddLedgerEntryModal } from './modals/AddLedgerEntryModal'
import UploadLedgerCSVDialog from './modals/UploadLedgerCSVDialog'
import { DateRange } from 'react-day-picker'
import { fetchLedgerEntries } from '@/lib/api' // ✅ your real API function
import SiteLoader from '@/components/site-loader'

interface LedgerEntry {
  date: string
  description: string
  amount: number
  paid: number
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

  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadLedgerEntries = async () => {
      try {
        const res = await fetchLedgerEntries()
        if (res.status_code === 200) {
          setLedgerEntries(res.data)
        } else {
          setError(res.message || 'Failed to load data')
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    loadLedgerEntries()
  }, [])

  const parseDate = (dateStr: string) => {
    try {
      return parse(dateStr, 'MMM d, yyyy', new Date())
    } catch {
      return new Date(0)
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

  const filteredData = filterData(ledgerEntries)

  if (loading) return <SiteLoader/>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>

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
              className="border-primary text-primary flex gap-2 rounded-lg px-4 py-2 text-sm font-medium"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Entry
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary flex gap-2 rounded-lg px-4 py-2 text-sm font-medium"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Upload className="h-4 w-4" />
              Upload CSV
            </Button>
            <Button className="bg-primary text-white flex gap-2 rounded-lg px-4 py-2 text-sm">
              <Download className="h-4 w-4" />
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
          generalData={filteredData}
          vendorsData={[]} // optionally categorize if needed
          customersData={[]} // optionally categorize if needed
        />
      </div>
      <AddLedgerEntryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <UploadLedgerCSVDialog
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  )
}
