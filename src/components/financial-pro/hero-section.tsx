'use client'
import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'

export default function FinancialHero() {
  return (
    <section
      className="w-full overflow-hidden bg-gray-100 py-8 lg:pt-[87.5px] lg:pb-[56.45px]"
      aria-labelledby="hero-heading"
    >
      <Container>
        <div className="flex flex-col items-center gap-[64px] lg:flex-row lg:justify-between">
          {/* Left Content */}
          <div className="max-w-[578px]">
            <div className="space-y-4 lg:space-y-6">
              <h1
                id="hero-heading"
                className="font-inter text-center text-[28px] leading-[100%] font-bold tracking-[-0.02em] text-[#101828] md:text-[40px] lg:text-left lg:leading-[60px]"
              >
                Easy Bank Statement reconciliation For Financial Teams
              </h1>

              <p className="font-inter text-center leading-[21px] text-[#475467] sm:text-base md:text-[22px] md:leading-[30px] lg:text-left">
                Get reconciled results with less hassle. Automate
                reconciliation, reduce errors and save time.
              </p>
            </div>
          </div>

          <div className="relative hidden h-auto w-full flex-1 px-5 lg:block lg:self-end lg:px-0">
            <div className="relative ml-auto w-[70%] bg-[#2E604A] pt-[65%]">
              {' '}
              <div className="absolute right-[1%] bottom-[-4%] h-full w-[140%]">
                <Image
                  src="/assets/images/financial-hero.svg"
                  alt="Financial illustration"
                  width={700}
                  height={466}
                  className="h-full w-full object-cover shadow-[0px_4px_25px_rgba(0,0,0,0.08')]"
                />
              </div>
            </div>
          </div>
          <div className="relative flex w-full justify-end px-5 lg:hidden lg:px-0">
            <div className="relative ml-auto w-[70%] bg-[#2E604A] pt-[56%]">
              <div className="absolute bottom-[-6%] left-0 w-[120%] -translate-x-[20%]">
                <Image
                  src="/assets/images/financial-hero.svg"
                  alt="Financial illustration"
                  width={322}
                  height={215}
                  className="h-full w-full object-cover shadow-[0px_4px_25px_rgba(0,0,0,0.08')]"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
