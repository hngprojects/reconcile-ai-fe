"use client";
import React from "react";
import Image from "next/image";
import Container from "../Container";
import { smoothScroll } from "@/src/utils/smoothScroll";

const features = [
  {
    title: "Automated Bank Reconciliation",
    description:
      "Reconcile multiple bank statements in a fraction of the time with AI-powered matching technology.",
  },
  {
    title: "Accurate & Reliable Results",
    description:
      "Reduce human errors in reconciliation with automated transaction matching..",
  },
  {
    title: "Quick Reconciliation Setup",
    description:
      " Simply upload your bank statements in CSV format and let ReconXi take care of the rest.",
  },
  {
    title: "Save Time with ReconXi",
    description:
      "Spend less time on manual checks and more time providing insights to your clients or company.",
  },
];

export default function WhyReconXi() {
  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScroll("demo-form");
  };

  return (
    <section
      className="py-10 md:py-20 px-0 lg:px-20"
      aria-labelledby="why-reconxi-title"
    >
      <Container>
        <div
          className="flex flex-col items-center"
        >
          <h2
            id="why-reconxi-title"
            className="w-full text-[24px] sm:text-[32px] md:text-[36px] leading-[1.2] md:leading-[44px] font-semibold text-[#101828] text-center tracking-[-0.02em] mb-8 md:mb-12"
          >
            Why Financial Professionals Need ReconXi
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
            <div
              className="flex-1 space-y-6 md:space-y-8 w-full"
            >
              <div role="list" className="space-y-6 md:space-y-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4" role="listitem">
                    <div
                      className="flex-shrink-0 flex items-center justify-center my-auto"
                      aria-hidden="true"
                    >
                      <Image
                        src="/assets/images/check-icon.svg"
                        alt="Check icon"
                        width={28}
                        height={28}
                        className="w-[23px] h-[23px] lg:w-7 lg:h-7"
                      />
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <h3 className="font-inter text-base sm:text-lg md:text-[20px] leading-tight md:leading-[30px] font-semibold text-[#101828]">
                        {feature.title}
                      </h3>
                      <p className="font-inter text-sm sm:text-base md:text-[16px] leading-normal md:leading-[24px] text-[#101828]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleDemoClick}
                className="h-[44px] px-6 py-3 bg-[#2E604A] text-white rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/90 cursor-pointer ml-8"
                aria-label="Open signup modal"
              >
                Get a Free Demo
              </button>
            </div>

            <div
              className="flex-1"
            >
              <Image
                src="/assets/images/small-business-ft.svg"
                alt="Visual representation of ReconXi features"
                width={580}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
