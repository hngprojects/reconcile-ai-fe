"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../Container";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = [
  {
    title: "Instant Bank Reconciliation Accounting",
    description:
      "Upload your bank statements and let AI do the work",
  },
  {
    title: "Automated Reconciliation Software",
    description:
      "Say goodbye to manual tracking and errors.",
  },
  {
    title: "Accurate Financial Reports",
    description:
      "Get a detailed bank reconciliation statement with just a click.",
  },
  {
    title: "100% Free for limited Use",
    description:
      "No hidden fees. Just fast, effortless reconciliation.",
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
           Why Freelancers Need ReconXi
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
              <Link href={'/demo'}>
                <button
                  type="button"
                  className="h-[44px] px-6 mt-6 py-3 bg-[#2E604A] text-white rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/90 cursor-pointer"
                  aria-label="Open signup modal"
                >
                  Get a Free Demo
                </button>
                </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <Image
                src="/assets/images/freelancer-small2.svg"
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
