"use client";
import { Button } from "./ui/button";
import { Logo } from "../app/coming-soon/components/Icons";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="flex justify-between items-center py-6 px-10 border-b-[0.5px] border-[#0000001A]">
      <Logo />
      <div className="flex gap-2">
        <Button className="bg-white border-2 border-[#2E604A] text-[#2E604A] hover:text-white hidden md:block">
          Login
        </Button>
        <Button className="bg-[#2E604A] text-white hidden md:block">
          Sign Up
        </Button>
        <button onClick={toggleMenu} className="md:hidden">
          <MenuIcon size={24} />
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 right-10 bg-white shadow-md rounded-md p-4 flex flex-col gap-2 md:hidde w-[70%]">
          <Button className="bg-white border-2 border-[#2E604A] text-[#2E604A] hover:text-white">
            Login
          </Button>
          <Button className="bg-[#2E604A] text-white">Sign Up</Button>
        </div>
      )}
    </nav>

    // </div>
    // </nav>
  );
};

export default Nav;
