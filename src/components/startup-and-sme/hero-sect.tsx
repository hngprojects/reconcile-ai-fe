"use client";
import React from "react";
import Container from "@/src/components/Container";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="w-full py-10 px-0 lg:px-20 md:py-20 pb-0 bg-gray-50"
      aria-labelledby="hero-title"
    >
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="flex-1 flex flex-col items-center text-center md:text-left md:items-start">
            <h1
              id="hero-title"
              className="max-w-[589px] font-[600] font-inter text-[28px] sm:text-[35px] md:text-[40px] leading-[1.2] md:leading-[60px] tracking-[-0.02em]  text-[#101828] mb-4"
            >
              Free and Affordable Reconciliation Software – Fast, Accurate & Hassle-Free
            </h1>

            <p className="max-w-[589px] font-inter text-base sm:text-lg md:text-[20px] leading-[1.5] md:leading-[30px] font-normal text-[#475467] mb-8">
              Get free online bank reconciliation with AI-powered accuracy. Save hours, eliminate errors, and take control of your finances with the best free reconciliation software for startups and small businesses.
            </p>
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-[#2E604A] text-white rounded-md text-xs sm:text-sm md:text-base font-medium shadow hover:bg-[#254B3A] transition cursor-pointer">
            Get Started for Free
              </button>
        
          </div>

          <div className="flex-1 w-full max-w-[600px] aspect-[4/3]">
            <div className="relative w-full h-full">
              <Image
                src="/assets/images/serious-business.png"
                alt="Demonstration of ReconXi's reconciliation software interface"
                fill
                className="w-full h-full object-contain"
                sizes="(max-width: 1200px) 100vw, 600px"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}