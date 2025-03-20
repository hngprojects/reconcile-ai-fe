"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
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
                Best Account Reconciliation Software
              </h1>

              <p className="font-inter text-base text-center lg:text-left sm:text-lg md:text-[20px] leading-[1.5] md:leading-[30px] text-[#475467]">
                The best financial platform to automate transactions, spot
                errors, and keep your books balanced.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-fit mt-7 mx-auto lg:mx-0"
              >
                <Link
                  href="/file-upload"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-[#2E604A] rounded-lg hover:bg-[#2E604A]/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E604A]"
                  aria-label="Start enterprise reconciliation"
                >
                  Start Reconciliation
                </Link>
              </motion.div>
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
                alt="Enterprise reconciliation visualization"
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
