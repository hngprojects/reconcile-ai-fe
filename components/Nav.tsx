"use client";

import { Logo } from "../app/coming-soon/components/Icons";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import Container from "./Container";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="border-b-[0.5px] border-[#0000001A]">
      <Container className="flex py-4 justify-between w-full items-center">
        <Link href="/home">
          <Logo />
        </Link>
        <div className="flex gap-2">
          <Link
            className="bg-white py-2 px-4 rounded-md font-semibold justify-center items-center border-2 border-primary h-9 text-sm text-primary hover:text-white hover:bg-primary hidden sm:flex"
            href="/"
          >
            Login
          </Link>
          <Link
            className="bg-primary py-2 px-4 rounded-md font-semibold justify-center items-center h-9 text-sm text-white hover:bg-primary/90 hidden sm:flex"
            href="/"
          >
            Sign Up
          </Link>
          <button onClick={toggleMenu} className="cursor-pointer sm:hidden">
            <MenuIcon size={24} />
          </button>
        </div>
        {isOpen && (
          <div className="absolute top-16 right-10 bg-white shadow-md rounded-md p-4 flex flex-col gap-2 sm:hidde w-[70%]">
            <Link
              className="bg-white py-2 px-4 rounded-md font-semibold justify-center items-center border-2 border-primary h-9 text-sm text-primary hover:text-white hover:bg-primary flex"
              href="/"
            >
              Login
            </Link>
            <Link
              className="bg-primary py-2 px-4 rounded-md font-semibold justify-center items-center h-9 text-sm text-white hover:bg-primary/90 flex"
              href="/"
            >
              Sign Up
            </Link>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Nav;
