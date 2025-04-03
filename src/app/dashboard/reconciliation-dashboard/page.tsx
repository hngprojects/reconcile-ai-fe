import { Suspense } from 'react'
import Container from '@/components/Container'
import SiteLoader from '@/components/site-loader'
import { getQueryClient } from '@/actions/get-query-client'
import { get_reconcilations } from '@/actions/reconcilation-server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import ReconDashboard from '@/components/reconciliation-dashboard/ReconDashboard'
import DashboardLayout from '@/components/dashboard/layout/app-sidebar'

export default async function DashboardPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['reconcilations'],
    queryFn: get_reconcilations,
  })

  return (
    <DashboardLayout>
      <Suspense fallback={<SiteLoader />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Container className="my-8">
            <ReconDashboard />
          </Container>
        </HydrationBoundary>
      </Suspense>
    </DashboardLayout>
  )
}
