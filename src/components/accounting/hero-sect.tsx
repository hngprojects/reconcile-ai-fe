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
        <div className="flex flex-col lg:flex-row items-start md:items-center gap-8">
          {/* Left Content */}
          <div
            className="flex-1 max-w-[640px]"
          >
            <div className="gap-4 w-full flex items-center lg:items-start flex-col">
              <p className="text-[#5C5C5C] font-medium text-xs md:text-base text-left">Save time, reduce errors, and gain real-time insights</p>
              <h1
                id="hero-heading"
                className="font-inter text-[32px] lg:text-left md:text-[40px] leading-[1.2] tracking-[-0.02em] font-bold text-[#292D32]"
              >
                Enhance Your<br/>Reconciliation Accounting
              </h1>

              <p className="font-inter text-base lg:text-left md:text-[20px] leading-[1.5] md:leading-[30px] text-[#5C5C5C]">
              Accounting and audit firms need reliable reconciliation accounting. Ensure accuracy, reduce errors, and stay compliant with every transaction.
              </p>
              <div className="flex items-center gap-4">
                <button className="bg-[#2E604A] px-5 md:px-6 py-2 md:py-3 rounded-[8px]  text-white cursor-pointer hover:opacity-75 transition">Start Reconciliation</button>
                <button className="bg-white border border-[#C0C0C0] px-5 md:px-6 py-2 md:py-3 rounded-[8px] text-[#2E604A] cursor-pointer hover:opacity-75 transition">Book Demo</button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            className="flex-1 flex justify-center items-center w-full"
          >
            <div className="relative min-w-full max-md:-ml-7 mx-auto md:min-w-[613px] min-h-[255px] md:min-h-[428px]">
              <Image
                src="/assets/images/accounting-hero-img.png"
                alt="Buisness people in office"
                fill
                className="w-full h-full md:object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
