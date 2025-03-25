"use client";
import React from "react";
import Container from "@/src/components/Container";

export default function HeroSection() {
  return (
    <section
      className="w-full py-10 px-0 lg:px-20 md:py-20 pb-0 bg-gray-50"
      aria-labelledby="hero-title"
    >
      <Container>
        <div
          className="flex flex-col items-center gap-4 md:gap-6"
        >
          <h1
            id="hero-title"
            className="max-w-[1156px] text-center font-inter text-[28px] sm:text-[45px] md:text-[60px] leading-[1.2] md:leading-[72px] tracking-[-0.02em] font-semibold text-[#101828]"
          >
          Transaction Matching for Small Business Owners: Simplify Your Financial Reconciliation
          </h1>

          <p className="max-w-[1216px] text-center font-inter text-base sm:text-lg md:text-[20px] leading-[1.5] md:leading-[30px] font-normal text-[#475467] mt-2 md:mt-4">
          Reconcile your business’s bank statements and accounting records with ReconXi. Say goodbye to the headache of manual reconciliation and enjoy accurate, fast results every time.
          </p>
        </div>

        <div
          className="mt-8 md:mt-16 w-full max-w-[1200px] mx-auto"
        >
          {/* <div className="relative w-full aspect-[2/1]">
            <Image
              src="/assets/images/smallbusiness-heroImg.svg"
              alt="Demonstration of ReconXi's reconciliation software interface"
              fill
              className="w-full h-auto object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div> */}
        </div>
      </Container>
    </section>
  );
}
