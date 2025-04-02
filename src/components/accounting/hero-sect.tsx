'use client'
import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'
import TypeWriterButton from '../buttons/TypeWriterButton'
import { smoothScroll } from '@/utils/smoothScroll'
import { useSession } from 'next-auth/react'

export default function EnterpriseHero() {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    smoothScroll('demo-form')
  }

  return (
    <section
      className="w-full overflow-hidden bg-white py-2 md:py-4"
      aria-labelledby="hero-heading"
    >
      <Container>
        <div className="flex flex-col items-start gap-8 md:items-center lg:flex-row">
          {/* Left Content */}
          <div className="max-w-[640px] flex-1">
            <div className="flex w-full flex-col items-center gap-4 lg:items-start">
              <p className="text-left text-xs font-medium text-[#5C5C5C] md:text-base">
                Save time, reduce errors, and gain real-time insights
              </p>
              <h1
                id="hero-heading"
                className="font-inter text-[32px] leading-[1.2] font-bold tracking-[-0.02em] text-[#292D32] md:text-[40px] lg:text-left"
              >
                Enhance Your
                <br />
                Reconciliation Accounting
              </h1>

              <p className="font-inter text-base leading-[1.5] text-[#5C5C5C] md:text-[20px] md:leading-[30px] lg:text-left">
                Accounting and audit firms need reliable reconciliation
                accounting. Ensure accuracy, reduce errors, and stay compliant
                with every transaction.
              </p>
              <div className="flex items-center gap-4">
                <TypeWriterButton
                  path={isAuthenticated ? '/dashboard' : '/file-upload'}
                  aria-label={
                    isAuthenticated
                      ? 'Access Your Dashboard'
                      : 'Start Reconciliation'
                  }
                  text={
                    isAuthenticated
                      ? 'Access Your Dashboard'
                      : 'Start Reconciliation'
                  }
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[8px] bg-[#297B65] px-4 py-2 text-sm font-semibold text-white hover:bg-[#297B65]/90 sm:w-52"
                />
                {/* <button className="bg-[#2E604A] px-5 md:px-6 py-2 md:py-3 rounded-[8px]  text-white cursor-pointer hover:opacity-75 transition">Start Reconciliation</button> */}
                <button
                  onClick={handleDemoClick}
                  className="cursor-pointer rounded-[8px] border border-[#C0C0C0] bg-white px-5 py-2 text-[#2E604A] transition hover:opacity-75 md:px-6 md:py-3"
                >
                  Book Demo
                </button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex w-full flex-1 items-center justify-center">
            <div className="relative mx-auto min-h-[255px] min-w-full max-md:-ml-7 md:min-h-[428px] md:min-w-[613px]">
              <Image
                src="/assets/images/accounting-hero-img.png"
                alt="Buisness people in office"
                fill
                className="h-full w-full md:object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
