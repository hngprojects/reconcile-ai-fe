"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";
import { motion } from "framer-motion";
import DemoForm from "@/src/app/demo/demo-form";

export default function StartReconcile() {
  return (
    <section
      className="py-10 px-0 lg:px-20 md:py-20 bg-white"
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
              src="/assets/images/ready-enterprise.svg"
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
            className="flex-1 w-full items-center space-y-6 md:space-y-8"
          >
            <div className="space-y-3 md:space-y-4">
              <h2
                id="ready-section-title"
                className="font-inter text-[27px] text-center sm:text-[32px] md:text-[36px] leading-[1.2] md:leading-[74px] font-semibold text-[#101828]"
              >
                Get A Free Demo From Us
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
                <DemoForm buttonText="Get your Demo" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
