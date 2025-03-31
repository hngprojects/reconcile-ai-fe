'use client'
import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'

export default function HeroSection() {
  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="w-full bg-white py-10 md:py-20"
      aria-labelledby="hero-title"
    >
      <Container>
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          {/* Text Section (Left-Aligned on Mobile) */}
          <div className="w-full text-left md:w-1/2">
            <p className="mb-2 text-sm font-medium text-[#475467] md:text-base">
              Save time, reduce errors, and gain real-time insights
            </p>

            <h1
              id="hero-title"
              className="mb-4 text-[28px] leading-tight font-semibold text-[#101828] sm:text-[40px] md:text-[48px]"
            >
              <span className="text-[#2E604A]">General </span> Ledger
              Reconciliation for Schools
            </h1>

            <p className="mb-6 text-sm leading-relaxed text-[#475467] sm:text-base md:text-lg">
              Accurate &amp; straightforward school accounting—track, match, and
              manage student payments with ease.
            </p>

            {/* Buttons: Smaller on Mobile & Side-by-Side */}
            <div className="flex gap-3">
              <button className="cursor-pointer rounded-md bg-[#2E604A] px-4 py-2 text-xs font-medium text-white shadow transition hover:bg-[#254B3A] sm:px-6 sm:py-3 sm:text-sm md:text-base">
                Start Reconciliation
              </button>
              <button
                onClick={handleDemoClick}
                className="cursor-pointer rounded-md border border-[#2E604A] px-4 py-2 text-xs font-medium text-[#2E604A] transition hover:bg-[#2E604A] hover:text-white sm:px-6 sm:py-3 sm:text-sm md:text-base"
              >
                Book Demo
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex w-full justify-center md:w-1/2">
            <div className="relative flex h-[280px] w-[280px] items-center justify-center sm:h-[360px] sm:w-[360px] md:h-[400px] md:w-[400px]">
              {/* Circular Image */}
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white shadow-lg">
                <Image
                  src="/assets/images/education-img.svg"
                  alt="Ledger Reconciliation Demo"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>

              {/* Floating Badges */}
              <div className="absolute top-6 left-[-30px] flex items-center gap-1 rounded-lg border border-[#4BB543] bg-white px-3 py-1.5 text-xs font-medium text-[#4BB543] shadow-md sm:left-[-40px] sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                90% Matched{' '}
                <Image
                  src="/icons/checkmark.svg"
                  alt="Checkmark"
                  width={12}
                  height={12}
                  className="sm:h-4 sm:w-4"
                />
              </div>

              <div className="absolute top-[-1rem] right-[-2rem] flex flex-col items-start gap-1 rounded-[18px] border border-[#E4E7EC] bg-white p-3 text-xs shadow-md sm:right-[-3rem] sm:gap-2 sm:rounded-[21px] sm:p-4 sm:text-sm">
                <span className="flex w-full justify-between font-medium text-[#2E604A]">
                  Fee Payment <span className="ml-2 sm:ml-[2rem]">681,321</span>
                </span>
                <span className="font-normal text-black">27/01/2024</span>
              </div>

              <div className="absolute bottom-[-1rem] left-[-2rem] flex flex-col items-start gap-1 rounded-[18px] border border-[#E4E7EC] bg-white p-3 text-xs shadow-md sm:left-[-3rem] sm:gap-2 sm:rounded-[21px] sm:p-4 sm:text-sm">
                <span className="flex w-full justify-between font-medium text-[#2E604A]">
                  Bank Statement{' '}
                  <span className="ml-2 sm:ml-[2rem]">681,321</span>
                </span>
                <span className="font-normal text-black">27/01/2024</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
