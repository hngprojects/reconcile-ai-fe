"use client";

import CTASection from "@/src/components/CTASection";
import Footer from "@/src/components/Footer";
import ContactUsForm from "@/src/components/form/ContactUsForm";
import { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  };


const Contact = () => {

  return (
    <div>
      <div className="md:bg-[#FAFAFA] pt-[47px] px-[24px] md:py-14">
        <motion.div
          className="max-w-[996px] mx-auto flex flex-col items-center mb-[58px] md:mb-[64px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="bg-[#E6FFF2] rounded-[16px] py-2 px-3 text-[20px] text-[#009A49]"
            variants={itemVariants}
          >
            Contact Us
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="my-2 font-medium text-[28px] sm:text-[35px] md:text-[45px] lg:text-[64px] text-[#0A0A0A]"
          >
            Get in <span className="text-[#2E604A]">touch with</span> us today
          </motion.h1>
          <motion.p
            className="text-center text-[18px] max-w-[694px] mx-auto"
            variants={itemVariants}
          >
            Have questions, feedback, or need assistance? Our team is here to
            help and support you every step of the way. Get in touch with us
            today.
          </motion.p>
        </motion.div>
        <div className="max-w-[1261px] mx-auto flex justify-center">

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              ease: "easeOut", 
              delay: 0.6 
            }}
            className="w-full rounded-lg md:border md:border-[rgba(82,82,82,0.2)] max-w-[663px] md:p-8"
          >
            <ContactUsForm />
          </motion.div>
        </div>
      </div>
      <CTASection />
      <Footer />
    </div>
  );
};

export default Contact;
