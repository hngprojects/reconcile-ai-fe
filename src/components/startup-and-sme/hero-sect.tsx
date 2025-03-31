'use client'
import React from 'react'
import Container from '@/components/Container'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section
      className="w-full bg-gray-50 px-0 py-10 pb-0 md:py-20 lg:px-20"
      aria-labelledby="hero-title"
    >
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row lg:gap-16">
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
            <h1
              id="hero-title"
              className="font-inter mb-4 max-w-[589px] text-[28px] leading-[1.2] font-[600] tracking-[-0.02em] text-[#101828] sm:text-[35px] md:text-[40px] md:leading-[60px]"
            >
              Free and Affordable Reconciliation Software – Fast, Accurate &
              Hassle-Free
            </h1>

            <p className="font-inter mb-8 max-w-[589px] text-base leading-[1.5] font-normal text-[#475467] sm:text-lg md:text-[20px] md:leading-[30px]">
              Get free online bank reconciliation with AI-powered accuracy. Save
              hours, eliminate errors, and take control of your finances with
              the best free reconciliation software for startups and small
              businesses.
            </p>
            <button className="cursor-pointer rounded-md bg-[#2E604A] px-4 py-2 text-xs font-medium text-white shadow transition hover:bg-[#254B3A] sm:px-6 sm:py-3 sm:text-sm md:text-base">
              Get Started for Free
            </button>
          </div>

          <div className="aspect-[4/3] w-full max-w-[600px] flex-1">
            <div className="relative h-full w-full">
              <Image
                src="/assets/images/serious-business.png"
                alt="Demonstration of ReconXi's reconciliation software interface"
                fill
                className="h-full w-full object-contain"
                sizes="(max-width: 1200px) 100vw, 600px"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
