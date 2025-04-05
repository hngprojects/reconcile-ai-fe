'use client'
import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'
import { useSession } from 'next-auth/react'
import TypeWriterButton from '@/components/buttons/TypeWriterButton'

export default function HeroSection() {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <section
      className="w-full bg-gray-50 px-0 py-10 pb-0 md:py-20"
      aria-labelledby="hero-title"
    >
      <Container>
        <div className="grid items-center gap-6 lg:grid-cols-2 xl:gap-10">
          <div className="flex flex-col items-center space-y-4 md:space-y-6 lg:items-start">
            <h1 className="text-center text-3xl leading-[1.2] font-bold tracking-tighter text-[#292D32] sm:text-4xl lg:text-left xl:text-5xl">
              Free bank transaction reconciliation software for small business
              owners
            </h1>
            <p className="max-w-[600px] text-center text-[#2E2E2E] md:text-xl lg:text-left">
              ReconXi is a free online fast and accurate AI-powered revenue
              reconciliation software for startup founders and small business
              owners.
            </p>
            <div className="pt-4">
              <TypeWriterButton
                path={isAuthenticated ? '/dashboard' : '/file-upload'}
                aria-label={
                  isAuthenticated
                    ? 'Access Your Dashboard'
                    : 'Get Started For Free'
                }
                text={
                  isAuthenticated
                    ? 'Access Your Dashboard'
                    : 'Get Started For Free'
                }
                className="mr-auto flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-[#297B65] px-4 py-2 text-sm font-semibold text-white hover:bg-[#297B65]/90 sm:w-64"
              />
            </div>
          </div>
          <div className="relative hidden h-[300px] sm:h-[400px] md:block">
            <Image
              src="/assets/images/small-Business-desktop.png"
              alt="Small business owner using ReconXi software"
              fill
              className="h-full w-full object-contain"
              priority
            />
          </div>
        </div>
        <div className="mt-10 block md:mt-16 md:hidden">
          <div className="relative h-[300px] overflow-hidden rounded-lg">
            <Image
              src="/assets/images/serious-business.png"
              alt="Business owners working with ReconXi software"
              width={800}
              height={300}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
