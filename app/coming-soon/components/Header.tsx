import React from "react";
import { Logo } from "./Icons";
import Container from "./Container";
import Link from "next/link";

const Header = () => {
  return (
    <Container className="bg-white py-3 w-full z-50 flex items-start ">
      <Link href="/">
        <Logo />
      </Link>
    </Container>
  );
};

export default Header;
