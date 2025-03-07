import { Button } from "@/components/ui/button";
import React from "react";

export default function TryFreeCard() {
  return (
    <div className="bg-[#F9FAFB] flex flex-col md:flex-row items-center  md:justify-between  text-center lg:text-start py-5 gap-7 px-5 md:px-20 lg:mx-30 lg:my-10 ">
      <div className="flex flex-col items-center lg:items-start gap-5 lg:w-1/2 md:p-10 md:pl-0">
        <h2 className="text-[#101828] text-[1.5rem] font-semibold">
          Try it for free
        </h2>
        <p className="text-sm  text-center lg:text-start text-[#475467]">
          We are offering it free for a limited time.
        </p>
      </div>
      <Button className="px-5">Get Started</Button>
    </div>
  );
}
