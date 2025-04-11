'use client'

import { DotIcon, ExportIcon } from '@/components/Icon/Icons'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check } from 'lucide-react'
import SummaryCards from './components/SummaryCards'
import SummaryTabs from './components/SummaryTabs'
import { useRouter } from 'next/navigation'

const ReconciliationSummary = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-7">
      <div>
        <Button
          type="button"
          onClick={() => router.back()}
          variant="link"
          className="cursor-pointer p-0 text-black hover:no-underline has-[>svg]:px-0"
        >
          <ArrowLeft className="size-6" />
        </Button>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col justify-start gap-1.5">
          <h3 className="text-2xl font-semibold text-black">
            Reconciliation Summary
          </h3>
          <div className="flex w-fit items-center justify-center gap-1 font-light text-black">
            <span className="font-medium">Union Business</span>
            <DotIcon className="size-2 text-black" />
            <span>Mar 2025</span>
          </div>
          <div className="flex items-center gap-2 font-light">
            <div className="flex items-center gap-2">
              Status:
              <span
                className={`text-primary flex w-fit items-center justify-center gap-1 rounded-2xl bg-[#ECFDF3] px-2 py-0.5 text-xs font-medium`}
              >
                <Check className="size-3 stroke-3 text-inherit" />
                Completed
              </span>
            </div>
            <div>Date Reconciled: 2025-04-01</div>
          </div>
        </div>
        <Button size="lg" className="cursor-pointer">
          <ExportIcon />
          <span>Export</span>
        </Button>
      </div>
      <SummaryCards />
      <SummaryTabs />
    </div>
  )
}

export default ReconciliationSummary
