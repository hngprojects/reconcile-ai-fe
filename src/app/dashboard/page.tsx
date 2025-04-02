import { Suspense } from 'react'
import Container from '@/components/Container'
import SiteLoader from '@/components/site-loader'
import { getQueryClient } from '@/actions/get-query-client'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { get_reconcilations } from '@/actions/reconcilation-server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export default async function DashboardPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['reconcilations'],
    queryFn: get_reconcilations,
  })

  return (
    <Suspense fallback={<SiteLoader />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Container className="my-8">
          <Dashboard />
        </Container>
      </HydrationBoundary>
    </Suspense>
  )
}
