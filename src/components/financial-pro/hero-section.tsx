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

          <div className="relative w-full max-w-[729px] h-[497px] flex-1 lg:self-end">
      {/* Background colored div */}
      <div className="absolute top-0 right-0 bg-[#2E604A] lg:h-[497px] lg:w-[532px] z-10"></div>
      
      {/* Image */}
      <div className="absolute top-0 left-0 z-20">
        <Image
          src="/assets/images/financial-hero.svg"
          alt="Overlay image"
          width={700}
          height={466}
        />
      </div>
    </div>
        </div>
      </Container>
    </section>
  );
}
