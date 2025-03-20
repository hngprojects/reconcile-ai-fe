"use client";
import React from "react";
import Image from "next/image";
import Container from "@/src/components/Container";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const DemoForm = dynamic(() => import("@/src/app/demo/demo-form"));

export default function StartReconcile() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <Image
              src="/assets/images/ready-smallbusiness.svg"
              alt="Reconciliation Demo"
              width={580}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <h2
                id="ready-section-title"
                className="font-inter text-[27px] text-center sm:text-[32px] md:text-[36px] leading-[1.2] md:leading-[74px] font-semibold text-[#101828]"
              >
                Get a Personalized Walkthrough
              </h2>
            </div>

            {/* Demo Form Section */}
            <div className=" rounded-lg">
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
