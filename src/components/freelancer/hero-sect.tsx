"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";
import { motion } from "framer-motion";
import StartReconciliationButton from "../buttons/StartReconciliationButton";

export default function HeroSection() {
  return (
    <section
      className="w-full py-10 md:py-20 pb-0 bg-gray-50"
      aria-labelledby="hero-title"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4 md:gap-6"
        >
          <h1
            id="hero-title"
            className="max-w-[1156px] text-center font-inter text-[28px] sm:text-[45px] md:text-[60px] leading-[1.2] md:leading-[72px] tracking-[-0.02em] font-semibold text-[#101828]"
          >
            Stop Wasting Hours on Reconciliation - Let ReconXi Do It for You,
            Automatically!
          </h1>

          <p className="max-w-[1216px] text-center font-inter text-base sm:text-lg md:text-[20px] leading-[1.5] md:leading-[30px] font-normal text-[#475467] mt-2 md:mt-4">
            Tired of manually tracking income and expenses? ReconXi is the
            automated reconciliation software designed for freelancers like you.
            Get accurate bank reconciliation statements in seconds—no
            spreadsheets, no stress!{" "}
          </p>
          <motion.div
            className="flex flex-col items-center justify-center w-full gap-4 md:gap-6 my-4 md:my-6 sm:flex-row"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <StartReconciliationButton
              aria-label="Start your free reconciliation trial"
              className="bg-[#297B65] py-3 px-6 rounded-md font-semibold inline-flex justify-center items-center min-h-[48px] w-full sm:w-auto text-base text-white hover:bg-[#297B65]/90 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-[#297B65] focus:outline-none transition-colors"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 md:mt-16 w-full max-w-[1200px] mx-auto"
        >
          <div className="relative w-full aspect-[2/1]">
            <Image
              src="/assets/images/freelancer.svg"
              alt="Demonstration of ReconXi's reconciliation software interface"
              fill
              className="w-full h-auto object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
