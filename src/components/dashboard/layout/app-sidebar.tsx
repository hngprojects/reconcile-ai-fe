'use client'

import type React from 'react'

import { LogoIcon } from '@/components/Icon/Icons'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import {
  BookOpen,
  FileStack,
  LayoutDashboard,
  // BarChart3,
  Settings,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LogoIconn = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'bg-primary text-primary-foreground flex items-center justify-center rounded-md',
      className
    )}
  >
    <LogoIcon className="size-5" />
  </div>
)

const sidebarLinks = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: BookOpen,
    label: 'Ledger',
    href: '/dashboard/ledger',
  },
  {
    icon: FileStack,
    label: 'Reconciliation',
    href: '/dashboard/reconciliation',
  },
  // {
  //   icon: BarChart3,
  //   label: 'Reports',
  //   href: '/dashboard/reports',
  // },
  {
    icon: Settings,
    label: 'Settings',
    href: '/dashboard/settings',
  },
  // {
  //   icon: HelpCircle,
  //   label: 'Support',
  //   href: '/dashboard/support',
  // },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      collapsible="icon"
      className="dark:border-border/40 relative z-20 border-r"
      style={
        {
          '--sidebar-width': '240px',
          '--sidebar-width-icon': '64px',
        } as React.CSSProperties
      }
    >
      <SidebarHeader className="flex items-center px-2 py-4 pb-5">
        <Link href="/dashboard" className="flex w-full items-center gap-2 px-2">
          <LogoIconn className="size-9 shrink-0 group-data-[collapsible=icon]/sidebar-wrapper:mx-auto" />
          <span className="font-baloo text-primary dark:text-primary/90 truncate text-xl font-extrabold group-data-[collapsible=icon]/sidebar-wrapper:hidden">
            ReconXi
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="space-y-1 px-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <SidebarMenuItem key={link.href} className="flex justify-center">
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={link.label}
                  className={cn(
                    isActive && 'bg-primary/10 text-primary dark:bg-primary/20',
                    'w-full data-[collapsible=icon]:w-10 data-[collapsible=icon]:justify-center data-[collapsible=icon]:p-0'
                  )}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 data-[collapsible=icon]:justify-center"
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="data-[collapsible=icon]:hidden">
                      {link.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
