import React from "react";
import { Button } from "../components/ui/button";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";

const NotFound = () => {
  return (
    <section>
      <Nav />
      <div className="flex flex-col text-center justify-center items-center py-20">
        <div className="mb-8 flex flex-col gap-2">
          <Image
            src="/404-image.png"
            alt="404 Icon"
            className="max-lg:w-[250px]"
            width={350}
            height={245}
          />
          <h2 className="md:text-5xl text-3xl font-extrabold text-[#13281f]">
            OOPS!
          </h2>
          <h4 className="md:text-3xl text-xl font-semibold">Page not found</h4>
        </div>
        <Button className="border-2 border-[#2E604A] bg-white text-[#2E604A] hover:text-white transition">
          <Link href="/home">Go Home</Link>
        </Button>
      </div>
      <Footer />
    </section>
  );
};

export default NotFound;
