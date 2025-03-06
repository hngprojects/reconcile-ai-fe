"use client";
import Image from "next/image";
import { CheckCircle2Icon } from "lucide-react";
import SadFaceModal from "./SadFaceModal";
import React, { useState } from "react";

const Features = () => {
 
  const firstFeature = [
    "Leverage automation to move fast",
    "Always give customers a human to chat to",
    "Easy drag-and-drop uploads",
  ];
  const secondFeature = [
    "Instant transaction matching",
    "Clear status indicators: Matched, Missing, Unmatched, Duplicate",
    "Manually match and override transactions.",
  ];

  const thirdFeature = [
    "Filter and analyze data quickly",
    "Export reports in multiple formats",
    "Automate report scheduling",
  ];

  return (
    <div className="px-4 my-[6rem]">
      <div className="flex items-center flex-col mb-16">
        <p className="text-[#2A5743] mb-[12px] font-semibold">How it Works</p>
        <h3 className="text-[28px] sm:text-[32px] md:text-[36px] font-semibold mb-[20px] leading-[36px] text-[#101828] sm:leading-[40px] md:leading-[44px] tracking-[-0.02em] text-center ">
          Analytics that feels like it&apos;s from the future
        </h3>
        <p className="text-[18px] sm:text-[20px] font-normal leading-[28px] text-[#475467] sm:leading-[30px] tracking-[0] text-center">
          Powerful, self-serve product and growth analytics to help you convert,
          engage, and retain more users.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 lg:px-[80px] py-8 lg:py-0 gap-10 lg:gap-24">
        <div className="w-full lg:w-[560px] flex flex-col">
          <div className="flex items-center justify-center w-[48px] h-[48px] bg-[#AEEACA] rounded-full mb-3 lg:mb-[12px] self-center lg:self-start">
            <Image
              src="./assets/images/upload-icon.svg"
              width={19}
              height={19}
              alt="Feature Icon"
            />
          </div>

          <h3 className="text-2xl lg:text-[30px] font-semibold mb-4 text-center lg:text-left text-[#101828]">
            Upload Financial & Customer Records
          </h3>

          <p className="text-base lg:text-[18px] text-[#475467] mb-6 text-center lg:text-left">
            Effortlessly upload financial statements and customer records in
            just a few clicks. Supported file formats: PDF, XLS, CSV.
          </p>

          <ul className="list-none flex flex-col items-center lg:items-start">
            {firstFeature.map((feature, index) => (
              <div key={index} className="flex items-center mb-4 pl-[16px]">
                <CheckCircle2Icon className="text-[#297B65] mr-3 w-6 h-6" />
                <span className="text-base lg:text-[18px] text-[#475467]">
                  {feature}
                </span>
              </div>
            ))}
          </ul>
        </div>

        <div className="w-full lg:w-[600px] relative flex items-center h-[400px] max-w-[500px] mx-auto">
          <Image
            src="/assets/images/File_upload.svg"
            fill
            alt="Reconciliation dashboard"
            className="border-[3.13px] border-[#101828] rounded-[7.61px] object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full px-4 lg:px-[80px] py-8 lg:py-[100px] gap-10 lg:gap-24">
        <div className="w-full lg:w-[600px] relative flex items-center h-[400px] max-w-[500px] mx-auto">
          <Image
            src="/assets/images/AI_reconciliation.svg"
            fill
            alt="Reconciliation dashboard"
            className="border-[3.13px] border-[#101828] rounded-[7.61px] object-contain"
          />
        </div>
        <div className="w-full lg:w-[560px] flex flex-col">
          <div className="flex items-center justify-center w-[48px] h-[48px] bg-[#AEEACA] rounded-full mb-3 lg:mb-[12px] self-center lg:self-start">
            <Image
              src="./assets/images/zap-icon.svg"
              width={19}
              height={19}
              alt="Feature Icon"
            />
          </div>

          <h3 className="text-2xl lg:text-[30px] font-semibold mb-4 text-center lg:text-left text-[#101828]">
            Let AI do the Work
          </h3>

          <p className="text-base lg:text-[18px] text-[#475467] mb-6 text-center lg:text-left">
            Watch as Ai automatically matches your transactions based on amount,
            description and date.
          </p>

          <ul className="list-none flex flex-col items-center lg:items-start">
            {secondFeature.map((feature, index) => (
              <div key={index} className="flex items-center mb-4 pl-[16px]">
                <CheckCircle2Icon className="text-[#297B65] mr-3 w-6 h-6" />
                <span className="text-base lg:text-[18px] text-[#475467]">
                  {feature}
                </span>
              </div>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 lg:px-[80px] py-8 lg:py-0 gap-10 lg:gap-24">
        <div className="w-full lg:w-[560px] flex flex-col">
          <div className="flex items-center justify-center w-[48px] h-[48px] bg-[#AEEACA] rounded-full mb-3 lg:mb-[12px] self-center lg:self-start">
            <Image
              src="./assets/images/feature-icon.svg"
              width={19}
              height={19}
              alt="Feature Icon"
            />
          </div>

          <h3 className="text-2xl lg:text-[30px] font-semibold mb-4 text-center lg:text-left text-[#101828]">
            Real-Time Insights & Reporting
          </h3>

          <p className="text-base lg:text-[18px] text-[#475467] mb-6 text-center lg:text-left">
            Gain deeper insights with interactive reports. Filter, drill down,
            and export reconciliation summaries with ease.
          </p>

          <ul className="list-none flex flex-col items-center lg:items-start">
            {thirdFeature.map((feature, index) => (
              <div key={index} className="flex items-center mb-4 pl-[16px]">
                <CheckCircle2Icon className="text-[#297B65] mr-3 w-6 h-6" />
                <span className="text-base lg:text-[18px] text-[#475467]">
                  {feature}
                </span>
              </div>
            ))}
          </ul>
        </div>

        <div className="w-full lg:w-[600px] relative h-[400px] max-w-[500px] mx-auto">
          <Image
            src="/assets/images/Features-3-image.png"
            fill
            alt="Reconciliation dashboard"
            className="border-[3.13px] border-[#101828] rounded-[7.61px] object-cover"
          />
        </div>
      </div>

    </div>

 
  );
};

export default Features;
