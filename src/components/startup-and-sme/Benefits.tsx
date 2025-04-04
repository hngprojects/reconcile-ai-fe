'use client'
import React from 'react'
import Container from '../Container'

const features = [
  {
    title: 'AI-Powered Accuracy',
    description:
      'No more human errors! Our intelligent matching system ensures that every transaction is correctly reconciled.',
  },
  {
    title: 'Saves Hours of Work',
    description:
      'Automate reconciliation and focus on growing your business instead of wasting time on spreadsheets.',
  },
  {
    title: 'Cost-Effective Solution',
    description:
      'Get reconciliation features at an affordable price—starting with a free trial.',
  },
  {
    title: 'Scalable & Reliable',
    description:
      "Whether you're handling a few transactions or thousands, ReconXi grows with your business.",
  },
]

export default function WhyReconXi() {
  return (
    <section
      className="bg-gray-50 px-0 py-10 md:py-20"
      aria-labelledby="why-reconxi-title"
    >
      <Container>
        <div className="flex flex-col items-center">
          <h2
            id="why-reconxi-title"
            className="mb-8 text-center text-[28px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#101828] sm:text-[32px] md:mb-12 md:text-[36px] md:leading-[44px]"
          >
            Benefits of Using ReconXi
          </h2>

          <div className="">
            <div
              className="grid w-full flex-1 grid-cols-1 gap-2 space-y-6 md:grid-cols-2 md:gap-9 md:space-y-8"
              role="list"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex h-[179px] gap-4 rounded-[12px] bg-white p-6"
                  role="listitem"
                >
                  <div className="flex flex-col gap-4 sm:gap-2">
                    <h3 className="font-inter text-base leading-tight font-semibold text-[#101828] sm:text-lg md:text-[20px] md:leading-[30px]">
                      {feature.title}
                    </h3>
                    <p className="font-inter text-sm leading-normal text-[#3B3E45] sm:text-base md:text-[16px] md:leading-[24px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
