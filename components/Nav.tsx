import { Button } from "./ui/button";
import { Logo } from "../app/coming-soon/components/Icons";

const Nav = () => {
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
        <Button className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
