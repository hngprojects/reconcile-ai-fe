"use client";
import { Button } from "./ui/button";
import { Logo } from "../app/coming-soon/components/Icons";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between items-center py-6 px-10 border-b-[0.5px] border-[#0000001A]">
      <Link href="https://reconxi.com/home">
        <Logo />
      </Link>
          
      <div className="flex gap-2">
        <Link href="https://reconxi.com/login">
          <Button className="bg-white border-2 border-[#2E604A] text-[#2E604A] hover:text-white hidden md:block cursor-pointer">
            Login
          </Button>
        </Link>
        <Link href="https://reconxi.com/signup">
          <Button className="bg-[#2E604A] text-white hidden md:block cursor-pointer">
            Sign Up
          </Button>
        </Link>
        <button onClick={toggleMenu} className="md:hidden cursor-pointer" aria-label="Toggle menu">
          <MenuIcon size={24} />
        </button>
      </div>
      
      <div className={`fixed inset-0 bg-[#2E604A] flex flex-col items-center gap-4 md:hidden z-10 transition-transform duration-300 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-70'}`}>
        <button onClick={toggleMenu} className="absolute top-6 right-6 text-white cursor-pointer" aria-label="Close menu">
          <XIcon size={32} />
        </button>
        <Link href="https://reconxi.com/login" className="w-[80%]">
          <Button className="bg-transparent border-2 border-white text-white w-full text-lg mt-[100px] cursor-pointer">
            Login
          </Button>
        </Link>

        <Link href="https://reconxi.com/signup" className="w-[80%]">
          <Button className="bg-white text-[#2E604A] w-full text-lg cursor-pointer hover:bg-transparent hover:text-white hover:border-2 hover:border-white">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
