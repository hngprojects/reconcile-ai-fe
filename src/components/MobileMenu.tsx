"use client";

import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
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

  const handleLinkClick = () => {
    onClose();
  };

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
            <Link
              className={cn(
                "font-medium text-2xl text-white/80 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white/80 hover:after:w-full after:transition-all after:duration-300",
                pathname === "/" && "text-white after:w-full",
              )}
              href="/"
              onClick={handleLinkClick}
            >
              Home
            </Link>

            <Accordion type="single" collapsible>
              <AccordionItem value="industries" className="border-none">
                <AccordionTrigger
                  className={cn(
                    "font-medium text-2xl text-white/80 hover:no-underline",
                    (pathname === "/small-business" ||
                      pathname === "/enterprise") &&
                      "text-white",
                  )}
                >
                  Industries
                </AccordionTrigger>
                <AccordionContent className="text-white/80 pl-4">
                  <div className="flex flex-col gap-4">
                    <Link
                      href="/small-business"
                      className={cn(
                        "text-xl hover:text-white transition-colors",
                        pathname === "/small-business" && "text-white",
                      )}
                      onClick={handleLinkClick}
                    >
                      Small Business owner
                    </Link>
                    <Link
                      href="/enterprise"
                      className={cn(
                        "text-xl hover:text-white transition-colors",
                        pathname === "/enterprise" && "text-white",
                      )}
                      onClick={handleLinkClick}
                    >
                      Enterprise
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              className={cn(
                "font-medium text-2xl text-white/80 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white/80 hover:after:w-full after:transition-all after:duration-300",
                pathname === "/blog" && "text-white after:w-full",
              )}
              href="/blog"
              onClick={handleLinkClick}
            >
              Blog
            </Link>

            <Link
              className={cn(
                "font-medium text-2xl text-white/80 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white/80 hover:after:w-full after:transition-all after:duration-300",
                pathname === "/pricing" && "text-white after:w-full",
              )}
              href="/pricing"
              onClick={handleLinkClick}
            >
              Pricing
            </Link>
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
