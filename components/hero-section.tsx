import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="md:py-16 md:px-32 bg-[#F9FAFB]">
      <div className="flex flex-col  items-center text-center m-5">
        <h1 className="font-bold text-4xl flex-wrap lg:leading-[3.5rem] lg:text-[3rem]">
          AI-Powered Financial Reconciliation <br /> in Minutes, Not Hours
        </h1>
        <p className="text-sm text-[#1a212b] my-2 lg:text-[1.2rem] mt-4 lg:w-[48rem]">
          Automate, compare, and reconcile transactions effortlessly with AI. No
          more manual matching—get accurate results in seconds.
        </p>
        <div className="flex flex-col items-center gap-6 my-5 md:flex-row">
          <Link href="/">
            <Button
              variant="outline"
              className="border-primary text-primary h-12 w-[13.875rem]"
            >
              Start Reconcilation
            </Button>
          </Link>
          <Link href="/"><Button className="h-12 w-[13.875rem]">Sign Up</Button></Link>
        </div>
        <Image
          src="/assets/images/macbook_mockup.svg"
          alt="macbook mockup"
          width={621}
          height={387}
          className="mt-10"
          quality={100}
        />
      </div>
    </div>
  );
}
