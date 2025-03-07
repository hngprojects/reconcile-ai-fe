import React from "react";
import { Logo } from "./Icons";
import Container from "./Container";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white py-3 z-50 border-b-[0.5px] border-gray-300 w-[calc(100%+80px)] -ml-10 px-4">
      <Container className="flex items-start">
        <Link href="/">
        <Logo className="w-[97.28px] h-8 md:w-[159px] md:h-[50px]" />
        </Link>
      </Container>
    </header>
  );
};

export default Header;
