import SummaryCards from './SummaryCards'
import ReconciliationTable from './ReconciliationTable'
import { Plus } from 'lucide-react'

import Link from 'next/link'

export default function ReconDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start gap-2">
          <h1 className="font-inter text-2xl font-semibold text-black">
            Bank Reconciliation
          </h1>
          <p className="font-inter text-base font-light text-black">
            Review past reconciliations or start a new one
          </p>
        </div>
        <Link
          href="/file-upload"
          className="bg-primary hover:bg-primary/90 flex h-12 cursor-pointer items-center justify-center rounded-md border px-10 text-sm font-medium text-white"
        >
          <Plus className="mr-2 !size-5" /> Start New Reconciliation
        </Link>
      </div>
      <SummaryCards />
      <ReconciliationTable />
    </div>
  )
}
