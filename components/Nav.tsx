"use client";

import Link from "next/link";
import Container from "./Container";
import { LogoIcon } from "./Icon/Icons";
import UserAction from "@/components/UserAction";

const Nav = () => {

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

        {/* Pass authentication state to UserAction */}
        <UserAction />
      </Container>
    </nav>
  );
};

export default Nav;
