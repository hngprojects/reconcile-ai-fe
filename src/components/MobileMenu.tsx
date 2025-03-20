import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "./ui/dropdown-menu";
import Image from "next/image";

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

        <div className="flex flex-col gap-2">
        <div className="items-center gap-x-[17px] ">
                
                <Link href="/" className="text-white">Home</Link>
                
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer flex items-center gap-1">
                        <p className="text-white">Solution</p>
                        <Image
                                    src="/assets/images/linkscopy.svg"
                                    className=""
                                    alt="My Image"
                                    width={12}
                                    height={16}
                                />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                        <Link href="/small-businesses">Small Business Owner</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                        <Link href="/enterprise">Enterprise</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Link href="/blog" className="text-white">Blog</Link>
                <Link href="/pricing" className="text-white">Pricing</Link>

            </div>
          <button
            type="button"
            onClick={onLogin}
            className="w-[100px] h-[44px] border-2 border-[#EAEFED] text-[#EAEFED] rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/10 cursor-pointer"
            aria-label="Login"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onSignup}
            className="w-[100px] h-[44px]  bg-white text-[#2E604A] rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/90 cursor-pointer"
            aria-label="Sign up"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
