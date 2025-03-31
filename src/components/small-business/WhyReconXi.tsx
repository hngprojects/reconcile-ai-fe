'use client'
import React from 'react'
import Image from 'next/image'
import Container from '../Container'
import { Check } from 'lucide-react'

const features = [
  {
    title: 'Automated & Accurate',
    description:
      'ReconXi leverages AI to automatically match transactions from your bank statements to your accounting records, ensuring accuracy and minimizing human error.',
  },
  {
    title: 'Save Time & Reduce Stress',
    description:
      'Stop wasting hours on manual reconciliation. With ReconXi’s fast transaction matching, you can focus more on growing your business and less on balancing the books.',
  },
  {
    title: 'Affordable & Scalable',
    description:
      "Whether you're a small startup or a growing SME, ReconXi adapts to your financial needs. Start with a free trial and easily upgrade as your business expands.",
  },
  // {
  //   title: "Scales as You Grow",
  //   description: "Upgrade to affordable plans as your business needs increase.",
  // },
]

export default function WhyReconXi() {
  return (
    <section
      className="px-0 py-10 md:py-20 lg:px-20"
      aria-labelledby="why-reconxi-title"
    >
      <Container>
        <div className="flex flex-col items-center">
          <h2
            id="why-reconxi-title"
            className="mb-8 text-center text-[28px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#101828] sm:text-[32px] md:mb-12 md:text-[36px] md:leading-[44px]"
          >
            Why Choose ReconXi for Transaction Matching?
          </h2>

          <div className="flex flex-col items-center gap-8 md:gap-12 lg:flex-row">
            <div className="w-full flex-1 space-y-6 md:space-y-8" role="list">
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
            </div>

            <div className="flex-1">
              <Image
                src="/assets/images/start-up-why-image.svg"
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
