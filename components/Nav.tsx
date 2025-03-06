"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import Container from "./Container";
import { LogoIcon } from "./Icon/Icons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Nav = () => {
  return (
    <nav className="border-b-[0.5px] border-[#0000001A]">
      <Container className="flex py-4 justify-between w-full items-center">
        <Link href="/home">
          <div className="flex items-center justify-center gap-2">
            <LogoIcon width={48} height={48} />
            <span className="font-extrabold text-3xl font-baloo text-primary">
              ReconXi
            </span>
          </div>
        </Link>
        <div className="flex gap-2">
          <Link
            className="bg-white py-2 px-4 rounded-md font-semibold justify-center items-center border-2 border-primary h-9 text-sm text-primary hover:text-white hover:bg-primary hidden sm:flex"
            href="/sign-in"
          >
            Login
          </Link>
          <Link
            className="bg-primary py-2 px-4 rounded-md font-semibold justify-center items-center h-9 text-sm text-white hover:bg-primary/90 hidden sm:flex"
            href="/sign-up"
          >
            Sign Up
          </Link>
          <Sheet>
            <SheetTrigger className="sm:hidden">
              <MenuIcon size={24} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="sr-only">Side menu</SheetTitle>
                <div className="flex mt-12 flex-col gap-2">
                  <Link
                    className="bg-white py-2 px-4 rounded-md font-semibold justify-center items-center border-2 border-primary h-9 text-sm text-primary hover:text-white hover:bg-primary flex"
                    href="/sign-in"
                  >
                    Login
                  </Link>
                  <Link
                    className="bg-primary py-2 px-4 rounded-md font-semibold justify-center items-center h-9 text-sm text-white hover:bg-primary/90 flex"
                    href="/sign-up"
                  >
                    Sign Up
                  </Link>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </nav>
  );
};

export default Nav;
