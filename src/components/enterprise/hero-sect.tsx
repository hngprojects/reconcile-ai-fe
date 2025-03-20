"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/src/components/Container";
import { motion } from "framer-motion";

export default function EnterpriseHero() {
  return (
    <section
      className="w-full py-2 md:py-4 bg-white overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 max-w-[640px]"
          >
            <div className="space-y-6 md:space-y-8">
              <h1
                id="hero-heading"
                className="font-inter text-[32px] sm:text-[45px] md:text-[48px] leading-[1.2] tracking-[-0.02em] font-semibold text-[#101828]"
              >
                Enterprise-Grade Reconciliation for Precise Financial Control
              </h1>

              <p className="font-inter text-base sm:text-lg md:text-[20px] leading-[1.5] md:leading-[30px] text-[#475467]">
                Automate reconciliation, eliminate compliance risks, and achieve
                unmatched financial accuracy.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-fit"
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
            className="flex-1 flex justify-end"
          >
            <div className="w-full max-w-[460px] -my-4">
              <Image
                src="/assets/images/enterprise-hero.svg"
                alt="Enterprise reconciliation visualization"
                width={460}
                height={640}
                className="w-full h-auto rounded-tl-[160px]"
                priority
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
