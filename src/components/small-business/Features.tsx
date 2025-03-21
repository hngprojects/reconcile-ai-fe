"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/src/components/Container";
import { motion } from "framer-motion";

export default function Features1() {
  return (
    <section
      className="w-full py-12 md:py-20 px-0 lg:px-20"
      aria-labelledby="features-title"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 border-4 border-[#101828] rounded-lg overflow-hidden bg-[#101828]"
          >
            <Image
              src="/assets/images/screen-mockup.png"
              alt="Screenshot of ReconXi's reconciliation interface"
              width={536}
              height={410}
              className="object-cover w-full h-full"
              priority={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 flex flex-col gap-6"
          >
            <h2
              id="features-title"
              className="font-inter text-[28px] sm:text-[32px] md:text-[36px] leading-[1.2] md:leading-[44px] font-semibold text-[#101828]"
            >
              Tired of Manual Bank Reconciliations?
            </h2>

            <div className="flex flex-col gap-6">
              <p className="font-inter text-base sm:text-lg md:text-[18px] leading-[1.5] md:leading-[28px] font-normal text-[#475467]">
                As a startup or small business owner, tracking transactions and
                balancing books can be time-consuming and prone to errors.
                Spreadsheets and expensive software aren't the answer.
              </p>

              <p className="font-inter text-base sm:text-lg md:text-[18px] leading-[1.5] md:leading-[28px] font-bold text-[#475467]">
                ReconXi offers a smarter, faster way to reconcile your bank
                statements and keep your finances on track.
              </p>

              <div className="mt-2">
                <Link
                  href="/demo"
                  className="inline-block px-6 py-3 bg-[#2E604A] text-white rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/90 transition-colors"
                >
                  Get a Free Demo
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
