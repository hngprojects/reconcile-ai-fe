"use client";
import { Button } from "./ui/button";
import { Logo } from "../app/coming-soon/components/Icons";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="flex justify-between items-center py-6 px-10 border-b-[0.5px] border-[#0000001A]">
      <Link href="/home">
        <Logo />
      </Link>
      <div className="flex gap-2">
        <Button className="bg-white border-2 border-[#2E604A] text-[#2E604A] hover:text-white hidden md:block">
          <Link href="/sign-in">Login</Link>
        </Button>
        <Button className="bg-[#2E604A] text-white hidden md:block">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
        <button onClick={toggleMenu} className="md:hidden">
          <MenuIcon size={24} />
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 right-10 bg-white shadow-md rounded-md p-4 flex flex-col gap-2 md:hidde w-[70%]">
          <Button className="bg-white border-2 border-[#2E604A] text-[#2E604A] hover:text-white">
            <Link href="https://reconxi.com/">Login</Link>
          </Button>
          <Button className="bg-[#2E604A] text-white">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      )}
    </nav>

    // </div>
    // </nav>
  );
};

export default Nav;
