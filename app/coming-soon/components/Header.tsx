import React from "react";
import { Logo } from "./Icons";
import Container from "./Container";

const Header = () => {
  return (
    <Container className="bg-white py-3 w-full z-50 flex items-start ">
      <Logo />
    </Container>
  );
};

export default Header;
