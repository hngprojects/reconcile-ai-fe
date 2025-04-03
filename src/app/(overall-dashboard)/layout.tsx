import { getQueryClient } from '@/actions/get-query-client'
import { get_reconcilations } from '@/actions/reconcilation-server'
import DashboardLayout from '@/components/dashboard/layout/dashboard-layout'
import SiteLoader from '@/components/site-loader'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import React, { Suspense } from 'react'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
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
      <DashboardLayout>
        <Suspense fallback={<SiteLoader />}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
          </HydrationBoundary>
        </Suspense>
      </DashboardLayout>
    </ThemeProvider>
  )
}
