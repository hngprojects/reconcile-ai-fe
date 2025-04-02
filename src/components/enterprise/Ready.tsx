'use client'
import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'
import DemoForm from '@/app/demo/demo-form'

export default function StartReconcile() {
  return (
    <section
      className="bg-white px-0 py-10 md:py-20 lg:px-20"
      aria-labelledby="ready-section-title"
      id="demo-form"
    >
      <Container>
        <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-16">
          <div className="w-full min-w-[300px] flex-1">
            <Image
              src="/assets/images/ready-enterprise.svg"
              alt="Visual representation of ReconXi's reconciliation process"
              width={680}
              height={850}
              className="h-auto w-full rounded-lg"
            />
          </div>

          <div className="w-full flex-1 items-center space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h2
                id="ready-section-title"
                className="font-inter text-center text-[27px] leading-[1.2] font-semibold text-[#101828] sm:text-[32px] md:text-[36px] md:leading-[74px]"
              >
                Get A Free Demo From Us
              </h2>
            </div>

            <div
              className="mx-auto rounded-lg"
              aria-label="Start free trial form"
            >
              <div>
                <DemoForm buttonText="Get your Demo" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
