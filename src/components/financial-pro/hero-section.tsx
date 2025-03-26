"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";

export default function FinancialHero() {
  return (
    <section
      className="w-full py-8 lg:pb-[56.45px] lg:pt-[87.5px] bg-gray-100 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-[64px] lg:justify-between">
          {/* Left Content */}
          <div className="max-w-[578px]">
            <div className="space-y-4 lg:space-y-6">
              <h1
                id="hero-heading"
                className="font-inter text-[28px] text-center lg:text-left  md:text-[40px] leading-[100%] lg:leading-[60px] tracking-[-0.02em] font-bold text-[#101828]"
              >
                Easy Bank Statement reconciliation For Financial Teams
              </h1>

              <p className="font-inter text-sm text-center lg:text-left sm:text-lg md:text-[24px] leading-[21px] md:leading-[30px] text-[#475467]">
                Get reconciled results with less hassle. Automate
                reconciliation, reduce errors and save time.
              </p>
            </div>
          </div>

          <div className="relative w-full flex-1 h-auto lg:self-end px-5 lg:px-0 hidden lg:block">
            <div className="relative pt-[75%] bg-[#2E604A] w-[70%] ml-auto">
              {" "}
              <div className="absolute bottom-[-6%] right-[5%] h-full w-[140%]">
                <Image
                  src="/assets/images/financial-hero.svg"
                  alt="Financial illustration"
                  width={700}
                  height={466}
                  className="w-full h-full object-cover shadow-[0px_4px_25px_rgba(0,0,0,0.08')]"
                />
              </div>
            </div>
          </div>
          <div className="relative w-full px-5 lg:px-0 lg:hidden flex justify-end">
            <div className="relative pt-[68%] bg-[#2E604A] w-[80%] ml-auto">
              <div className="absolute bottom-[-6%] left-0 w-[120%] -translate-x-[20%]">
                <Image
                  src="/assets/images/financial-hero.svg"
                  alt="Financial illustration"
                  width={322}
                  height={215}
                  className="w-full h-full object-cover shadow-[0px_4px_25px_rgba(0,0,0,0.08')]"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
