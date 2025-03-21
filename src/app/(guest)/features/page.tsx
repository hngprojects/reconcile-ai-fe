"use client";
import Footer from "@/src/components/Footer";
import { featuresData } from "@/src/data/featuresData";
import { FileIcon } from "@/src/components/Icon/Icons";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <div className="w-full">
      <div className="pt-[50px] pb-[74px] md:pt-[56px] md:pb-[147px] px-[24px] lg:px-[80px] w-full flex flex-col items-center">
        <motion.div
          className="py-[10px] md:py-[14px] w-full flex flex-col items-center mb-[40px] md:mb-[64px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="bg-[#E6FFF2] rounded-[16px] py-1 px-3 text-[20px] text-[#2E604A] mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            Features
          </motion.p>
          <motion.h1
            className="text-[28px] md:text-[42px] lg:text-[60px] font-medium max-w-[1084x] text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Simplify and enhance your financial reconciliation process with
            ReconXi
          </motion.h1>
          <motion.p
            className="text-[18px] text-center text-[#525252]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Automate bank reconciliation tasks and enhance accuracy to keep your finances in perfect balance.

          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[27px] md:gap-[32px] justify-center">
          {featuresData.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="bg-[#FAFAFA] border border-[#CBD5E1] p-6 flex flex-col items-center rounded-[6px] max-w-[624px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[#B0F1D4] border-7 border-[#C8FFE6] rounded-full">
                <FileIcon />
              </div>
              <h3 className="text-[20px] text-[#0A0A0A] font-medium text-center mt-6 mb-4">
                {feature.title}
              </h3>
              <p className="text-[18px] text-[#525252] text-center">
                {feature.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Features;
