"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const DemoForm = dynamic(() => import("@/src/app/demo/demo-form"));

export default function StartReconcile() {
  return (
    <section
      className="py-10 px-0 lg:px-20 md:py-20 bg-white"
      aria-labelledby="ready-section-title"
    >
      <Container>
        <div className="flex flex-col w-full lg:flex-row gap-8 lg:gap-10 items-center">
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
              width={520}
              height={850}
              className="w-full h-auto rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full items-center space-y-6 md:space-y-8"
          >
            <div className="space-y-3 md:space-y-4 w-full">
              <h2
                id="ready-section-title"
                className="font-inter text-[27px] w-full text-center sm:text-[32px] md:text-[36px] font-semibold text-[#101828]"
              >
                Get a Personalized Walkthrough
              </h2>
             
            </div>

            <div
              className="rounded-lg mx-auto"
              aria-label="Start free trial form"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <DemoForm buttonText="Schedule Your Free Enterprise Demo Today" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
