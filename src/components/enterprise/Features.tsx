"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";
import { motion } from "framer-motion";

const features = [
  {
    title: "No More Complex Data Headaches",
    description:
      "Automate reconciliation for high-volume data, easily identifying errors and discrepancies.",
  },
  {
    title: "Reduce Compliance Risks",
    description:
      "Achieve precise financial control, protecting your enterprise from costly regulatory mistakes.",
  },
  {
    title: "Instant Financial Accuracy",
    description:
      "Quickly detect and fix financial issues before they become bigger problems, ensuring reliable reporting and decision-making.",
  },
];

export default function Features() {
  return (
    <section className="w-full py-20" aria-labelledby="features-heading">
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
