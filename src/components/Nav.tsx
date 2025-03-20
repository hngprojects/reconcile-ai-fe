"use client";

import Link from "next/link";
import Container from "./Container";
import { LogoIcon } from "./Icon/Icons";
import UserAction from "./UserAction";
import { usePathname } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";

import { cn } from "../lib/utils";

const Nav = () => {
  const pathname = usePathname();

  console.log("pathname", pathname)

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

        <nav className="items-center gap-6 hidden md:flex">
          <Link className={cn("font-medium text-[#333333]", pathname === "/" && "text-[#2E604A]")} href="/">Home</Link>
          <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
              <span>Industries</span>
              <ChevronDown className="w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-[#333333]">
              <DropdownMenuItem>
                <Link className={cn("font-medium text-[#333333] w-full", pathname === "/small-business" && "text-[#2E604A]")} href="/small-business">Small Business owner</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className={cn("font-medium text-[#333333] w-full", pathname === "/financial-pro" && "text-[#2E604A]")} href="/financial-pro">Financial Professionals</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className={cn("font-medium text-[#333333] w-full", pathname === "/enterprise" && "text-[#2E604A]")} href="/enterprise">Enterprise</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className={cn("font-medium text-[#333333] w-full", pathname === "/school-and-education" && "text-[#2E604A]")} href="/school-and-education">Schools & Educational Institutions</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className={cn("font-medium text-[#333333]", pathname === "/financial-pro" && "text-[#2E604A]")} href="/financial-pro">Financial Provision</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          <Link className={cn("font-medium text-[#333333]", pathname === "/blog" && "text-[#2E604A]")} href="/blog">Blog</Link>
          <Link className={cn("font-medium text-[#333333]", pathname === "/pricing" && "text-[#2E604A]")} href="/pricing">Pricing</Link>
        </nav>
        
        { pathname !== "/demo" && (<UserAction/>)}
      </Container>
    </nav>
  );
};

export default Nav;
