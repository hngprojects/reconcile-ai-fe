'use client'

import { UserNav } from "./user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b dark:border-border/40">
      <div className="flex h-16 items-center gap-4 px-6">
        <SidebarTrigger />
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}