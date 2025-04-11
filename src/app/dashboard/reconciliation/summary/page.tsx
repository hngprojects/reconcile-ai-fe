import { Suspense } from 'react'
import SiteLoader from '@/components/site-loader'
import { getQueryClient } from '@/actions/get-query-client'
import { get_reconcilations } from '@/actions/reconcilation-server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import ReconciliationSummary from '@/components/dashboard/reconciliation-summary/ReconciliationSummary'

export default async function DashboardPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['reconcilations'],
    queryFn: get_reconcilations,
  })

  return (
    <Suspense fallback={<SiteLoader />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReconciliationSummary />
      </HydrationBoundary>
    </Suspense>
  )
}
