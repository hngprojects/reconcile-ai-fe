'use client'
import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'

export default function HeroSection() {
  return (
    <section
      className="w-full bg-gray-50 py-10 pb-0 md:py-20"
      aria-labelledby="hero-title"
    >
      <Container>
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <h1
            id="hero-title"
            className="font-inter max-w-[1156px] text-center text-[28px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#101828] sm:text-[45px] md:text-[60px] md:leading-[72px]"
          >
            Stop Wasting Hours on Reconciliation - Let ReconXi Do It for You,
            Automatically!
          </h1>

          <p className="font-inter mt-2 max-w-[1216px] text-center text-base leading-[1.5] font-normal text-[#475467] sm:text-lg md:mt-4 md:text-[20px] md:leading-[30px]">
            Tired of manually tracking income and expenses? ReconXi is the
            automated reconciliation software designed for freelancers like you.
            Get accurate bank reconciliation statements in seconds—no
            spreadsheets, no stress!{' '}
          </p>
        </div>

        <div className="mx-auto mt-8 w-full max-w-[1200px] md:mt-16">
          <div className="relative aspect-[2/1] w-full">
            <Image
              src="/assets/images/freelancer.svg"
              alt="Demonstration of ReconXi's reconciliation software interface"
              fill
              className="h-auto w-full object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
