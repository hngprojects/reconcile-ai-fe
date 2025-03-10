import { ChevronUp, ChevronDown } from 'lucide-react';
import { useAuth } from "@/src/components/context/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent,
  DropdownMenuItem
} from "@/src/components/ui/dropdown-menu";
import { useState } from "react";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { User } from "@/src/types/auth";

export default function UserDetails() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  return (
      <div className="flex items-center gap-1 sm:gap-3">
          <div className="flex items-center justify-center bg-gray-100 text-[#297B65] size-10 text-xl rounded-full">
            <Image
              src={(user as User).avatar}
              alt={(user as User).name}
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p onClick={() => setOpen(true)} className="text-[#297b65]">
              { open ?  (<ChevronUp />) : (<ChevronDown />)}
              </p>
            </DropdownMenuTrigger>
              <DropdownMenuContent className="absolute right-[-28px] top-[12px]">
                <DropdownMenuItem>
                  <div className="text-red-600 flex gap-2 items-center" onClick={() => logout()}>
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
