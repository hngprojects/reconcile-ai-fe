"use client";

import { Logo } from "../app/coming-soon/components/Icons";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { MenuIcon, XIcon } from "lucide-react";
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
          <button onClick={toggleMenu} className="cursor-pointer sm:hidden">
            <MenuIcon size={24} />
          </button>
        </div>
        <div
          className={`fixed inset-0 bg-[#2E604A] flex flex-col items-center gap-4 md:hidden z-10 transition-transform duration-300 ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-70"
          }`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 text-white cursor-pointer"
            aria-label="Close menu"
          >
            <XIcon size={32} />
          </button>

          <div className="flex w-[80%] mt-28 gap-2.5 flex-col">
            <Link
              className="w-full py-2 px-4 rounded-md font-semibold hover:bg-white/10 justify-center items-center border-2 border-white h-9 text-sm text-white hover:text-white flex"
              href="/sign-in"
            >
              Login
            </Link>

            <Link
              className="bg-white py-2 px-4 rounded-md font-semibold justify-center items-center h-9 text-sm text-primary hover:bg-white/90 flex"
              href="/sign-up"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Nav;
