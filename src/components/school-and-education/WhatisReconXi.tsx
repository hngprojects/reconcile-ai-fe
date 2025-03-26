"use client";

import React from "react";
import Image from "next/image";
import Container from "../Container";

const features = [
  "Matches general ledger transactions automatically",
  "Tracks and reconciles tuition fees and expenses",
  "Keeps financial records audit-ready",
];

export default function WhatisReconXi() {
  return (
    <section
      className="py-16 px-6 sm:px-12 lg:px-20"
      aria-labelledby="why-reconxi-title"
    >
      <Container>
        <div className="flex flex-col md:flex-row items-start max-w-[1232px] w-full mx-auto gap-10 md:gap-16 md:justify-between">
          {/* Text Section */}
          <div className="flex-1 pt-[3rem] inline-flex flex-col justify-center items-start gap-8 text-left max-w-[500px]">
            <h2 className="text-[#475467] text-sm sm:text-base md:text-lg font-medium uppercase">
              ABOUT US
            </h2>
            <h2
              id="why-reconxi-title"
              className="text-xl sm:text-2xl md:text-[40px] font-semibold text-[#292D32] font-inter tracking-[-0.02em] leading-normal"
            >
              What is ReconXi?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#475467] leading-relaxed">
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
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
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
                  <p className="text-base sm:text-lg md:text-[20px] text-[#292D32] font-inter font-medium leading-[144%]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-end w-full md:w-[55%]">
            <Image
              src="/assets/images/whatisreconxi.svg"
              alt="ReconXi interface preview"
              width={600}
              height={400}
              className="w-full max-w-[600px] h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
