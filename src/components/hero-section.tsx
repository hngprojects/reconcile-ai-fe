'use client'
import React from 'react'
import Image from 'next/image'
import TypeWriterButton from './buttons/TypeWriterButton'
import { useSession } from 'next-auth/react'

export default function HeroSection() {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <section className="overflow-x-hidden pt-8 md:pt-0">
      <div className="mx-auto flex w-screen max-w-[90rem] flex-col items-center gap-8 overflow-hidden max-md:p-4 max-md:text-center md:h-[602px] md:pl-14 lg:flex-row">
        <div className="flex w-full flex-col items-center md:items-start">
          <h1 className="max-w-[1024px] flex-wrap text-[28px] leading-[-2] font-semibold text-[#101828] md:text-4xl lg:text-5xl lg:leading-[3.5rem]">
            AI-Powered Financial
            <br className="hidden md:block" />
            Reconciliation with
            <br className="hidden md:block" />
            ReconXi
          </h1>
          <p className="mt-6 max-w-[620px] text-left text-sm text-[#475467] max-md:text-center sm:text-xl md:pr-8">
            ReconXi is built to take the effort out of financial reconciliation.
            Whether you&apos;re managing bank statements, company ledgers, or
            school accounts, our AI identifies and matches transactions quickly
            and accurately.
          </p>
          <div className="my-6 mt-8 flex w-[245px] flex-col items-center justify-center gap-6 sm:flex-row">
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

        {/* Hero Image for desktop */}
        <div className="relative hidden h-full w-full items-center lg:flex">
          <Image
            src="/assets/images/iphone_mockup-bg.svg"
            alt="Iphone mockup"
            width={314}
            height={440}
            className="absolute top-[8rem] right-[22rem] z-10 object-contain transition-transform duration-700 ease-in-out hover:scale-110"
            quality={75}
            priority={true}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAJBJREFUGFcljUEKwjAABHdjBTXvyFN66bnkVt8gaS59gEVQ0GPTJ5Q+qe+IQtNEQue4szCsqso01+YlKEgSCQkEASBN8/SgruvuZkyfl2NRYIsRCQBTghvHN7XWXdu2vRACUkqAhPceYV3hnNsP1to+i9PljJz5+S+2EDAMw4dlWRql1D3GeNjTGUKQcVmW5x9hfjTwri74OwAAAABJRU5ErkJggg=="
          />
          <Image
            src="/assets/images/screen_mockup_bg.svg"
            alt="Big screen mockup"
            width={621}
            height={782}
            className="absolute right-0 bottom-0 object-contain transition-transform duration-700 ease-in-out hover:scale-105"
            quality={75}
            priority={true}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAJBJREFUGFcljUEKwjAABHdjBTXvyFN66bnkVt8gaS59gEVQ0GPTJ5Q+qe+IQtNEQue4szCsqso01+YlKEgSCQkEASBN8/SgruvuZkyfl2NRYIsRCQBTghvHN7XWXdu2vRACUkqAhPceYV3hnNsP1to+i9PljJz5+S+2EDAMw4dlWRql1D3GeNjTGUKQcVmW5x9hfjTwri74OwAAAABJRU5ErkJggg=="
          />
        </div>

        {/* Hero Image for mobile */}
        <div className="relative w-full px-10 lg:hidden">
          <Image
            src="/assets/images/iphone_mockup-bg.svg"
            alt="Iphone mockup"
            width={180}
            height={252}
            className="absolute top-6 z-10 object-contain transition-transform duration-700 ease-in-out hover:scale-110"
            quality={75}
            priority={true}
          />
          <Image
            src="/assets/images/screen_mockup_bg.svg"
            alt="Big screen mockup"
            width={250}
            height={315}
            className="object-contain transition-transform duration-700 ease-in-out hover:scale-105"
            quality={75}
            priority={true}
          />
        </div>
      </div>
    </section>
  )
}
