'use client'

import { useReconcilationsById } from '@/app/queries'
import { DotIcon, ExportIcon } from '@/components/Icon/Icons'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import { ArrowLeft, Check } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import SummaryCards from './components/SummaryCards'
import SummaryTabs from './components/SummaryTabs'

const ReconciliationSummary = () => {
  const params = useParams()
  const reconciliationId = params.id as string
  const { isLoading, data, error } = useReconcilationsById(reconciliationId)
  const router = useRouter()

  if (isLoading && !data) {
    return (
      <div className="flex min-h-[80dvh] w-full items-center justify-center overflow-hidden bg-white transition-colors dark:bg-transparent">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    )
  }

  if (data === null) {
    return <div className="text-red-500">No reconciliation summary found.</div>
  }

  if (error) {
    return (
      <div className="text-red-500">
        An error occurred while fetching the reconciliation summary.
      </div>
    )
  }

  const status = data?.summary.status.toLowerCase()

  return (
    !!data && (
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
            <h3 className="text-xl font-semibold text-black md:text-2xl">
              Reconciliation Summary
            </h3>
            <div className="flex w-fit items-center justify-center gap-1 font-light text-black">
              <span className="font-medium">
                {data?.summary.project_name || 'Business'}
              </span>
              <DotIcon className="size-2 text-black" />
              <span>
                {formatDate(
                  data?.summary.created_at ||
                    ('2025-05-03T23:59:46.000000Z' as string)
                )}
              </span>
            </div>
            <div className="flex flex-col gap-2 font-light sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                Status:
                <span
                  className={cn(
                    'text-primary flex w-fit items-center justify-center gap-1 rounded-2xl bg-[#ECFDF3] px-2 py-0.5 text-xs font-medium',
                    {
                      'bg-[#ECFDF3] text-[#2e604a]': status === 'completed',
                      'bg-[#FBF4EC] text-[#d28e3d]': status === 'draft',
                    }
                  )}
                >
                  {status === 'complete' ? (
                    <Check className="size-3 stroke-3 text-inherit" />
                  ) : (
                    <div className="mr-1 h-2 w-2 rounded-full bg-[#d28e3d]" />
                  )}

                  <span
                    className={`text-sm ${status === 'completed' ? 'text-[#2e604a]' : 'text-[#d28e3d]'}`}
                  >
                    {status}
                  </span>
                </span>
              </div>

              <div>
                Date Reconciled:{' '}
                {formatDate(data?.summary.updated_at as string)}
              </div>
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
  )
}

export default ReconciliationSummary
