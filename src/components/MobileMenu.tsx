import { ChevronDown, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
}

const MobileMenu = ({
  isOpen,
  onClose,
  onLogin,
  onSignup,
}: MobileMenuProps) => {

  const pathname = usePathname();

  console.log("pathname", pathname)

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      className={cn(
        "fixed inset-0 bg-[#2E604A] z-50 transform transition-transform duration-300",
        isOpen ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="p-4 flex flex-col h-full">
        <button
          type="button"
          onClick={onClose}
          className="self-end p-2 text-white hover:bg-gray-100 rounded-full cursor-pointer"
          aria-label="Close mobile menu"
        >
          <X className="h-12 w-12" />
        </button>

        <div className="flex flex-col justify-between flex-1 gap-4">
          <nav className="gap-6 flex flex-col">
            <Link className={cn("font-medium text-2xl text-white/80", pathname === "/" && "text-white")} href="/">Home</Link>
            <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
                <span className="text-white/80 text-2xl">Industries</span>
                <ChevronDown className="w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-white/80 text-2xl bg-[#214435]">
                <DropdownMenuItem>
                  <Link className={cn("font-medium text-white/80 text-2xl", pathname === "/small-business" && "text-white")} href="/small-business">Small Business owner</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className={cn("font-medium text-white/80 text-2xl", pathname === "/enterprise" && "text-white")} href="/enterprise">Enterprise</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className={cn("font-medium text-white/80 text-2xl", pathname === "/financial-professionals" && "text-white")} href="/financial-professionals">Financial Professionals</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className={cn("font-medium text-white/80 text-2xl", pathname === "/school-and-education" && "text-white")} href="/school-and-education">Schools & Educational Institutions</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
            <Link className={cn("font-medium text-white/80 text-2xl", pathname === "/blog" && "text-white")} href="/blog">Blog</Link>
            <Link className={cn("font-medium text-white/80 text-2xl", pathname === "/pricing" && "text-white")} href="/pricing">Pricing</Link>
          </nav>

        <div className="flex items-center gap-4 w-full">

          <button
            type="button"
            onClick={onLogin}
            className="w-full max-w-[280px] h-[44px] border-2 border-[#EAEFED] text-[#EAEFED] rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/10 cursor-pointer"
            aria-label="Login"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onSignup}
            className="w-full max-w-[280px] h-[44px] bg-white text-[#2E604A] rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/90 cursor-pointer"
            aria-label="Sign up"
          >
            Sign up
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
