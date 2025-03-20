"use client";
import React from "react";
import Container from "../Container";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "AI-Powered Accuracy",
    description:
      "No more human errors! Our intelligent system ensures all payments, fees, and other transactions are correctly matched, saving you time and preventing costly mistakes.",
  },
  {
    title: "Saves Hours of Work",
    description:
      "Automate your reconciliation processes and spend more time focusing on your institution’s core functions.",
  },
  {
    title: "Cost-Effective Solution",
    description:
      "Get access to advanced reconciliation features at an affordable price with a free starting plan.",
  },
  {
    title: "Scalable & Reliable",
    description:
      "Whether you're reconciling payments for a few students or managing financial records for a large school, ReconXi adapts to your needs.",
  },
];

export default function Benefits() {
  return (
    <section
      className="bg-[#F5F5F5] py-10 md:py-20"
      aria-labelledby="benefits-title"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <h2
            id="benefits-title"
            className="text-[28px] sm:text-[32px] md:text-[36px] leading-[1.2] md:leading-[44px] font-semibold text-[#101828] text-center tracking-[-0.02em] mb-8 md:mb-12"
          >
            Benefits of Using ReconXi
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-[1200px] mx-auto"
            role="list"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                role="listitem"
              >
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] leading-[1.3] md:leading-[32px] font-semibold text-[#2A2A2A] mb-3 md:mb-4">
                  {benefit.title}
                </h3>
                <p className="text-base sm:text-lg md:text-[18px] leading-[1.4] md:leading-[140%] text-[#3B3E45]">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
