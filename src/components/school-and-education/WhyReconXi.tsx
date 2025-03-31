'use client'
import React from 'react'
import Image from 'next/image'
import Container from '../Container'
import { smoothScroll } from '@/utils/smoothScroll'

const features = [
  {
    description:
      'Simplifies general ledger reconciliation – Match school transactions with accuracy.',
  },
  {
    description:
      'Reduces errors in payment reconciliation – Keep track of tuition and school expenses.',
  },
  {
    description:
      'Organizes financial records – Ensure audit-ready financial management.',
  },
  {
    description:
      'Saves time for finance teams – Automate reconciliation and focus on other tasks.',
  },
  {
    description:
      'Works for all educational institutions – From small schools to large universities.',
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
        <div className="mx-auto flex w-full max-w-[1232px] flex-col items-center gap-8 md:flex-row md:gap-[64px]">
          {/* Left Content - Descriptions First on Mobile */}
          <div className="w-full flex-shrink-0 gap-6 md:w-[674px] md:gap-[48px]">
            <h2 className="pb-2 text-sm font-medium text-[#475467] uppercase sm:text-base md:text-lg">
              BENEFITS
            </h2>
            <h2
              id="why-reconxi-title"
              className="pb-8 text-[22px] leading-[1.2] font-semibold text-[#101828] sm:text-[28px] md:text-[36px] md:leading-[44px]"
            >
              Benefits of Using ReconXi <br className="hidden md:block" /> for
              Schools
            </h2>

            <div role="list" className="space-y-4 md:space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 md:gap-4"
                  role="listitem"
                >
                  <div className="flex h-6 w-6 items-center justify-center md:h-7 md:w-7">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_8127_3755)">
                        <path
                          d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                          stroke="#297B65"
                          strokeWidth="2.33"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_8127_3755">
                          <rect width="24" height="24" rx="12" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <p className="text-[14px] leading-[24px] text-[#767676] sm:text-[16px] md:text-[20px]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={handleDemoClick}
              className="mt-8 flex h-[40px] cursor-pointer items-center justify-center rounded-lg bg-[#2E604A] px-5 text-sm font-semibold text-white hover:bg-[#26533E] md:h-[44px] md:text-base"
              aria-label="Open signup modal"
            >
              Book A Demo
            </button>
          </div>

          {/* Right Side - Image Appears Below on Mobile */}
          <div className="flex w-full justify-center md:w-[494px]">
            <Image
              src="/assets/images/small-education.svg"
              alt="Visual representation of ReconXi features"
              width={494}
              height={616}
              className="h-auto w-full max-w-[300px] rounded-xl shadow-md sm:max-w-[400px] md:max-w-[494px]"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
