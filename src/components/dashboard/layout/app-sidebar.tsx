'use client'

import { LogoIcon } from '@/components/Icon/Icons'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  BookOpen,
  FileStack,
  HelpCircle,
  LayoutDashboard,
  Settings,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarLinks = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: BookOpen,
    label: 'Ledger',
    href: '/ledger',
  },
  {
    icon: FileStack,
    label: 'Reconciliation',
    href: '/reconciliation-dashboard',
  },
  {
    icon: BarChart3,
    label: 'Reports',
    href: '/reports',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/settings',
  },
  {
    icon: HelpCircle,
    label: 'Support',
    href: '/support',
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="dark:border-border/40 dark:border-r">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 px-6 py-4">
          <LogoIcon className="size-9" />
          <span className="font-baloo text-primary dark:text-primary/90 text-xl font-extrabold">
            ReconXi
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <nav className="flex flex-col gap-2 px-4">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-2',
                    pathname === link.href &&
                      'bg-primary/10 text-primary dark:bg-primary/20'
                  )}
                >
                  <Icon className="size-4" />
                  <span>{link.label}</span>
                </Button>
              </Link>
            )
          })}
        </nav>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
