import {
  ChevronUp,
  ChevronDown,
  CreditCard,
  User,
  ClockIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { useAuth } from "@/src/components/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/src/components/ui/dropdown-menu";
import { useState } from "react";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { User as TUser } from "@/src/types/auth";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";

export default function UserDetails() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const getUserInitials = (name: string) => {
    return name[0].toUpperCase();
  };

  return (
    <ProtectedRoute>
      <div className="flex items-center gap-1 sm:gap-3">
        <DropdownMenu onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-1 sm:gap-3 cursor-pointer">
              <div className="flex items-center justify-center bg-gray-100 text-[#297B65] size-10 text-xl rounded-full">
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
              <p className="text-[#297b65]">
                {open ? <ChevronUp /> : <ChevronDown />}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute right-[-28px] top-[12px] min-w-[180px] p-1">
          <Link href="/dashboard" className="block w-full">
              <DropdownMenuItem className="hover:bg-[#2E604A]/10 cursor-pointer px-4 py-3 transition-colors rounded-md">
                <div className="flex gap-3 items-center text-[#101828] w-full">
                  <LayoutDashboardIcon className="w-4 h-4 text-[#2E604A]" />
                  <p>Dashboard</p>
                </div>
              </DropdownMenuItem>
            </Link>

            <Link href="/manage-plan" className="block w-full">
              <DropdownMenuItem className="hover:bg-[#2E604A]/10 cursor-pointer px-4 py-3 transition-colors rounded-md">
                <div className="flex gap-3 items-center text-[#101828] w-full">
                  <CreditCard className="w-4 h-4 text-[#2E604A]" />
                  <p>Manage Plan</p>
                </div>
              </DropdownMenuItem>
            </Link>

            <Link href="/billing-history" className="block w-full">
              <DropdownMenuItem className="hover:bg-[#2E604A]/10 cursor-pointer px-4 py-3 transition-colors rounded-md">
                <div className="flex gap-3 items-center text-[#101828] w-full">
                  <ClockIcon className="w-4 h-4 text-[#2E604A]" />
                  <p>Plan & Billing</p>
                </div>
              </DropdownMenuItem>
            </Link>

            <Link href="/profile" className="block w-full">
              <DropdownMenuItem className="hover:bg-[#2E604A]/10 cursor-pointer px-4 py-3 transition-colors rounded-md">
                <div className="flex gap-3 items-center text-[#101828] w-full">
                  <User className="w-4 h-4 text-[#2E604A]" />
                  <p>Manage Profile</p>
                </div>
              </DropdownMenuItem>
            </Link>

            <button className="block w-full" onClick={logout}>
              <DropdownMenuItem className="hover:bg-red-100 cursor-pointer px-4 py-3 transition-colors rounded-md mt-1">
                <div className="text-red-600 flex gap-2 items-center w-full">
                  <LogOut className="w-4 h-4" />
                  <p>Log out</p>
                </div>
              </DropdownMenuItem>
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ProtectedRoute>
  );
}
