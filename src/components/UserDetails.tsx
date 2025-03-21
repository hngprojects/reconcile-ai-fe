import { ChevronUp, ChevronDown, CreditCard, Settings } from "lucide-react";
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
import { User } from "@/src/types/auth";
import { signOut } from "next-auth/react";

export default function UserDetails() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const getUserInitials = (name: string) => {
    return name[0].toUpperCase();
  };

  return (
    <div className="flex items-center gap-1 sm:gap-3">
      <DropdownMenu onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-1 sm:gap-3 cursor-pointer">
            <div className="flex items-center justify-center bg-gray-100 text-[#297B65] size-10 text-xl rounded-full">
              {(user as User)?.image ? (
                <Image
                  src={(user as User)?.image as string}
                  alt={(user as User).name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <p>{getUserInitials((user as User).name)}</p>
              )}
            </div>
            <p className="text-[#297b65]">
              {open ? <ChevronUp /> : <ChevronDown />}
            </p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute right-[-28px] top-[12px] min-w-[180px]">
          <DropdownMenuItem className="hover:bg-[#eaf5f1] cursor-pointer px-4 py-3 transition-colors">
            <Link
              href="/manage-plan"
              className="flex gap-3 items-center text-[#101828] w-full"
            >
              <CreditCard className="w-4 h-4" />
              <p>Manage Plan</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-[#eaf5f1] cursor-pointer px-4 py-3 transition-colors">
            <Link
              href="/dashboard"
              className="flex gap-3 items-center text-[#101828] w-full"
            >
              <Settings className="w-4 h-4" />
              <p>Manage Profile</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-red-100 cursor-pointer px-4 py-3 transition-colors">
            <div
              className="text-red-600 flex gap-2 items-center w-full"
              onClick={() => signOut()}
            >
              <LogOut className="text-red-600" />
              <p>Log out</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  );
}
