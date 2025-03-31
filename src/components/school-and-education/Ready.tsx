'use client'

import React from 'react'
import Image from 'next/image'
import Container from '@/components/Container'

export default function StartReconcile() {
  return (
    <section
      className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-10 bg-[#F9FAFB] px-6 py-6 md:px-12 md:py-16 lg:flex-row lg:gap-[40px] lg:px-[143px] lg:py-[80px]"
      id="demo-form"
    >
      <Container>
        <div className="flex w-full flex-col items-center justify-center gap-6 md:gap-10 lg:flex-row lg:gap-[40px]">
          {/* Image Section - Appears below form on mobile, first on large screens */}
          <div className="order-1 w-full max-w-[398.667px] flex-shrink-0 overflow-hidden rounded-[18px] lg:order-none">
            <Image
              src="/assets/images/education-contact.svg"
              alt="Education contact illustration"
              width={398.667}
              height={598}
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Form Section - Appears first on mobile, second on large screens */}
          <div className="order-0 flex w-full max-w-full flex-col items-center gap-6 rounded-[18px] bg-white p-4 shadow-lg sm:max-w-[95%] sm:p-2 md:max-w-[85%] md:gap-8 md:p-8 lg:order-none lg:max-w-[624px] lg:gap-[32px] lg:p-[40px]">
            <div className="w-full text-left">
              <h2 className="text-xl font-semibold text-gray-900 md:text-2xl lg:text-3xl">
                Get Started Today
              </h2>
              <p className="mt-2 text-sm text-gray-600 md:text-base lg:text-lg">
                Manage your school&apos;s general ledger with ease - Get
                automated reconciliation today.
              </p>
            </div>

            <form className="flex w-full flex-col gap-4 md:gap-6">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700 md:text-base">
                  Full Name
                </span>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#2E604A] focus:outline-none md:px-4 md:py-3"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700 md:text-base">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="email@address.com"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#2E604A] focus:outline-none md:px-4 md:py-3"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700 md:text-base">
                  Phone Number
                </span>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#2E604A] focus:outline-none md:px-4 md:py-3"
                />
              </label>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-md bg-[#2E604A] py-3 text-sm font-semibold text-white hover:bg-[#2e6d51] md:text-base"
              >
                Get A Free Demo
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
