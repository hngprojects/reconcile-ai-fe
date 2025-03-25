"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";
import { smoothScroll } from "@/src/utils/smoothScroll";

const features = [
  {
    title: "Handle High-Volume Transactions",
    description:
      "Perfect for large organizations dealing with numerous bank statements and transactions.",
  },
  {
    title: "Faster Financial Operations",
    description:
      "Reconcile accounts and manage financial statements at scale in minutes, not hours.",
  },
  {
    title: "AI-Powered Reconciliation Accuracy",
    description:
      "Automate transaction matching with AI, ensuring accuracy and eliminating human errors in your financial records..",
  },
];

export default function Features() {
  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScroll("demo-form");
  };

  return (
    <section
      className="w-full py-20 px-0 lg:px-20"
      aria-labelledby="features-heading"
    >
      <Container>
        <div className="flex flex-col gap-12">
          {/* Image - Moves to top on mobile */}
          <div
            className="w-full lg:hidden"
            role="presentation"
          >
            <Image
              src="/assets/images/screen-mockup.png"
              alt="Enterprise reconciliation features visualization"
              width={536}
              height={410}
              className="w-full h-auto rounded-lg border-4 border-[#101828]"
              priority={false}
            />
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            {/* Left Content - Feature List */}
            <div
              className="flex-1 max-w-[560px] w-full my-auto"
            >
              <div className="space-y-0 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-[#2E604A] py-4 pl-6"
                  >
                    <h3 className="font-inter text-[20px] leading-[30px] font-semibold text-[#333333] mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-inter text-[16px] leading-[24px] font-normal text-[#475467]">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleDemoClick}
                className="h-[44px] inline-flex items-center px-6 py-3 bg-[#2E604A] text-white rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/90 cursor-pointer"
                aria-label="Open signup modal"
              >
                Get a Free Demo
              </button>
            </div>

            {/* Right Image - Hidden on mobile */}
            <div
              className="hidden lg:block flex-1 border-4 border-[#101828] rounded-lg overflow-hidden"
              role="presentation"
            >
              <Image
                src="/assets/images/screen-mockup.png"
                alt="Enterprise reconciliation features visualization"
                width={536}
                height={410}
                className="w-full h-auto"
                priority={false}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
