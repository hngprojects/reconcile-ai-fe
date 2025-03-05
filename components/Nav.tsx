import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"

const Nav = () => {
  return (
    <nav className="flex justify-between items-center py-6 px-10 border-b-[0.5px] border-[#0000001A]">
      <Image src="/logo.png" alt="logo" width={159} height={50} />
      <div className="flex gap-2">
        <Link href="/">
          <Button className="bg-white border-2 border-[#2E604A] text-[#2E604A] hover:text-white">Login</Button>
        </Link>
        <Link href="/">
          <Button className="bg-[#2E604A] text-white hidden md:block">Sign Up</Button>
        </Link>

      </div>
    </nav>
  )
}

export default Nav