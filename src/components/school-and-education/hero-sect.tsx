"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";

export default function HeroSection() {
  return (
    <section className="w-full py-10 md:py-20 bg-white" aria-labelledby="hero-title">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Section (Left-Aligned on Mobile) */}
          <div className="w-full md:w-1/2 text-left">
            <p className="text-sm md:text-base font-medium text-[#475467] mb-2">
              Save time, reduce errors, and gain real-time insights
            </p>

            <h1 id="hero-title" className="text-[28px] sm:text-[40px] md:text-[48px] leading-tight font-semibold text-[#101828] mb-4">
              <span className="text-[#2E604A]">General </span> Ledger
              Reconciliation for Schools
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#475467] mb-6 leading-relaxed">
              Accurate &amp; straightforward school accounting—track, match, and
              manage student payments with ease.
            </p>

            {/* Buttons: Smaller on Mobile & Side-by-Side */}
            <div className="flex gap-3">
              <button className="px-4 py-2 sm:px-6 sm:py-3 bg-[#2E604A] text-white rounded-md text-xs sm:text-sm md:text-base font-medium shadow hover:bg-[#254B3A] transition cursor-pointer">
                Start Reconciliation
              </button>
              <button className="px-4 py-2 sm:px-6 sm:py-3 border border-[#2E604A] text-[#2E604A] rounded-md text-xs sm:text-sm md:text-base font-medium hover:bg-[#2E604A] hover:text-white transition cursor-pointer">
                Book Demo
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-[280px] sm:w-[360px] md:w-[400px] h-[280px] sm:h-[360px] md:h-[400px] flex items-center justify-center">
              {/* Circular Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/assets/images/education-img.svg"
                  alt="Ledger Reconciliation Demo"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>

              {/* Floating Badges (Unchanged) */}
              <div className="absolute top-6 left-[-30px] sm:left-[-40px] bg-white border border-[#4BB543] rounded-lg shadow-md px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#4BB543] flex items-center gap-1 sm:gap-2">
                90% Matched{" "}
                <Image
                  src="/icons/checkmark.svg"
                  alt="Checkmark"
                  width={12}
                  height={12}
                  className="sm:w-4 sm:h-4"
                />
              </div>

              <div className="absolute top-[-1rem] right-[-2rem] sm:right-[-3rem] flex flex-col items-start gap-1 sm:gap-2 p-3 sm:p-4 rounded-[18px] sm:rounded-[21px] border border-[#E4E7EC] bg-white shadow-md text-xs sm:text-sm">
                <span className="text-[#2E604A] font-medium flex justify-between w-full">
                  Fee Payment <span className="ml-2 sm:ml-[2rem]">681,321</span>
                </span>
                <span className="text-black font-normal">27/01/2024</span>
              </div>

              <div className="absolute bottom-[-1rem] left-[-2rem] sm:left-[-3rem] flex flex-col items-start gap-1 sm:gap-2 p-3 sm:p-4 rounded-[18px] sm:rounded-[21px] border border-[#E4E7EC] bg-white shadow-md text-xs sm:text-sm">
                <span className="text-[#2E604A] font-medium flex justify-between w-full">
                  Bank Statement <span className="ml-2 sm:ml-[2rem]">681,321</span>
                </span>
                <span className="text-black font-normal">27/01/2024</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
