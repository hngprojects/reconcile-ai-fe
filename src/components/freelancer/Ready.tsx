"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const DemoForm = dynamic(() => import("@/src/app/demo/demo-form"));

export default function StartReconcile() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-10 md:py-20 bg-white"
      aria-labelledby="ready-section-title"
      id="demo-form"
    >
      <Container>
        <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="w-full">
              <Image
                src="/assets/images/freelancer-contact.svg"
                alt="Visual representation of ReconXi's reconciliation process"
                width={536}
                height={410}
                className="rounded-lg shadow-lg object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 580px"
                priority={false}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6 md:space-y-8"
          >
            <div className="space-y-3 md:space-y-4">
              <h2
                id="ready-section-title"
                className="font-inter text-[27px] text-center sm:text-[32px] md:text-[36px] leading-[1.2] md:leading-[74px] font-semibold text-[#101828]"
              >
                Ready to Reconcile Smarter?
              </h2>
              <p className="font-inter text-base text-center sm:text-lg md:text-[20px] leading-[1.5] md:leading-[30px] text-[#475467]">
                Join thousands of financial professionals using ReconXi&apos;s
                free bank reconciliation software to simplify accounting.
              </p>
            </div>

            <div className="rounded-lg" aria-label="Start free trial form">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
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
