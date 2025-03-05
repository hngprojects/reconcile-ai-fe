import React from "react";
import { Button } from "./ui/button";
import Link from "next/link"

const CTASection = () => {
  return (
    <div className="bg-white xl:pt-8 xl:px-16 xl:pb-20 font-[family-name:var(--font-inter)]">
      <div className="flex flex-col items-start gap-8 md:gap-10 justify-between px-5 py-10 bg-gray-50 xl:p-16 xl:rounded-2xl md:flex-row md:px-7 md:py-12">
        <div className="space-y-2 md:space-y-3 lg:space-y-4 md:w-2/3">
          <p className="font-bold text-gray-900 text-xl xl:text-[32px]">
            Try it for Free
          </p>
          <p>
            We are offering it completely free for a limited time Get access to
            all features while we continue to improve.
          </p>
        </div>

        <Link href="/">
          <Button className="font-semibold bg-[#2E604A] hover:bg-[#2E604A]/90">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CTASection;
