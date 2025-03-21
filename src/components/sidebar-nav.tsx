import type React from "react"
import Link from "next/link"
import { LayoutDashboard, Settings} from "lucide-react"

export default function SidebarNav() {
  return (
    <aside className="hidden md:block border-r w-16 md:w-60 shrink-0 overflow-y-auto h-screen bg-white">

      {/* Navigation */}
      <nav className="py-4 space-y-1">
        <NavItem href="/settings" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavItem href="/#" icon={<Settings size={20} /> } label="Profile Management" active />
      </nav>
    </aside>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}

function NavItem({ href, icon, label, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2.5 ${active ? "bg-gray-100 text-teal-600 border-r-2 border-teal-600" : "text-gray-700 hover:bg-gray-100"}`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="ml-3 hidden md:block">{label}</span>
    </Link>
  )
}

