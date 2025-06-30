import { Suspense } from 'react'
import SiteLoader from '@/components/site-loader'
import { getQueryClient } from '@/actions/get-query-client'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { get_dashboard_analytics } from '@/actions/user'

export default async function DashboardPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['analytics'],
    queryFn: get_dashboard_analytics,
  })

  return (
    <Suspense fallback={<SiteLoader />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Dashboard />
      </HydrationBoundary>
    </Suspense>
  )
}
