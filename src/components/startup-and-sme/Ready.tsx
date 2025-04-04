'use client'
import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'
import DemoForm from '@/app/demo/demo-form'

export default function StartReconcile() {
  return (
    <section
      className="bg-white px-0 py-10 md:py-20 xl:px-16"
      aria-labelledby="ready-section-title"
      id="demo-form"
    >
      <Container>
        <div className="flex w-full flex-col-reverse items-center gap-8 lg:flex-row xl:gap-24">
          <div className="aspect-square w-full min-w-[300px] md:h-[720px] md:w-[520px]">
            <Image
              src={'/assets/images/demoImage.png'}
              alt="Visual representation of ReconXi's reconciliation process"
              width={520}
              height={720}
              className="relative h-full w-full rounded-lg object-cover"
            />
          </div>

          <div className="w-full flex-1 space-y-6 px-2 md:space-y-12 xl:px-8">
            <div className="space-y-3 md:space-y-3 md:text-center lg:text-left">
              <h2
                id="ready-section-title"
                className="font-inter text-[27px] leading-[1.2] font-semibold text-[#101828] sm:text-[32px] md:text-[36px]"
              >
                Get Control of Your Business Finances Today.
              </h2>
              <p className="font-inter text-base leading-[1.5] text-[#475467] sm:text-lg md:text-[20px] md:leading-[30px]">
                Stop struggling with business reconciliation. Let ReconXi handle
                it while you focus on running your business.{' '}
              </p>
            </div>

            <div className="rounded-lg" aria-label="Start free trial form">
              <div className="w-full">
                <DemoForm buttonText="Get your Demo" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
