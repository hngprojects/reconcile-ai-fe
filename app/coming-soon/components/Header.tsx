import React from "react";
import { Logo } from "./Icons";
import Container from "./Container";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white py-3 w-full z-50 border-b-[0.5px] border-gray-300 ">
      <Container className="flex items-start">
        <Link href="/">
          <Logo />
        </Link>
      </Container>
    </header>
  );
};

export default Header;
