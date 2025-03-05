import React from "react";
import Image from "next/image";

export default function Features1() {
  return (
    <main className="max-w-[90rem] mx-auto my-[6rem] overflow-x-hidden relative lg:h-[512px] ">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24 h-full max-w-[1280px] pr-6 lg:pr-0">
        <div className="flex flex-col items-start gap-[32px] flex-[1_0_0]">
          <div className="flex flex-col items-start gap-[24px] self-stretch">
            <p className="w-[341.333px] h-[24px] text-[#2A5743] font-inter text-[16px] font-semibold leading-[24px]">
              Problem Statement
            </p>
            <div
              className="flex flex-col items-start gap-[16px] self-stretch"
            >
              <h1 className="self-stretch text-[#101828] font-inter text-[36px] font-semibold leading-[44px] tracking-[-0.72px]">
                Financial Reconciliation Doesn’t Have to Be Hard
              </h1>
              <p className="self-stretch text-[#475467] font-inter text-[18px] font-normal leading-[28px]">
                Spending hours matching transactions manually? Errors slipping
                through the cracks? Our tool makes reconciliation simple and
                error-free, so you can focus on what really matters.
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-[768px] h-[512px] justify-end items-center flex-[1_0_0] ">
          <div
            className="relative md:h-[500px] h-[300px] lg:h-full w-full "
          >
            <Image
              src="/assets/images/screen-mockup.png"
              alt="screen mockup"
              width={768}
              height={512}
              className="flex-shrink-0 rounded-[10px] bg-gray-300 bg-[50%] bg-cover bg-no-repeat border-[4px] border-[#101828] "
            />
          </div>
        </div>
      </div>
    </main>
  );
}
