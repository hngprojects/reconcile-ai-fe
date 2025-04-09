import SummaryCards from './SummaryCards'
import ReconciliationTable from './ReconciliationTable'
import { Plus } from 'lucide-react'

import Link from 'next/link'

export default function ReconDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col items-start gap-2">
          <h1 className="font-inter text-2xl font-semibold text-black">
            Bank Reconciliation
          </h1>
          <p className="font-inter text-base font-light text-black">
            Review past reconciliations or start a new one
          </p>
        </div>

        <Link
          href="/dashboard/reconciliation-flow"
          className="bg-primary hover:bg-primary/90 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium whitespace-nowrap text-white"
        >
          <Plus className="!size-5" /> Start New Reconciliation
        </Link>
      </div>
      <SummaryCards />

      <ReconciliationTable />
    </div>
  )
}
