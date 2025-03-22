"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";
import { motion } from "framer-motion";

export default function Features1() {
  return (
    <section className="w-full py-12 md:py-20" aria-labelledby="features-title">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
        >
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 border-4 border-[#101828] rounded-lg overflow-hidden bg-[#101828]"
            role="presentation"
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

          {/* Right Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 flex flex-col gap-4 md:gap-6"
          >
            <h2
              id="features-title"
              className="font-inter text-[28px] sm:text-[32px] md:text-[36px] leading-[1.2] md:leading-[44px] font-semibold text-[#101828]"
            >
              Struggling with manual bank reconciliations?
            </h2>

            <p className="font-inter text-base sm:text-lg md:text-[18px] leading-[1.5] md:leading-[28px] font-normal text-[#475467]">
              Schools and educational institutions handle numerous transactions
              daily – from student fees and payroll to administrative expenses.
              Manual reconciliation can be time-consuming, error-prone, and
              tedious. <br></br>With ReconXi, you can automate the process,
              reduce the risk of mistakes, and focus on what truly matters:
              educating students and running your institution.<br></br>{" "}
              <strong className="font-bold">
                ReconXi gives you a better way!
              </strong>
            </p>
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
        </motion.div>
      </Container>
    </section>
  );
}
