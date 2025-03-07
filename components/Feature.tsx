import React from "react";
import Image from "next/image";
import Container from "./Container";

export default function Features1() {
  return (
    <section>
      <Container className="py-10">
        <div className="flex flex-col justify-center lg:flex-row overflow-y-hidden items-center gap-10 lg:gap-24 h-full pr-0 lg:pr-0">
          {/* Left Text Section */}
          <div className="flex flex-col text-center sm:text-left items-start gap-[32px] flex-[1_0_0]">
            <div className="flex flex-col items-start gap-[24px] ">
              <p className="w-full text-primary font-inter font-semibold leading-[24px]">
                Problem Statement
              </p>
              <div className="flex flex-col items-start gap-[16px] self-stretch">
                <h1 className="text-[#101828] font-inter text-3xl sm:text-4xl font-semibold">
                  Financial Reconciliation Doesn’t Have to Be Hard
                </h1>
                <p className="text-[#475467] font-inter sm:text-lg">
                  Spending hours matching transactions manually? Errors slipping
                  through the cracks? Our tool makes reconciliation simple so you can focus on what really matters.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="flex w-fit h-fit justify-end items-center flex-[1_0_0] ml-auto">
            <div className="relative md:h-[500px] h-[300px] lg:h-full w-auto">
              <Image
                src="/assets/images/screen-mockup.png"
                alt="screen mockup"
                width={536}
                height={410}
                className="flex-shrink-0 rounded-[10px] bg-gray-300 bg-[50%] bg-cover bg-no-repeat border-[4px] border-[#101828]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
