import { ChevronUp, ChevronDown, CreditCard, Menu } from "lucide-react";
import { useAuth } from "@/src/components/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/src/components/ui/dropdown-menu";
import { Dispatch, SetStateAction, useState } from "react";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/src/types/auth";

type TUserDetails = {
  showMobileMenu: boolean;
  setShowMobileMenu: Dispatch<SetStateAction<boolean>>;
}

export default function UserDetails({showMobileMenu, setShowMobileMenu}: TUserDetails) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const getUserInitials = (name: string) => {
    return name[0].toUpperCase();
  };

  return (
    <div className="flex items-center gap-1 sm:gap-3">
      <div className="flex items-center justify-center bg-gray-100 text-[#297B65] size-10 text-xl rounded-full">
        {(user as User).avatar ? (
          <div className="flex items-center gap-2">
            <Image
              src={(user as User).avatar}
              alt={(user as User).name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <button
            type="button"
            onClick={() => setShowMobileMenu(true)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            aria-label="Open mobile menu"
            aria-expanded={showMobileMenu}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        ) : (
          <p>{getUserInitials((user as User).name)}</p>
        )}
      </div>
      <div>
        <DropdownMenu onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <p className="text-[#297b65] cursor-pointer">
              {open ? <ChevronUp /> : <ChevronDown />}
            </p>
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
            <DropdownMenuItem className="hover:bg-red-100 cursor-pointer px-4 py-3 transition-colors">
              <div
                className="text-red-600 flex gap-2 items-center w-full"
                onClick={logout}
              >
                <LogOut className="text-red-600" />
                <p>Log out</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
