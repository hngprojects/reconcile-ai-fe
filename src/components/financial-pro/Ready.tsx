"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";
import { motion } from "framer-motion";
import DemoForm from "@/src/app/demo/demo-form";

export default function StartReconcile() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-10 md:py-20 px-0 lg:px-20 bg-white"
      aria-labelledby="ready-section-title"
      id="demo-form"
    >
      <Container>
        <div className="flex flex-col w-full lg:flex-row gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full min-w-[300px]"
          >
            <Image
              src="/assets/images/ready-smallbusiness.svg"
              alt="Visual representation of ReconXi's reconciliation process"
              width={680}
              height={850}
              className="w-full h-auto rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full space-y-6 md:space-y-8 justify-center"
          >
            <div className="space-y-3 md:space-y-4">
              <h2
                id="ready-section-title"
                className="font-inter text-[27px] text-center sm:text-[32px] md:text-[36px] leading-[1.2] md:leading-[74px] font-semibold text-[#101828]"
              >
                Ready to Reconcile Smarter?
              </h2>
              <p className="font-inter text-base text-center sm:text-lg md:text-[20px] leading-[1.5] md:leading-[30px] text-[#475467]">
                Join thousands of small businesses using ReconXi&apos;s free
                bank reconciliation software to simplify accounting.
              </p>
            </div>

            <div
              className="rounded-lg  mx-auto"
              aria-label="Start free trial form"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full"
              >
                <DemoForm buttonText="Get your Demo" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
