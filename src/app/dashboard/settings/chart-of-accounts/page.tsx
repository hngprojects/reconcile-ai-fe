import { get_all_chart_account_categories } from '@/actions/chartOfAccounts'
import { getQueryClient } from '@/actions/get-query-client'
import ChartOfAccounts from '@/components/dashboard/settings/chart-of-accounts/ChartOfAccounts'
import SiteLoader from '@/components/site-loader'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'

export default async function ChartsOfAccountsPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['chart_account_categories'],
    queryFn: get_all_chart_account_categories,
  })

  return (
    <Suspense fallback={<SiteLoader />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ChartOfAccounts />
      </HydrationBoundary>
    </Suspense>
  )
}
