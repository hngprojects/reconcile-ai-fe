"use client";

import Link from "next/link";
import Container from "@/components/Container";
import { LogoIcon } from "@/components/Icon/Icons";

const Nav = () => {
  return (
    <nav className="border-b-[1px] border-[#0000001A] sticky top-0 left-0 right-0 bg-white z-50">
      <Container className="flex py-4 justify-between w-full items-center">
        <Link href="/">
          <div className="flex items-center justify-center gap-2">
            <LogoIcon className="size-9 md:size-12" />
            <span className="font-extrabold text-3xl font-baloo text-primary leading-0 mt-1">
              ReconXi
            </span>
          </div>
        </Link>
      </Container>
    </nav>
  );
};

export default Nav;
