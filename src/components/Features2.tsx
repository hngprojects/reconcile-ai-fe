"use client";
import Image from "next/image";
import { CheckCircle2Icon } from "lucide-react";
import Container from "./Container";
import { FileIcon, SpeedIcon } from "./Icon/Icons";
import { motion } from "framer-motion";

const Features = () => {
  const firstFeature = ["Leverage AI to move fast", "Easy upload feature"];
  const secondFeature = [
    "Instant records matching",
    "Clear status indicators: Matched, Unmatched",
    "Export data quickly",
  ];

  // const thirdFeature = [
  //   "Filter and analyze data quickly",
  //   "Export reports in multiple formats",
  //   "Automate report scheduling",
  // ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section>
      <Container className="py-6 sm:py-12">
        <motion.div
          className="flex text-center items-center justify-center flex-col mb-9 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h3
            className="text-4xl font-semibold mb-2 sm:mb-4 text-[#101828] leading-11 tracking-[-0.02em] sm:text-[32px] sm:leading-[40px] 
            md:text-[36px] md:leading-[44px] 
            lg:text-[40px] lg:leading-[48px]"
          >
            Simple Steps to Get Started
          </h3>
          <p className="sm:text-lg max-w-[768px] text-[#475467]">
            Self-serve product to help you reconcile your bank statement and
            company ledger with AI.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-start justify-between w-full gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="w-full text-center sm:mt-9 items-center sm:items-start sm:text-left flex flex-col"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center justify-center w-12 h-12 bg-[#B0F1D4] border-7 border-[#C8FFE6] rounded-full mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FileIcon />
            </motion.div>

            <h3 className="text-3xl font-semibold mb-4 text-[#101828]">
              Upload Financial & Customer Records
            </h3>

            <p className="sm:text-lg max-w-[560px] text-[#475467] mb-6">
              Upload bank statement and company ledger in just a few clicks. The
              only supported file format is CSV.
            </p>

            <motion.ul
              className="list-none self-start flex flex-col gap-3 items-start"
              variants={containerVariants}
            >
              {firstFeature.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start text-start pl-4"
                  variants={listItemVariants}
                >
                  <CheckCircle2Icon
                    className="text-primary mr-3 w-5 sm:w-6 h-5 sm:h-6"
                    aria-hidden="true"
                  />
                  <span className="sm:text-lg text-[#475467]">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="w-full relative flex items-center h-[400px]"
            variants={itemVariants}
          >
            <Image
              src="/assets/images/FILE UPLOAD.svg"
              fill
              alt="Reconciliation dashboard"
              className="border-[3.13px] border-[#101828] rounded-[7.61px] object-contain"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col-reverse sm:flex-row items-start justify-between w-full pt-10 sm:pt-28 gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="w-full relative flex items-center h-[400px]"
            variants={itemVariants}
          >
            <Image
              src="/assets/images/feature2-mockup.svg"
              fill
              alt="Reconciliation dashboard"
              className="border-[3.13px] border-[#101828] rounded-[7.61px] object-contain"
            />
          </motion.div>

          <motion.div
            className="w-full text-center items-center sm:items-start sm:mt-9 sm:text-left flex flex-col"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center justify-center w-12 h-12 bg-[#B0F1D4] border-7 border-[#C8FFE6] rounded-full mb-3"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <SpeedIcon />
            </motion.div>

            <h3 className="text-3xl font-semibold mb-4 text-[#101828]">
              Let AI do the Work
            </h3>

            <p className="sm:text-lg max-w-[560px] text-[#475467] mb-6">
              Watch as AI automatically matches your records.
            </p>

            <motion.ul
              className="list-none flex self-start flex-col gap-3 items-start"
              variants={containerVariants}
            >
              {secondFeature.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start text-start pl-4"
                  variants={listItemVariants}
                >
                  <CheckCircle2Icon
                    className="text-primary mr-3 w-5 sm:w-6 h-5 sm:h-6"
                    aria-hidden="true"
                  />
                  <span className="sm:text-lg text-[#475467]">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
        {/* <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-16">
          <div className="w-full text-center sm:mt-9 sm:text-left flex flex-col">
            <div className="flex items-center justify-center w-12 h-12 bg-[#B0F1D4] border-7 border-[#C8FFE6] rounded-full mb-3 ">
              <ReportIcon />
            </div>

            <h3 className="text-3xl font-semibold mb-4 text-[#101828]">
              Easily see your matched and unmatched records.
            </h3>

            <p className="sm:text-lg max-w-[560px] text-[#475467] mb-6">
              View your matched records with a green status tag "Matched" and your unmatched records with a red status tag "Unmatched". 
            </p>

            <ul className="list-none flex flex-col gap-3 items-start">
              {thirdFeature.map((feature, index) => (
                <div key={index} className="flex items-center pl-4">
                  <CheckCircle2Icon className="text-primary mr-3 w-5 sm:w-6 h-5 sm:h-6" />
                  <span className="sm:text-lg text-[#475467]">{feature}</span>
                </div>
              ))}
            </ul>
          </div>

          <div className="w-full relative flex items-center h-[400px]">
            <Image
              src="/assets/images/Features-3-image.png"
              fill
              alt="Reconciliation dashboard"
              className="border-[3.13px] border-[#101828] rounded-[7.61px] object-cover"
            />
          </div>
        </div> */}
      </Container>
    </section>
  );
};

export default Features;
