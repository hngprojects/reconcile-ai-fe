'use client'
import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'
import { smoothScroll } from '@/utils/smoothScroll'

const features = [
  {
    title: 'Handle High-Volume Transactions',
    description:
      'Perfect for large organizations dealing with numerous bank statements and transactions.',
  },
  {
    title: 'Faster Financial Operations',
    description:
      'Reconcile accounts and manage financial statements at scale in minutes, not hours.',
  },
  {
    title: 'AI-Powered Reconciliation Accuracy',
    description:
      'Automate transaction matching with AI, ensuring accuracy and eliminating human errors in your financial records..',
  },
]

export default function Features() {
  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    smoothScroll('demo-form')
  }

  return (
    <section
      className="w-full px-0 py-20 lg:px-20"
      aria-labelledby="features-heading"
    >
      <Container>
        <div className="flex flex-col gap-12">
          {/* Image - Moves to top on mobile */}
          <div className="w-full lg:hidden" role="presentation">
            <Image
              src="/assets/images/screen-mockup.png"
              alt="Enterprise reconciliation features visualization"
              width={536}
              height={410}
              className="h-auto w-full rounded-lg border-4 border-[#101828]"
              priority={false}
            />
          </div>

          <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-16">
            {/* Left Content - Feature List */}
            <div className="my-auto w-full max-w-[560px] flex-1">
              <div className="mb-8 space-y-0">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-[#2E604A] py-4 pl-6"
                  >
                    <h3 className="font-inter mb-2 text-[20px] leading-[30px] font-semibold text-[#333333]">
                      {feature.title}
                    </h3>
                    <p className="font-inter text-[16px] leading-[24px] font-normal text-[#475467]">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleDemoClick}
                className="font-inter inline-flex h-[44px] cursor-pointer items-center rounded-[8px] bg-[#2E604A] px-6 py-3 text-[14px] leading-[20px] font-semibold text-white hover:bg-[#2E604A]/90"
                aria-label="Open signup modal"
              >
                Get a Free Demo
              </button>
            </div>

            {/* Right Image - Hidden on mobile */}
            <div
              className="hidden flex-1 overflow-hidden rounded-lg border-4 border-[#101828] lg:block"
              role="presentation"
            >
              <Image
                src="/assets/images/screen-mockup.png"
                alt="Enterprise reconciliation features visualization"
                width={536}
                height={410}
                className="h-auto w-full"
                priority={false}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
