'use client'
import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'
import { smoothScroll } from '@/utils/smoothScroll'

export default function Features1() {
  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    smoothScroll('demo-form')
  }

  return (
    <section
      className="w-full px-0 py-12 md:py-20 lg:px-20"
      aria-labelledby="features-title"
    >
      <Container>
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
          <div className="flex-1 overflow-hidden rounded-lg border-4 border-[#101828] bg-[#101828]">
            <Image
              src="/assets/images/screen-mockup.png"
              alt="Screenshot of ReconXi's reconciliation interface"
              width={536}
              height={410}
              className="h-full w-full object-cover"
              priority={false}
            />
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <h2
              id="features-title"
              className="font-inter text-[28px] leading-[1.2] font-semibold text-[#101828] sm:text-[32px] md:text-[36px] md:leading-[44px]"
            >
              Tired of Manual Bank Reconciliations?
            </h2>

            <div className="flex flex-col gap-2">
              <p className="font-inter text-base leading-[1.5] font-normal text-[#475467] sm:text-lg md:text-[18px] md:leading-[28px]">
                As a startup or small business owner, tracking transactions and
                balancing books can be time-consuming and prone to errors.
                Spreadsheets and expensive software are not the answer.
              </p>

              <p className="font-inter text-base leading-[1.5] font-bold text-[#475467] sm:text-lg md:text-[18px] md:leading-[28px]">
                ReconXi offers a smarter, faster way to reconcile your bank
                statements and keep your finances on track.
              </p>
            </div>
            <button
              onClick={handleDemoClick}
              className="font-inter h-[44px] w-fit cursor-pointer rounded-[8px] bg-[#2E604A] px-6 py-3 text-[14px] leading-[20px] font-semibold text-white hover:bg-[#2E604A]/90"
              aria-label="Open signup modal"
            >
              Get a Free Demo
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
