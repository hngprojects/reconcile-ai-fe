import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";
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
                <a href="/" className="text-white">Home</a>
                
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
                            <a href="/small-business" className="text-[#333333]">Small Business Owner</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <a href="/enterprise" className="text-[#333333]">Enterprise</a>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <a href="/blog" className="text-white">Blog</a>
                <a href="/pricing" className="text-white">Pricing</a>
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
