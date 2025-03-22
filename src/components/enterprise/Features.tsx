"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/src/components/Container";
import { motion } from "framer-motion";

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
  return (
    <section
      className="w-full py-20 px-0 lg:px-20"
      aria-labelledby="features-heading"
    >
      <Container>
        <div className="flex flex-col gap-12">
          {/* Image - Moves to top on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            {/* Left Content - Feature List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 max-w-[560px] w-full my-auto"
            >
              <div className="space-y-0">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="border-l-4 border-[#2E604A] py-4 pl-6"
                  >
                    <h3 className="font-inter text-[20px] leading-[30px] font-semibold text-[#333333] mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-inter text-[16px] leading-[24px] font-normal text-[#475467]">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              <Link href={"/demo"}>
                <button
                  type="button"
                  className="h-[44px] px-6 mt-4 py-3 bg-[#2E604A] text-white rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/90 cursor-pointer"
                  aria-label="Open signup modal"
                >
                  Get a Free Demo
                </button>
              </Link>
            </motion.div>

            {/* Right Image - Hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
