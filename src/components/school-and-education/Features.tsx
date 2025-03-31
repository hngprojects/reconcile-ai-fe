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
    <section className="w-full py-12 md:py-20" aria-labelledby="features-title">
      <Container>
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
          {/* Left Image */}
          <div
            className="flex-1 overflow-hidden rounded-lg border-4 border-[#101828] bg-[#101828]"
            role="presentation"
          >
            <Image
              src="/assets/images/screen-mockup.png"
              alt="Screenshot of ReconXi's reconciliation interface"
              width={536}
              height={410}
              className="h-full w-full object-cover"
              priority={false}
            />
          </div>

          {/* Right Text Content */}
          <div className="flex flex-1 flex-col gap-4 md:gap-6">
            <h2
              id="features-title"
              className="font-inter text-[28px] leading-[1.2] font-semibold text-[#101828] sm:text-[32px] md:text-[36px] md:leading-[44px]"
            >
              Struggling with manual bank reconciliations?
            </h2>

            <p className="font-inter text-base leading-[1.5] font-normal text-[#475467] sm:text-lg md:text-[18px] md:leading-[28px]">
              Schools and educational institutions handle numerous transactions
              daily – from student fees and payroll to administrative expenses.
              Manual reconciliation can be time-consuming, error-prone, and
              tedious. <br></br>With ReconXi, you can automate the process,
              reduce the risk of mistakes, and focus on what truly matters:
              educating students and running your institution.<br></br>{' '}
              <strong className="font-bold">
                ReconXi gives you a better way!
              </strong>
            </p>
            <button
              onClick={handleDemoClick}
              className="font-inter mt-6 h-[44px] cursor-pointer rounded-[8px] bg-[#2E604A] px-6 py-3 text-[14px] leading-[20px] font-semibold text-white hover:bg-[#2E604A]/90"
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
