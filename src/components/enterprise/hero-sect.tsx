'use client'
import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'

export default function EnterpriseHero() {
  return (
    <section
      className="w-full overflow-hidden bg-white py-2 md:py-4"
      aria-labelledby="hero-heading"
    >
      <Container>
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left Content */}
          <div className="max-w-[640px] flex-1">
            <div className="flex w-full flex-col items-center space-y-6 md:space-y-8 lg:items-start">
              <h1
                id="hero-heading"
                className="font-inter text-center text-[32px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#101828] sm:text-[45px] md:text-[48px] lg:text-left"
              >
                Reconciliation Software for Large Organizations
              </h1>

              <p className="font-inter text-center text-base leading-[1.5] text-[#475467] sm:text-lg md:text-[20px] md:leading-[30px] lg:text-left">
                Managing financial transactions across multiple accounts,
                departments, or business units can be a challenge for large
                organizations. Lets show you the ReconXi way.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex flex-1 justify-end">
            <div className="-my-4 w-full max-w-[460px]">
              <Image
                src="/assets/images/enterprise-hero.svg"
                alt="Enterprise reconciliation visualization"
                width={460}
                height={640}
                className="h-auto w-full rounded-tl-[160px]"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
