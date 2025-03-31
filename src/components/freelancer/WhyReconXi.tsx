'use client'
import React from 'react'
import Image from 'next/image'
import Container from '../Container'
import { Check } from 'lucide-react'
import { smoothScroll } from '@/utils/smoothScroll'

const features = [
  {
    title: 'Instant Bank Reconciliation Accounting',
    description: 'Upload your bank statements and let AI do the work',
  },
  {
    title: 'Automated Reconciliation Software',
    description: 'Say goodbye to manual tracking and errors.',
  },
  {
    title: 'Accurate Financial Reports',
    description:
      'Get a detailed bank reconciliation statement with just a click.',
  },
  {
    title: '100% Free for limited Use',
    description: 'No hidden fees. Just fast, effortless reconciliation.',
  },
]

export default function WhyReconXi() {
  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    smoothScroll('demo-form')
  }

  return (
    <section className="py-10 md:py-20" aria-labelledby="why-reconxi-title">
      <Container>
        <div className="flex flex-col items-center">
          <h2
            id="why-reconxi-title"
            className="mb-8 text-center text-[28px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#101828] sm:text-[32px] md:mb-12 md:text-[36px] md:leading-[44px]"
          >
            Why Freelancers Need ReconXi
          </h2>

          <div className="flex flex-col items-center gap-8 md:gap-12 lg:flex-row">
            <div className="w-full flex-1 space-y-6 md:space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4" role="listitem">
                  <div
                    className="my-auto flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-[2.33px] border-[#297B65] sm:h-7 sm:w-7"
                    aria-hidden="true"
                  >
                    <Check className="h-3 w-3 text-[#297B65] sm:h-4 sm:w-4" />
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <h3 className="font-inter text-base leading-tight font-semibold text-[#101828] sm:text-lg md:text-[20px] md:leading-[30px]">
                      {feature.title}
                    </h3>
                    <p className="font-inter text-sm leading-normal text-[#101828] sm:text-base md:text-[16px] md:leading-[24px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
              <button
                onClick={handleDemoClick}
                className="font-inter ml-8 h-[44px] cursor-pointer rounded-[8px] bg-[#2E604A] px-6 py-3 text-[14px] leading-[20px] font-semibold text-white hover:bg-[#2E604A]/90"
                aria-label="Open signup modal"
              >
                Get a Free Demo
              </button>
            </div>

            <div className="flex-1">
              <Image
                src="/assets/images/freelancer-small2.svg"
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
