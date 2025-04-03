import type React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Header } from './header'
import { AppSidebar } from './app-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="relative z-10 flex-1">
          <Header />
          <ScrollArea className="h-[calc(100vh-4.2rem)]">
            <main className="flex-1 p-6">{children}</main>
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
