"use client";
import React from "react";
import Image from "next/image";
import Container from "../Container";

const benefits = [
  {
    description:
      "Simplify your finances with smart reconciliation accounting.",
  },
  {
    description:
      "Automate bank reconciliation accounting – Reduce errors & save time.",
  },
  {
    description:
      "Simplify your account reconciliation statement – Accurate & fast.",
  },
  {
    description:
      "Stay audit-ready with stress-free account reconciliation statements.",
  }
];

export default function WhyReconXi() {
  return (
    <section className="py-10 md:py-20" aria-labelledby="why-reconxi-title">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-[64px] w-full  mx-auto">
          {/* Left Content - Descriptions First on Mobile */}
          <div className="w-full md:w-[674px] flex-shrink-0">
            <h2
              id="why-reconxi-title"
              className="text-[22px] sm:text-[28px] md:text-[36px] leading-[1.2] md:leading-[44px] font-semibold text-[#101828] pb-8"
            >
             What is ReconXi?
            </h2>
            <p className="font-inter text-base pb-10 sm:text-lg md:text-[20px] leading-[1.5] md:leading-[30px] text-[#2E2E2E]">
            ReconXi is built for accounting and audit firms to simplify reconciliation accounting. With precise financial tracking and automated reconciliation, firms can ensure compliance, eliminate discrepancies, and maintain accurate records for audits and reporting.
            </p>

            <div role="list" className="space-y-4 md:space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex gap-3 md:gap-4 items-start"
                  role="listitem"
                >
                  <div className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-[#EAEFED] rounded-full p-1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full"
                    >
                      <g clipPath="url(#clip0_8127_3755)">
                        <path
                          d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                          stroke="#297B65"
                          strokeWidth="2.33"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_8127_3755">
                          <rect width="24" height="24" rx="12" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <p className="text-[14px] sm:text-[16px] md:text-[20px] leading-[24px] font-[500] text-[#2E2E2E]">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image Responsive */}
          <div className="w-full md:w-[605px] md:h-[544px] flex justify-center items-center">
            <div className="relative w-full max-w-[605px] aspect-[605/544]">
              <Image
                src="/assets/images/Small-hero.png"
                alt="Visual representation of ReconXi features"
                fill
                className="object-contain rounded-xl shadow-md"
                sizes="(max-width: 768px) 100vw, 605px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}