'use client'
import React from 'react'
import Image from 'next/image'
import Container from '../Container'
import { smoothScroll } from '@/utils/smoothScroll'

const features = [
  {
    title: 'Save Time',
    description: 'Reduce hours spent on manual reconciliation.',
  },
  {
    title: 'Improve Accuracy',
    description: 'Minimize errors with AI-powered matching',
  },
  {
    title: 'Enhance Compliance',
    description: 'Meet financial reporting and auditing standards.',
  },
  {
    title: 'Scale with Ease',
    description: 'Works for small finance teams and large instituitions.',
  },
]

export default function WhyReconXi() {
  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    smoothScroll('demo-form')
  }

  return (
    <section
      className="px-0 py-10 md:py-20 lg:px-20"
      aria-labelledby="why-reconxi-title"
    >
      <Container>
        <div className="flex flex-col items-center">
          <h2
            id="why-reconxi-title"
            className="mb-8 w-full text-center text-[24px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#101828] sm:text-[32px] md:mb-12 md:text-[36px] md:leading-[44px]"
          >
            ReconXi: Smart Financial Tracking
          </h2>

          <div className="flex flex-col items-center gap-8 md:gap-12 lg:flex-row">
            <div className="w-full flex-1 space-y-6 md:space-y-8">
              <div role="list" className="space-y-6 md:space-y-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4" role="listitem">
                    <div
                      className="my-auto flex flex-shrink-0 items-center justify-center"
                      aria-hidden="true"
                    >
                      <Image
                        src="/assets/images/check-icon.svg"
                        alt="Check icon"
                        width={28}
                        height={28}
                        className="h-[23px] w-[23px] lg:h-7 lg:w-7"
                      />
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <h3 className="font-inter text-base leading-tight font-semibold text-[#333333] sm:text-lg md:text-[20px] md:leading-[30px]">
                        {feature.title}
                      </h3>
                      <p className="font-inter text-sm leading-normal text-[#475467] sm:text-base md:text-[16px] md:leading-[24px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleDemoClick}
                className="font-inter h-[44px] w-full cursor-pointer rounded-[8px] bg-[#2E604A] px-6 py-3 text-[14px] leading-[20px] font-semibold text-white hover:bg-[#2E604A]/90"
                aria-label="Open signup modal"
              >
                Try ReconXi Now
              </button>
            </div>

            <div className="flex-1">
              <Image
                src="/assets/images/small-business-ft.svg"
                alt="Visual representation of ReconXi features"
                width={580}
                height={400}
                className="h-auto w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
