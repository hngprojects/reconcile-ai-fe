import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";

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
        "fixed inset-0 bg-white z-50 transform transition-transform duration-300",
        isOpen ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="p-4 flex flex-col h-full">
        <button
          type="button"
          onClick={onClose}
          className="self-end p-2 hover:bg-gray-100 rounded-full cursor-pointer"
          aria-label="Close mobile menu"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <button
            type="button"
            onClick={onLogin}
            className="w-full max-w-[280px] h-[44px] border-2 border-[#2E604A] text-[#2E604A] rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/10 cursor-pointer"
            aria-label="Login"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onSignup}
            className="w-full max-w-[280px] h-[44px] bg-[#2E604A] text-white rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/90 cursor-pointer"
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
