'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from '@/actions/get-query-client'
import { Toaster } from 'sonner'

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={false}
        position="left"
        buttonPosition="top-left"
      />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  )
}
