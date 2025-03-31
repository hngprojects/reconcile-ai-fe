'use client'

import { fetchReconciliationHistory } from '@/lib/api'
import { ReconciliationHistoryType } from '@/types/reconciliation'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DashboardInfoCards } from './DashboardInfoCards'
import { FilterDropdown } from './FilterDropdown'
import ReconciliationHistory from './ReconciliationHistory'

export const Dashboard = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
  const [toDate, setToDate] = useState<Date | undefined>(undefined)
  const [isFilterApplied, setIsFilterApplied] = useState(false)
  const [reconciliations, setReconciliations] = useState<
    ReconciliationHistoryType[]
  >([])

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchReconciliationHistory()
      setReconciliations(res.data.reverse() as ReconciliationHistoryType[])
    }

    fetch()

    const intervalId = setInterval(fetch, 3000)

    return () => clearInterval(intervalId)
  }, [])

  const handleResetFilter = () => {
    setFromDate(undefined)
    setToDate(undefined)
    setIsFilterApplied(false)
  }

  const handleApplyFilter = () => {
    setIsFilterApplied(true)
  }

  return (
    <div className="flex flex-col gap-3">
      <DashboardInfoCards />

      {/* Filter */}
      <div className="mb-3 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <FilterDropdown
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
          onReset={handleResetFilter}
          onApply={handleApplyFilter}
          onClear={handleResetFilter}
        />
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold">Reconciliation History</h2>
        <Link
          href="/file-upload"
          className="bg-primary hover:bg-primary/90 flex h-12 cursor-pointer items-center justify-center rounded-md border px-10 text-sm font-medium text-white"
        >
          <Plus className="mr-2 !size-5" /> Upload Files
        </Link>
      </div>

      {/* <ReconciliationHistoryTable /> */}
      <ReconciliationHistory
        fromDate={fromDate}
        toDate={toDate}
        isFilterApplied={isFilterApplied}
        reconciliations={reconciliations}
      />
    </div>
  )
}
