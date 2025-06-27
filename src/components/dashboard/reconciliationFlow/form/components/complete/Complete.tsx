"use client"
import { useRouter } from 'next/navigation'
import { CheckCircleIcon, FileChartIcon } from '@/components/Icon/Icons'
import CompleteSummaryCards from './CompleteSummaryCards'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

const Complete = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div>
        <div className="w-fit rounded-full bg-[#ECFDF3] p-4">
          <CheckCircleIcon className="size-14" />
        </div>
      </div>
      <div className="space-y-2 text-center">
        <h3 className="text-2xl font-semibold">Reconciliation Complete!</h3>
        <p className="text-[#475467] dark:text-white/80">
          You have successfully reconciled your bank transactions with your
          ledger entries
        </p>
      </div>
      <CompleteSummaryCards />
      <div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            type="button"
            className="h-12 cursor-pointer"
            onClick={() => router.push('/dashboard/ledger')}
          >
            <FileChartIcon className="size-5 text-black/60 dark:text-white" />
            <span>View in Ledger</span>
          </Button>
          <Button type="button" className="h-12 cursor-pointer">
            <Download className="size-5 text-white dark:text-[#138754]" />
            <span>Export Summary Report</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Complete
