"use client";
import React from "react";
import Image from "next/image";
import Container from "../Container";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = [
  {
    title: "Completely Free to Start",
    description:
      "Get started with ReconXi’s free, AI-powered reconciliation tool—no upfront fees.",
  },
  {
    title: "Reduce Manual Work",
    description:
      "Say goodbye to tedious spreadsheets and manual reconciliation. Let AI do the heavy lifting for you.",
  },
  {
    title: "Designed for Educational Institutions",
    description:
      "Whether it’s managing student fee payments, payroll for staff, or general accounts, ReconXi’s automated solution streamlines all your financial data.",
  },
  {
    title: "Easily Scalable",
    description:
      "As your institution grows, ReconXi grows with you—handling increased transactions and complexity as needed.",
  },
];

export default function WhyReconXi() {
  return (
    <section className="py-10 md:py-20" aria-labelledby="why-reconxi-title">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <h2
            id="why-reconxi-title"
            className="text-[28px] sm:text-[32px] md:text-[36px] leading-[1.2] md:leading-[44px] font-semibold text-[#101828] text-center tracking-[-0.02em] mb-8 md:mb-12"
          >
           How can ReconXi make reconciliation easier for your school?
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
                    className="flex-shrink-0 w-6 sm:w-7 h-6 sm:h-7 rounded-full border-[2.33px] border-[#297B65] flex items-center justify-center my-auto"
                    aria-hidden="true"
                  >
                    <Check className="w-3 sm:w-4 h-3 sm:h-4 text-[#297B65]" />
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
                src="/assets/images/small-education.svg"
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