'use client'
import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'

export default function Features() {
  return (
    <section
      className="w-full px-0 py-20 lg:px-20"
      aria-labelledby="features-heading"
    >
      <Container>
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="w-full">
            <h2 className="text-sm text-[#767676] md:text-base">ABOUT US</h2>
            <h1 className="mt-2 mb-6 text-2xl text-[#292D32] md:text-4xl">
              What is ReconXi?
            </h1>
            <p className="text-sm text-[#767676] md:text-xl">
              ReconXi is built for accounting and audit firms to simplify
              reconciliation accounting. With precise financial tracking and
              automated reconciliation, firms can ensure compliance, eliminate
              discrepancies, and maintain accurate records for audits and
              reporting.
            </p>
            <div className="mt-6 flex flex-col gap-4 md:mt-12">
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/images/check-bg-green.png"
                  alt="Check icon"
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <p className="text-sm font-medium text-[#767676] md:text-xl">
                  Simplify your finances with smart reconciliation accounting.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/images/check-bg-green.png"
                  alt="Check icon"
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <p className="text-sm font-medium text-[#767676] md:text-xl">
                  Automate bank reconciliation accounting – Reduce errors & save
                  time.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/images/check-bg-green.png"
                  alt="Check icon"
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <p className="text-sm font-medium text-[#767676] md:text-xl">
                  Simplify your account reconciliation statement – Accurate &
                  fast.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/images/check-bg-green.png"
                  alt="Check icon"
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <p className="text-sm font-medium text-[#767676] md:text-xl">
                  Stay audit-ready with stress-free account reconciliation
                  statements.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full" role="presentation">
            <Image
              src="/assets/images/office-image.png"
              alt="Enterprise reconciliation features visualization"
              width={605}
              height={544}
              className="h-auto w-full rounded-lg"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
