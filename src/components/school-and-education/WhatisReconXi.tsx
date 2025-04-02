'use client'

import React from 'react'
import Image from 'next/image'
import Container from '../Container'

const features = [
  'Matches general ledger transactions automatically',
  'Tracks and reconciles tuition fees and expenses',
  'Keeps financial records audit-ready',
]

export default function WhatisReconXi() {
  return (
    <section
      className="w-full px-4 py-16 sm:px-6 md:px-12 lg:px-20"
      aria-labelledby="why-reconxi-title"
    >
      <Container>
        <div className="mx-auto flex w-full max-w-[1232px] flex-col items-start gap-10 md:flex-row md:justify-between md:gap-16">
          {/* Text Section */}
          <div className="inline-flex max-w-[500px] flex-1 flex-col items-start justify-center gap-6 pt-[2rem] text-left">
            <h2 className="mb-0 text-sm font-medium text-[#475467] uppercase sm:text-base md:text-lg">
              ABOUT US
            </h2>
            <h2
              id="why-reconxi-title"
              className="font-inter mt-0 text-xl leading-normal font-semibold tracking-[-0.02em] text-[#292D32] sm:text-2xl md:text-[40px]"
            >
              What is ReconXi?
            </h2>
            <p className="sm:max-w[500rem] text-sm leading-relaxed text-[#475467] sm:text-base md:text-lg">
              ReconXi helps schools and educational institutions automate
              financial reconciliation, ensuring accurate tracking of student
              payments, tuition, and school expenses.
            </p>
            <div role="list" className="space-y-4">
              {features.map((description, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start gap-4"
                  role="listitem"
                >
                  {/* Custom SVG Checkmark */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_8127_3508)">
                        <path
                          d="M7.5 12.5L10.5 15.5L16.5 9.5M22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5Z"
                          stroke="#297B65"
                          strokeWidth="2.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_8127_3508">
                          <rect
                            y="0.5"
                            width="24"
                            height="24"
                            rx="12"
                            fill="white"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <p className="font-inter text-base leading-[144%] font-medium text-[#292D32] sm:text-lg md:text-[20px]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="flex w-full justify-end md:w-[55%]">
            <Image
              src="/assets/images/whatisreconxi.svg"
              alt="ReconXi interface preview"
              width={600}
              height={400}
              className="h-auto w-full max-w-[600px] rounded-lg shadow-lg"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
