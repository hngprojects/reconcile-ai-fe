"use client";

import { motion } from "framer-motion";
import CTASection from "@/src/components/CTASection";
import Footer from "@/src/components/Footer";
import Link from "next/link";

const PrivacyPage = () => {
  // Text animation variants for smoother transitions
  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 10 
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut", 
        delay: i * 0.1 
      }
    })
  };

  // Content section animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
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
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex justify-center md:py-[110px] py-[48px] px-6 bg-[#F5FAF8]"
      >
        <div className="text-center">
          <motion.p 
            initial="hidden"
            animate="visible"
            custom={0}
            variants={textVariants}
            className="text-[#009A49] bg-[#E6FFF2] px-3 py-1 text-sm rounded-2xl inline-block w-fit mb-6 mx-auto"
          >
            Privacy
          </motion.p>

          <motion.h1 
            initial="hidden"
            animate="visible"
            custom={0.5}
            variants={textVariants}
            className="md:text-[60px] text-4xl font-semibold mb-6"
          >
            How We <span className="text-[#2E604A]">Protect</span> Your
            Information
          </motion.h1>

          <motion.p 
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
            className="text-md text-[#525252]"
          >
            Find advice and answers from our support team
          </motion.p>
        </div>
      </motion.header>

      {/* table of content section */}
      <section className="py-12 px-6 bg-[#F9FAFB]">
        <div className="flex justify-center">
          <div className="max-w-[1120px] w-full flex lg:flex-row flex-col lg:gap-22 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-[306px] w-full"
            >
              <h2 className="md:text-4xl text-3xl mb-2 font-semibold">
                Table of Content
              </h2>

              <ul className="list-disc pl-5">
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="font-semibold text-[16px] mb-2"
                >
                  Introductions
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="font-semibold text-[16px] mb-2"
                >
                  Information We Collect
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="font-semibold text-[16px] mb-2"
                >
                  How We Use Your Information
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="font-semibold text-[16px] mb-2"
                >
                  Data Sharing and Security
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="font-semibold text-[16px] mb-2"
                >
                  Your choices and Rights
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="font-semibold text-[16px] mb-2"
                >
                  Policy Updates
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="font-semibold text-[16px] mb-2"
                >
                  Contact Us 
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="font-semibold text-[16px] mb-2"
                >
                  Last Updated
                </motion.li>
              </ul>
            </motion.div>

            <div>
              <motion.div 
                initial="hidden"
                animate="visible"
                custom={1}
                variants={sectionVariants}
                className="mb-6"
              >
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  Introduction
                </h3>

                <p className="font-normal text-[16px] text-[#475467] ">
                  At ReconXi, we value your privacy and are committed to
                  safeguarding your personal information. This Privacy Policy
                  explains what data we collect, how we use it, and the steps we
                  take to ensure its security. By using our services, you agree
                  to the terms outlined in this policy.
                </p>
              </motion.div>

              <motion.div 
                initial="hidden"
                animate="visible"
                custom={2}
                variants={sectionVariants}
                className="mb-6"
              >
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  Information We Collect
                </h3>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  We collect information to deliver and improve our
                  reconciliation services, including:
                </p>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                Account Information: Name, email, and authentication details if signing up via Google.
                </p>
                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  Transactional Data: Details of financial records, transfers,
                  and reconciliation transactions.
                </p>
                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  Payment Information: When upgrading to a paid plan via Stripe, we process your payment securely but do not store sensitive payment details.
                </p>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  Usage Data: Log files, device information, and analytics that
                  help us understand how you interact with our platform.
                </p>

                <p className="font-normal text-[16px] text-[#475467] ">
                  Other Data: Additional information you provide or that is
                  automatically collected to enhance your experience.
                </p>
              </motion.div>

              <motion.div 
                initial="hidden"
                animate="visible"
                custom={3}
                variants={sectionVariants}
                className="mb-6"
              >
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  How We Use Your Information
                </h3>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                We use your information to:
                </p>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                Provide and enhance our reconciliation services.
                </p>
                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                Allow seamless login and authentication via Google.
                </p>
                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                Process secure payments via Stripe.
                </p>
                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                Send account-related emails, including security updates and transaction confirmations.
                </p>
                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                Improve platform functionality through analytics and user insights.
                </p>
                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                Ensure compliance with legal and regulatory requirements.
                </p>
              </motion.div>

              <motion.div 
                initial="hidden"
                animate="visible"
                custom={4}
                variants={sectionVariants}
                className="mb-6"
              >
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  Data Sharing and Security
                </h3>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  We do not sell your personal information to third parties.{" "}
                </p>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or misuse.
                </p>
                <p className="font-normal text-[16px] text-[#475467] ">
                While we strive for maximum security, please be aware that no system is completely foolproof.
                </p>
              </motion.div>

              <motion.div 
                initial="hidden"
                animate="visible"
                custom={5}
                variants={sectionVariants}
                className="mb-6"
              >
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  Your Choices and Right
                </h3>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  You have certain rights regarding your personal information,
                  including:{" "}
                </p>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  Access & Correct Your Data: Update or modify your account details anytime.
                </p>
                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                Delete Your Data: Request data deletion, subject to compliance with legal obligations.
                </p>
                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                Manage Cookies & Tracking: Adjust settings in your browser to control cookies and tracking mechanisms.
                </p>
                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                Email Preferences: Opt in or out of receiving marketing and service-related emails.
                </p>
              </motion.div>

              <motion.div 
                initial="hidden"
                animate="visible"
                custom={6}
                variants={sectionVariants}
                className="mb-6"
              >
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  Policy Updates
                </h3>

                <p className="font-normal text-[16px] text-[#475467] ">
                We may revise this Privacy Policy periodically. Any updates will be posted on our platform, and significant changes will be communicated to you.
                </p>
              </motion.div>

              <motion.div 
                initial="hidden"
                animate="visible"
                custom={7}
                variants={sectionVariants}
                className="mb-6"
              >
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  Contact Us
                </h3>

                <p className="font-normal text-[16px] text-[#475467] ">
                  For any privacy-related concerns, reach out to us at{" "}
                  <Link className="font-medium" href="mailto:support@reconxi.com">support@reconxi.com</Link>.
                </p>
              </motion.div>

              <motion.div 
                initial="hidden"
                animate="visible"
                custom={8}
                variants={sectionVariants}
                className="mb-6"
              >
                <h3 className="mb-[10px] md:text-2xl text-2xl font-semibold ">
                  Last Updated
                </h3>

                <p className="font-normal text-[16px] mb-4 text-[#475467] ">
                  This Privacy Policy was last updated on 25/03/2025.
                </p>

                <p className="font-normal text-[16px] text-[#475467] ">
                  For more information about our terms and conditions, please
                  visit our <Link className="underline font-medium" href="/terms-conditions">Terms and Conditions</Link> page.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* try it for free */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default PrivacyPage;