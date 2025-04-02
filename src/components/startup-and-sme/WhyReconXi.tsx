'use client'
import React from 'react'
import Image from 'next/image'
import Container from '../Container'

const benefits = [
  {
    description: 'Simplify your finances with smart reconciliation accounting.',
  },
  {
    description:
      'Automate bank reconciliation accounting – Reduce errors & save time.',
  },
  {
    description:
      'Simplify your account reconciliation statement – Accurate & fast.',
  },
  {
    description:
      'Stay audit-ready with stress-free account reconciliation statements.',
  },
]

export default function WhyReconXi() {
  return (
    <section className="py-10 md:py-20" aria-labelledby="why-reconxi-title">
      <Container>
        <div className="mx-auto flex w-full flex-col items-center gap-8 md:flex-row md:gap-[64px]">
          {/* Left Content - Descriptions First on Mobile */}
          <div className="w-full flex-shrink-0 md:w-[674px]">
            <h2
              id="why-reconxi-title"
              className="pb-8 text-[22px] leading-[1.2] font-semibold text-[#101828] sm:text-[28px] md:text-[36px] md:leading-[44px]"
            >
              What is ReconXi?
            </h2>
            <p className="font-inter pb-10 text-base leading-[1.5] text-[#2E2E2E] sm:text-lg md:text-[20px] md:leading-[30px]">
              ReconXi is built for accounting and audit firms to simplify
              reconciliation accounting. With precise financial tracking and
              automated reconciliation, firms can ensure compliance, eliminate
              discrepancies, and maintain accurate records for audits and
              reporting.
            </p>

            <div role="list" className="space-y-4 md:space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 md:gap-4"
                  role="listitem"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAEFED] p-1 md:h-7 md:w-7">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-full w-full"
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
                  <p className="text-[14px] leading-[24px] font-[500] text-[#2E2E2E] sm:text-[16px] md:text-[20px]">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image Responsive */}
          <div className="flex w-full items-center justify-center md:h-[544px] md:w-[605px]">
            <div className="relative aspect-[605/544] w-full max-w-[605px]">
              <Image
                src="/assets/images/Small-hero.png"
                alt="Visual representation of ReconXi features"
                fill
                className="rounded-xl object-contain shadow-md"
                sizes="(max-width: 768px) 100vw, 605px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
