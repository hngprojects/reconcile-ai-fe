"use client";

import { FC, useState } from "react";
import { useAuth } from "@/src/components/context/AuthContext";
import GoogleAuthModal from "@/src/components/modal/GoogleAuthModal";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

const UserAction: FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const getUserInitials = (name?: string) => {
    if (!name) return "G";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <div className="flex items-center gap-1 sm:gap-3">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2">
              <div className="flex items-center justify-center bg-gray-100 text-[#297B65] size-12 text-xl rounded-full">
                <p>{getUserInitials(user?.name)}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={logout} className="text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            type="button"
            className="bg-[#297B65] cursor-pointer py-2 px-4 text-nowrap 
                     rounded-md font-semibold justify-center items-center h-12 
                     sm:w-56 text-sm text-white hover:bg-[#297B65]/90 flex"
            onClick={() => setShowAuthModal(true)}
          >
            Get Started
          </button>
        )}
      </div>

      <GoogleAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default UserAction;
