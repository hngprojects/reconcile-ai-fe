'use client'

import { UserNav } from './user-nav'
import { ModeToggle } from '@/components/mode-toggle'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function Header() {
  return (
    <header className="bg-background dark:border-border/40 sticky top-0 z-10 w-full border-b">
      <div className="flex h-16 items-center gap-4 px-6">
        <SidebarTrigger className="cursor-pointer" />
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
