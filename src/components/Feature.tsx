'use client'
import React from 'react'
import Image from 'next/image'
import Container from './Container'

export default function Features1() {
  return (
    <section className="w-full overflow-hidden">
      <Container className="px-4 py-16 md:px-16 lg:px-24">
        <div className="flex h-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-24">
          {/* Left Text Section */}
          <div className="flex flex-1 flex-col items-start gap-[32px] text-center sm:text-left">
            <div className="flex w-full flex-col items-start gap-[24px]">
              <p className="text-primary font-inter w-full leading-[24px] font-semibold">
                Problem Statement
              </p>
              <div className="flex flex-col items-start gap-[16px] self-stretch">
                <h1 className="font-inter text-3xl font-semibold text-[#101828] sm:text-4xl">
                  Financial Reconciliation Doesn&apos;t Have to Be Hard
                </h1>
                <p className="font-inter text-[#475467] sm:text-lg">
                  Tired of spending hours matching transactions manually? Errors
                  slipping through the cracks? ReconXi’s AI-powered platform
                  makes reconciliation quick, accurate, and easy, so you can
                  focus on growing your business or managing clients.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex flex-1 items-center justify-center">
            <div className="relative w-full max-w-[536px]">
              <Image
                src="/assets/images/screen-mockup.png"
                alt="screen mockup"
                width={536}
                height={410}
                className="h-auto max-w-full flex-shrink-0 rounded-[10px] border-[4px] border-[#101828] bg-gray-300 bg-cover bg-[50%] bg-no-repeat object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
