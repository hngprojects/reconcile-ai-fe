import { getQueryClient } from '@/actions/get-query-client'
import { get_reconcilations_by_id } from '@/actions/reconcilation-server'
import Container from '@/components/Container'
import { View } from '@/components/reconciliation/views/View'
import SiteLoader from '@/components/site-loader'
import { Params } from '@/types/global'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Suspense } from 'react'

export default async function ReconciliationPage({
  params,
}: {
  params: Params
}) {
  const id = (await params).id
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['reconcilations_by_id'],
    queryFn: () => get_reconcilations_by_id(id),
  })
  return (
    <Suspense fallback={<SiteLoader />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Container>
          <View id={id as string} />
        </Container>
      </HydrationBoundary>
    </Suspense>
  )
}
