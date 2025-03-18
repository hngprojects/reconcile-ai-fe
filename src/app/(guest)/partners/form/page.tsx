"use client";

import { motion } from "framer-motion";
import Footer from "@/src/components/Footer";
import PartnerForm from "@/src/components/form/PartnersForm";

export default function Home() {
  // Text animation variants for smoother transitions
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: i * 0.2,
      },
    }),
  };

  return (
    <main className="min-h-screen flex flex-col ">
      <div className=" flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="flex-1 w-full max-w-3xl px-4 py-[59px] flex flex-col items-center text-center"
        >
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
            className="text-5xl md:text-5xl font-bold text-[#333333] mb-4"
          >
            Join the ReconXi Community
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={3}
            variants={textVariants}
            className="text-lg text-[#475467] mb-12 max-w-2xl"
          >
            Thank you for your interest in partnering with ReconXi! Please fill
            out the form below, and our team will reach out to discuss
            partnership opportunities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.6,
            }}
            className="w-full"
          >
            <PartnerForm />
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
