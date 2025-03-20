"use client";
import React from "react";
import Image from "next/image";
import Container from "../Container";
import { motion } from "framer-motion";

const features = [
  {
    title: "Completely Free to Start",
    description:
      "Get started with free bank reconciliation software, no upfront costs.",
  },
  {
    title: "No More Spreadsheets",
    description:
      "AI-driven automated reconciliation software simplifies your workflow.",
  },
  {
    title: "Easy for Any Business",
    description:
      "Whether you're a freelancer, startup, or small business, enjoy free online bank reconciliation with ease.",
  },
  {
    title: "Scales as You Grow",
    description: "Upgrade to affordable plans as your business needs increase.",
  },
];
export default function WhyReconXi() {
  return (
    <section
      className="py-10 md:py-20 px-0 lg:px-20"
      aria-labelledby="why-reconxi-title"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <h2
            id="why-reconxi-title"
            className="w-full text-[24px] sm:text-[32px] md:text-[36px] leading-[1.2] md:leading-[44px] font-semibold text-[#101828] text-center tracking-[-0.02em] mb-8 md:mb-12"
          >
            Why Financial Professionals Need ReconXi
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6 md:space-y-8 w-full"
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <Image
                src="/assets/images/small-business-ft.svg"
                alt="Visual representation of ReconXi features"
                width={580}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
