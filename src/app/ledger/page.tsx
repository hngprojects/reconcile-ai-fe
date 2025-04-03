import { Suspense } from 'react'
import SiteLoader from '@/components/site-loader'
import { getQueryClient } from '@/actions/get-query-client'
import { get_reconcilations } from '@/actions/reconcilation-server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import DashboardLayout from '@/components/dashboard/layout/app-sidebar'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Ledger } from '@/components/ledgers/Ledger'

export default async function LedgerPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['reconcilations'],
    queryFn: get_reconcilations,
  })

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="dark:bg-background">
        <DashboardLayout>
          <Suspense fallback={<SiteLoader />}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <Ledger />
            </HydrationBoundary>
          </Suspense>
        </DashboardLayout>
      </div>
    </ThemeProvider>
  )
}
