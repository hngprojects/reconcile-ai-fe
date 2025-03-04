import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function HomePage() {
  return (
    <main className="md:py-16 md:px-32 bg-[#F9FAFB] h">
      <div className="flex flex-col  items-center text-center m-5">
        <h1 className="font-bold text-[48px] flex-wrap lg:leading-[3.5rem]">
          AI-Powered Financial Reconciliation <br /> in Minutes, Not Hours
        </h1>
        <p className="text-[20px] text-[#475467] my-2">
          Automate, compare, and reconcile transactions effortlessly with AI. No
          more <br /> manual matching—get accurate results in seconds.
        </p>
        <div className="flex items-center gap-6 my-5">
          <Button
            variant="outline"
            className="border-primary text-primary h-12 w-[13.875rem]"
          >
            Start Reconcilation
          </Button>
          <Button className="h-12 w-[13.875rem]">Sign Up</Button>
        </div>
        <Image
          src="/assets/images/macbook_mockup.png"
          alt="macbook mockup"
          width={621}
          height={387}
          className="mt-10"
        />
      </div>
    </main>
  );
}
