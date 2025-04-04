import { Suspense } from 'react'
import Container from '@/components/Container'
import SiteLoader from '@/components/site-loader'
import { getQueryClient } from '@/actions/get-query-client'
import { get_reconcilations } from '@/actions/reconcilation-server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Ledger } from '@/components/dashboard/ledgers/Ledger'

export default async function ReconciliationPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['reconcilations'],
    queryFn: get_reconcilations,
  })

  return (
    <Suspense fallback={<SiteLoader />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Container className="my-8">
          <Ledger />
        </Container>
      </HydrationBoundary>
    </Suspense>
  )
}
