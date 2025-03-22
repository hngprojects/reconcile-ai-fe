"use client";

import Link from "next/link";
import Container from "./Container";
import { LogoIcon } from "./Icon/Icons";
import UserAction from "./UserAction";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";

const Nav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Hide navigation on dashboard page
  const isDashboard = pathname.startsWith("/dashboard");

  const handleDropdownClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="border-b-[1px] flex items-center border-[#0000001A] sticky top-0 left-0 right-0 bg-white z-50">
      <Container className="flex py-4 justify-between w-full items-center">
        <Link href="/">
          <div className="flex items-center justify-center gap-2">
            <LogoIcon className="size-9 md:size-12" />
            <span className="font-extrabold text-xl sm:text-3xl font-baloo text-primary leading-0 mt-1">
              ReconXi
            </span>
          </div>
        </Link>

        {!isDashboard && (
          <nav className="items-center gap-6 hidden md:flex">
            <Link
              className={cn(
                "font-medium text-[#333333] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2E604A] hover:after:w-full after:transition-all after:duration-300",
                pathname === "/" &&
                  "after:w-full after:bg-[#2E604A] after:h-[2px]"
              )}
              href="/"
            >
              Home
            </Link>

            <div className="relative">
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2E604A] hover:after:w-full after:transition-all after:duration-300">
                  <span>Industries</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isOpen && "transform rotate-180"
                    )}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="text-[#333333] w-48 mt-2">
                  <DropdownMenuItem className="hover:bg-[#2E604A]/10">
                    <Link
                      className="font-medium text-[#333333] w-full hover:text-[#2E604A]"
                      href="/small-business"
                      onClick={handleDropdownClick}
                    >
                      Startups and SMEs
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#2E604A]/10">
                    <Link
                      className="font-medium text-[#333333] w-full hover:text-[#2E604A]"
                      href="/financial-pro"
                      onClick={handleDropdownClick}
                    >
                      Financial Professionals
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#2E604A]/10">
                    <Link
                      className="font-medium text-[#333333] w-full hover:text-[#2E604A]"
                      href="/enterprise"
                      onClick={handleDropdownClick}
                    >
                      Enterprise
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#2E604A]/10">
                    <Link
                      className="font-medium text-[#333333] w-full hover:text-[#2E604A]"
                      href="/freelancer"
                      onClick={handleDropdownClick}
                    >
                      Freelancer
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#2E604A]/10">
                    <Link
                      className="font-medium text-[#333333] w-full hover:text-[#2E604A]"
                      href="/school-and-education"
                      onClick={handleDropdownClick}
                    >
                      Schools & Educational Institutions
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Link
              className="font-medium text-[#333333] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2E604A] hover:after:w-full after:transition-all after:duration-300"
              href="/blog"
            >
              Blog
            </Link>

            <Link
              className="font-medium text-[#333333] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2E604A] hover:after:w-full after:transition-all after:duration-300"
              href="/pricing"
            >
              Pricing
            </Link>
          </nav>
        )}

        {pathname !== "/demo" && <UserAction />}
      </Container>
    </nav>
  );
};

export default Nav;
