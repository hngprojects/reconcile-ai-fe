"use client";
import React from "react";
import Container from "./Container";
import { motion } from "framer-motion";
import StartReconciliationButton from "./buttons/StartReconciliationButton";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CTASection = () => {
  return (
    <div className="bg-gray-50 sm:bg-white">
      <Container className="py-8">
        <motion.div
          className="flex flex-col items-center gap-8 sm:gap-10 bg-gray-50 justify-between px-5 py-10 sm:p-16 sm:rounded-xl sm:flex-row sm:px-7 sm:py-12 md:items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div
            className="space-y-3 text-center sm:text-left sm:space-y-4 md:w-2/3"
            variants={childVariants}
          >
            <p className="font-bold text-gray-900 text-3xl">Try ReconXi Now!</p>
            <p className="text-[#475467] text-xl sm:text-lg max-w-[43rem]">
              Unlock faster and smarter financial reconciliation today.
            </p>
          </motion.div>
          <motion.div variants={childVariants}>
            <StartReconciliationButton
              text="Get Started"
              className="bg-primary whitespace-nowrap w-full sm:w-fit py-2 px-4 rounded-md font-semibold justify-center items-center h-12 sm:h-9 text-sm text-white hover:bg-primary/90 flex cursor-pointer"
              aria-label="Get started with ReconXi"
            />
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default CTASection;
