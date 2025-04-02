'use client'

import { cn } from "@/lib/utils"
import { LogoIcon } from "@/components/Icon/Icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  FileStack,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Header } from "./header"

const sidebarLinks = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard'
  },
  {
    icon: BookOpen,
    label: 'Ledger',
    href: '/ledger'
  },
  {
    icon: FileStack,
    label: 'Reconciliation', 
    href: '/reconciliation'
  },
  {
    icon: BarChart3,
    label: 'Reports',
    href: '/reports'
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/settings'
  },
  {
    icon: HelpCircle,
    label: 'Support',
    href: '/support'
  }
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="dark:border-r dark:border-border/40">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 px-6 py-4">
          <LogoIcon className="size-9" />
          <span className="font-baloo text-primary text-xl font-extrabold dark:text-primary/90">
            ReconXi
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <nav className="space-y-2 px-4">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    pathname === link.href && "bg-primary/10 text-primary dark:bg-primary/20"
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

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Header />
          <main className="flex-1 p-6">
            {children}
          </main>
        </SidebarInset>
    </SidebarProvider>
  </div>
  )
}