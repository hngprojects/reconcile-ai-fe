'use client'
import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'
import dynamic from 'next/dynamic'

const DemoForm = dynamic(() => import('@/app/demo/demo-form'))

export default function StartReconcile() {
  return (
    <section
      className="bg-white py-10 md:py-20"
      aria-labelledby="ready-section-title"
      id="demo-form"
    >
      <Container>
        <div className="flex flex-col items-center gap-8 lg:flex-row-reverse lg:gap-16">
          <div className="w-full flex-1">
            <div className="w-full">
              <Image
                src="/assets/images/freelancer-contact.svg"
                alt="Visual representation of ReconXi's reconciliation process"
                width={536}
                height={410}
                className="rounded-lg object-cover shadow-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 580px"
                priority={false}
              />
            </div>
          </div>

          <div className="flex-1 space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h2
                id="ready-section-title"
                className="font-inter text-center text-[27px] leading-[1.2] font-semibold text-[#101828] sm:text-[32px] md:text-[36px] md:leading-[74px]"
              >
                Ready to Reconcile Smarter?
              </h2>
              <p className="font-inter text-center text-base leading-[1.5] text-[#475467] sm:text-lg md:text-[20px] md:leading-[30px]">
                Join thousands of financial professionals using ReconXi&apos;s
                free bank reconciliation software to simplify accounting.
              </p>
            </div>

            <div className="rounded-lg" aria-label="Start free trial form">
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
