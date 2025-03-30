"use client";
import Image from "next/image";
import { CheckCircle2Icon } from "lucide-react";
import Container from "./Container";
import { FileIcon, SpeedIcon } from "./Icon/Icons";

const Features = () => {
  const firstFeature = ["Leverage AI to move fast", "Easy upload feature"];
  const secondFeature = [
    "Instant records matching",
    "Clear status indicators: Matched, Unmatched",
    "Export data quickly",
  ];

  return (
    <section>
      <Container className="py-12 px-4 sm:py-16 md:px-8 lg:px-16">
        <div className="flex text-center items-center justify-center flex-col mb-6 sm:mb-8">
          <h3
            className="text-3xl font-semibold mb-2 text-[#101828] leading-snug tracking-tight 
            sm:text-4xl sm:leading-11 
            md:text-5xl md:leading-tight"
          >
            Simple Steps to Get Started
          </h3>
          <p className="text-base sm:text-lg max-w-[768px] text-[#475467]">
            Self-serve product to help you reconcile your bank statement and
            company ledger with AI.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-12 lg:gap-16">
          {/* First Feature */}
          <div className="w-full text-center sm:mt-6 lg:mt-9 items-center sm:items-start sm:text-left flex flex-col">
            <div className="flex items-center justify-center w-12 h-12 bg-[#B0F1D4] border-7 border-[#C8FFE6] rounded-full mb-3">
              <FileIcon />
            </div>

            <h3 className="text-2xl sm:text-3xl font-semibold mb-3 text-[#101828]">
              Upload Financial & Customer Records
            </h3>

            <p className="text-base sm:text-lg max-w-[560px] text-[#475467] mb-4">
              Upload bank statement and company ledger in just a few clicks. The
              only supported file format is CSV.
            </p>

            <ul className="list-none self-start flex flex-col gap-2 items-start">
              {firstFeature.map((feature, index) => (
                <li key={index} className="flex items-start text-start pl-4">
                  <CheckCircle2Icon
                    className="text-primary mr-2 sm:mr-3 w-4 sm:w-5 h-4 sm:h-5"
                    aria-hidden="true"
                  />
                  <span className="text-sm sm:text-lg text-[#475467]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* First Image */}
          <div className="w-full relative flex items-center justify-center h-64 sm:h-80 lg:h-[400px]">
            <Image
              src="/assets/images/picture1.png"
              fill
              alt="file upload page"
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-start justify-between w-full pt-8 lg:pt-16 gap-12 lg:gap-16">
          {/* Second Image */}
          <div className="w-full relative flex items-center justify-center h-64 sm:h-80 lg:h-[400px]">
            <Image
              src="/assets/images/picture2.png"
              fill
              alt="Reconciliation dashboard"
              className="object-contain"
            />
          </div>

          {/* Second Feature */}
          <div className="w-full text-center items-center sm:items-start sm:mt-6 lg:mt-9 sm:text-left flex flex-col">
            <div className="flex items-center justify-center w-12 h-12 bg-[#B0F1D4] border-7 border-[#C8FFE6] rounded-full mb-3">
              <SpeedIcon />
            </div>

            <h3 className="text-2xl sm:text-3xl font-semibold mb-3 text-[#101828]">
              Let AI do the Work
            </h3>

            <p className="text-base sm:text-lg max-w-[560px] text-[#475467] mb-4">
              Watch as AI automatically matches your records.
            </p>

            <ul className="list-none self-start flex flex-col gap-2 items-start">
              {secondFeature.map((feature, index) => (
                <li key={index} className="flex items-start text-start pl-4">
                  <CheckCircle2Icon
                    className="text-primary mr-2 sm:mr-3 w-4 sm:w-5 h-4 sm:h-5"
                    aria-hidden="true"
                  />
                  <span className="text-sm sm:text-lg text-[#475467]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Features;