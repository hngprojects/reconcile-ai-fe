"use client";

import { motion } from "framer-motion";
import CTASection from "@/src/components/CTASection";
import Footer from "@/src/components/Footer";
import ContactUsForm from "@/src/components/form/ContactUsForm";

const Contact = () => {
  // Text animation variants for smoother transitions
  const textVariants = {
    hidden: { 
      opacity: 0, 
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut", 
        delay: i * 0.1 
      }
    })
  };

  return (
    <div>
      <div className="md:bg-[#FAFAFA] pt-[47px] px-[24px] md:py-14">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut" 
          }}
          className="max-w-[996px] mx-auto flex flex-col items-center mb-[58px] md:mb-[64px]"
        >
          <motion.p 
            initial="hidden"
            animate="visible"
            custom={0}
            variants={textVariants}
            className="bg-[#E6FFF2] rounded-[16px] py-2 px-3 text-[20px] text-[#009A49]"
          >
            Contact Us
          </motion.p>
          <motion.h1 
            initial="hidden"
            animate="visible"
            custom={0.5}
            variants={textVariants}
            className="my-2 font-medium text-[28px] sm:text-[35px] md:text-[45px] lg:text-[64px] text-[#0A0A0A]"
          >
            Get in <span className="text-[#2E604A]">touch with</span> us today
          </motion.h1>
          <motion.p 
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
            className="text-center text-[18px] max-w-[694px] mx-auto"
          >
            Have questions, feedback, or need assistance? Our team is here to
            help and support you every step of the way. Get in touch with us
            today.
          </motion.p>
        </motion.div>
        <div className="max-w-[1261px] mx-auto flex justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.4, 
              ease: "easeOut", 
              delay: 0.5 
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