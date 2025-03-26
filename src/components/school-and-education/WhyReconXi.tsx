"use client";
import React from "react";
import Image from "next/image";
import Container from "../Container";
import { smoothScroll } from "@/src/utils/smoothScroll";

const features = [
  {
    description:
      "Simplifies general ledger reconciliation – Match school transactions with accuracy.",
  },
  {
    description:
      "Reduces errors in payment reconciliation – Keep track of tuition and school expenses.",
  },
  {
    description:
      "Organizes financial records – Ensure audit-ready financial management.",
  },
  {
    description:
      "Saves time for finance teams – Automate reconciliation and focus on other tasks.",
  },
  {
    description:
      "Works for all educational institutions – From small schools to large universities.",
  },
];

export default function WhyReconXi() {
  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScroll("demo-form");
  };

  return (
    <section className="py-10 md:py-20" aria-labelledby="why-reconxi-title">
      <Container>
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-[64px] w-full max-w-[1232px] mx-auto">
          {/* Left Content - Descriptions First on Mobile */}
          <div className="w-full md:w-[674px] flex-shrink-0 gap-6 md:gap-[48px]">
            <h2
              id="why-reconxi-title"
              className="text-[22px] sm:text-[28px] md:text-[36px] leading-[1.2] md:leading-[44px] font-semibold text-[#101828] pb-8"
            >
              Benefits of Using ReconXi <br className="hidden md:block" /> for
              Schools
            </h2>

            <div role="list" className="space-y-4 md:space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-3 md:gap-4 items-start"
                  role="listitem"
                >
                  <div className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
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
                  <p className="text-[14px] sm:text-[16px] md:text-[20px] leading-[24px] text-[#767676] mb-3">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={handleDemoClick}
              className="h-[40px] md:h-[44px] px-5 flex items-center justify-center bg-[#2E604A] text-white rounded-lg font-semibold text-sm md:text-base hover:bg-[#26533E] cursor-pointer"
              aria-label="Open signup modal"
            >
              Book A Demo
            </button>
          </div>

          {/* Right Side - Image Appears Below on Mobile */}
          <div className="w-full md:w-[494px] flex justify-center">
            <Image
              src="/assets/images/small-education.svg"
              alt="Visual representation of ReconXi features"
              width={494}
              height={616}
              className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[494px] h-auto rounded-xl shadow-md"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
