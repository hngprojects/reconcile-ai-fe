"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";

export default function EnterpriseHero() {
  return (
    <section
      className="w-full py-2 md:py-4 bg-white overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div
            className="flex-1 max-w-[640px]"
          >
            <div className="space-y-6 md:space-y-8 w-full flex items-center lg:items-start flex-col">
              <h1
                id="hero-heading"
                className="font-inter text-[32px] text-center lg:text-left sm:text-[45px] md:text-[48px] leading-[1.2] tracking-[-0.02em] font-semibold text-[#101828]"
              >
                Reconciliation Software for Large Organizations
              </h1>

              <p className="font-inter text-base  text-center lg:text-left sm:text-lg md:text-[20px] leading-[1.5] md:leading-[30px] text-[#475467]">
                Managing financial transactions across multiple accounts,
                departments, or business units can be a challenge for large
                organizations. Lets show you the ReconXi way.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div
            className="flex-1 flex justify-end"
          >
            <div className="w-full max-w-[460px] -my-4">
              <Image
                src="/assets/images/enterprise-hero.svg"
                alt="Enterprise reconciliation visualization"
                width={460}
                height={640}
                className="w-full h-auto rounded-tl-[160px]"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
