import {
  ChevronUp,
  ChevronDown,
  CreditCard,
  User,
  LayoutDashboardIcon,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { User as TUser } from '@/types/auth'
import { useSession, signOut } from 'next-auth/react'

export default function UserDetails() {
  const pathname: string = usePathname()
  const { data } = useSession()
  const user = data?.user
  const [open, setOpen] = useState(false)
  const pathNamesWithoutNavlinks: string[] = [
    '/file-upload',
    '/profile',
    '/manage-plan',
    '/reconciliation',
    '/dashboard',
    '/billing-history',
  ]

  const isPathWithoutNavlinks = pathNamesWithoutNavlinks.some((path) =>
    pathname.startsWith(path)
  )

  const getUserInitials = (name: string) => {
    return name[0].toUpperCase()
  }

  return (
    <div className="flex items-center gap-1 sm:gap-3">
      <DropdownMenu onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center gap-1 sm:gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-xl text-[#297B65]">
              {(user as TUser).avatar ? (
                <Image
                  src={(user as TUser).avatar as string}
                  alt={(user as TUser).name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <p>{getUserInitials((user as TUser).name)}</p>
              )}
            </div>
            <p
              className={`${!isPathWithoutNavlinks ? 'text-white' : 'text-[#297b65]'}`}
            >
              {open ? <ChevronUp /> : <ChevronDown />}
            </p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`${!isPathWithoutNavlinks ? 'relative top-2 left-14 min-w-[180px] p-1' : 'absolute top-[12px] right-[-28px] min-w-[180px] p-1'}`}
        >
          <Link href="/dashboard" className="block w-full">
            <DropdownMenuItem className="cursor-pointer rounded-md px-4 py-3 transition-colors hover:bg-[#2E604A]/10">
              <div className="flex w-full items-center gap-3 text-[#101828]">
                <LayoutDashboardIcon className="h-4 w-4 text-[#2E604A]" />
                <p>Dashboard</p>
              </div>
            </DropdownMenuItem>
          </Link>

          <Link href="/manage-plan" className="block w-full">
            <DropdownMenuItem className="cursor-pointer rounded-md px-4 py-3 transition-colors hover:bg-[#2E604A]/10">
              <div className="flex w-full items-center gap-3 text-[#101828]">
                <CreditCard className="h-4 w-4 text-[#2E604A]" />
                <p>Plan and Billing</p>
              </div>
            </DropdownMenuItem>
          </Link>

          {/* <Link href="/billing-history" className="block w-full">
              <DropdownMenuItem className="hover:bg-[#2E604A]/10 cursor-pointer px-4 py-3 transition-colors rounded-md">
                <div className="flex gap-3 items-center text-[#101828] w-full">
                  <ClockIcon className="w-4 h-4 text-[#2E604A]" />
                  <p>Billing History</p>
                </div>
              </DropdownMenuItem>
            </Link> */}

          <Link href="/profile" className="block w-full">
            <DropdownMenuItem className="cursor-pointer rounded-md px-4 py-3 transition-colors hover:bg-[#2E604A]/10">
              <div className="flex w-full items-center gap-3 text-[#101828]">
                <User className="h-4 w-4 text-[#2E604A]" />
                <p>Manage Profile</p>
              </div>
            </DropdownMenuItem>
          </Link>

          <button className="block w-full" onClick={() => signOut()}>
            <DropdownMenuItem className="mt-1 cursor-pointer rounded-md px-4 py-3 transition-colors hover:bg-red-100">
              <div className="flex w-full items-center gap-2 text-red-600">
                <LogOut className="h-4 w-4" />
                <p>Log out</p>
              </div>
            </DropdownMenuItem>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
