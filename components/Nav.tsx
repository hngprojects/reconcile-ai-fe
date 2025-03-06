"use client";

import Link from "next/link";
import Container from "./Container";
import { LogoIcon } from "./Icon/Icons";

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
      </Container>
    </nav>
  );
};

export default Nav;
