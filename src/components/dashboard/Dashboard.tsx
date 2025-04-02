'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import SiteLoader from '../site-loader'
import { useReconcilations } from '@/app/queries'
import { FilterDropdown } from './FilterDropdown'
import { DashboardInfoCards } from './DashboardInfoCards'
import ReconciliationHistory, { EmptyState } from './ReconciliationHistory'

export const Dashboard = () => {
  const { isPending, isError } = useReconcilations()

  return isPending ? (
    <SiteLoader />
  ) : isError ? (
    <EmptyState />
  ) : (
    <div className="flex flex-col gap-3">
      <DashboardInfoCards />
      <div className="mb-3 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <FilterDropdown />
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

      <ReconciliationHistory />
    </div>
  )
}
