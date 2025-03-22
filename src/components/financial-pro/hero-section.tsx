"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";
import { motion } from "framer-motion";

export default function FinancialHero() {
  return (
    <section
      className="w-full py-8 lg:pb-[29px] lg:pt-[143px] bg-gray-100 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-[64px] lg:gap-4">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 max-w-[780px]"
          >
            <div className="space-y-6">
              <h1
                id="hero-heading"
                className="font-inter text-[32px] text-center lg:text-left sm:text-[45px] md:text-[48px] leading-[1.2] tracking-[-0.02em] font-semibold text-[#101828]"
              >
                Reconcile Bank Accounts with AI
              </h1>

              <p className="font-inter text-base text-center lg:text-left sm:text-lg md:text-[20px] leading-[1.5] md:leading-[30px] text-[#475467]">
                As a financial professional, managing accurate financial records
                is a must. But reconciling multiple bank statements and
                transactions manually can be time-consuming and prone to errors.
                That’s where ReconXi comes in.
              </p>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className=" flex items-center"
          >
            <div className="w-full max-w-[570px] lg:h-[417px] -my-4">
              <Image
                src="/assets/images/financial-hero.svg"
                alt="Financial reconciliation visualization"
                width={460}
                height={640}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
