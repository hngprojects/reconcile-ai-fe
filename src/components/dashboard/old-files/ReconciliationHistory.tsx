import Image from 'next/image'
import { ReconciliationHistoryCard } from './ReconcilaitionHistoryCard'
import { ReconciliationHistoryTable } from './ReconciliationHistoryTable'
import Link from 'next/link'

export default function ReconciliationHistory() {
  return (
    <div>
      <div className="max-md:hidden">
        <ReconciliationHistoryTable />
      </div>

      <div className="md:hidden">
        <ReconciliationHistoryCard />
      </div>
    </div>
  )
}

export const EmptyState = () => {
  return (
    <div className="mt-12 mb-20 flex flex-col items-center gap-6">
      <div>
        <div className="flex items-center justify-center">
          <Image
            src="/assets/images/no_billing.png"
            alt="No Pending Activity"
            width={350}
            height={270}
            className=""
            quality={75}
            priority={true}
          />
        </div>
        <div className="flex max-w-md flex-col items-center gap-1">
          <h5 className="text-2xl font-medium">No Pending Activity</h5>
          <p className="text-center text-[#333333]">
            It looks like you haven&apos;t made started reconciling. Once you
            do, you&apos;ll see there progress here.
          </p>
          <Link
            href="/file-upload"
            className="hover:bg-accent text-primary hover:text-primary border-primary mt-4 flex h-10 w-full cursor-pointer items-center justify-center rounded-md border text-sm font-medium"
          >
            Start Reconciliation
          </Link>
        </div>
      </div>
    </div>
  )
}
