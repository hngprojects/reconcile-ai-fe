"use client";
import CTASection from "@/src/components/CTASection";
import Footer from "@/src/components/Footer";
import { getFormattedCurrentDate } from "@/src/helpers/getCurrentDate";
import { motion } from "framer-motion";

export default function TermsConditionPage() {
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: i * 0.1,
      },
    }),
  };

  // Content section animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: i * 0.1,
      },
    }),
  };

  const currentDate = getFormattedCurrentDate()

  return (
    <main>
      <div className="font-inter">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#F5FAF8] flex flex-col items-center justify-center p-10 lg:py-16 lg:px-64"
        >
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0}
            variants={textVariants}
            className="bg-[#E6FFF2] rounded-lg py-2 px-3 text-[1rem]"
          >
            Current as of {currentDate}
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.5}
            variants={textVariants}
            className="my-2 font-bold text-[1.5rem] lg:text-[2rem]"
          >
            Terms and Conditions
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
            className="text-center text-sm"
          >
            By accessing our product, you are agreeing to be bound by these
            terms of service, all applicable laws and regulations, and agree
            that you are responsible for compliance with any applicable local
            laws.
          </motion.p>
        </motion.div>

        <div className="p-3 lg:py-5 lg:px-64 ">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={1}
            variants={sectionVariants}
            className="my-5"
          >
            <h2 className="text-[#101828] text-[1.5rem] font-semibold mb- text-center lg:text-start">
              Introduction
            </h2>
            <p className="text-sm text-center lg:text-start text-[#475467]">
              ReconXi is a financial reconciliation tool that uses AI to
              reconcile bank statement with company ledger.
            </p>
          </motion.div>

          <motion.div
            className="mt-5"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={sectionVariants}
          >
            <h2 className="text-[#101828] text-[1.5rem] font-semibold text-center lg:text-start">
              What Information do we Collect?
            </h2>
            <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              We collect information to deliver and improve our reconciliation
              tool, including:
            </p>
            <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              Transactional Data: Details of financial records, i.e bank
              statement.
            </p>
            <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              Company Data: Details of your Company&apos;s records. i.e bank
              statement.
            </p>
            {/* <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              Personal Information: Such as account details, names, email
              addresses, and phone numbers provided during registration or
              service use.
            </p> */}
            {/* <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              Usage Data: Log files, device information, and analytics that help
              us understand how you interact with our platform.
            </p> */}
            {/* <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              Other Data: Additional information you provide or that is
              automatically collected to enhance your experience.
            </p> */}
          </motion.div>

          {/* <div className="mt-5">
            <h2 className="text-[#101828] text-[1.5rem] font-semibold text-center lg:text-start">
              How do we use your Information?
            </h2>
            <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              We collect information to deliver and improve our reconciliation
              services, including:
            </p>
            <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              Transactional Data: Details of financial records, i.e bank statement.
            </p>
            <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              Company Data: Details of your Company&apos;s records. i.e bank statement.
            </p> */}
          {/* <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              Personal Information: Such as account details, names, email
              addresses, and phone numbers provided during registration or
              service use.
            </p>
            <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              Usage Data: Log files, device information, and analytics that help
              us understand how you interact with our platform.
            </p>
            <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              Other Data: Additional information you provide or that is
              automatically collected to enhance your experience.
            </p> */}
          {/* </div> */}

          {/* <div className="mt-5">
            <h2 className="text-[#101828] text-[1.5rem] font-semibold text-center lg:text-start">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              We use cookies and similar technologies to:
            </p>
            <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              Personalize your experience and remember your preferences.
            </p>
            <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              Analyze website traffic and improve our services.
            </p>
            <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              Deliver tailored content and advertisements.
            </p>
            <p className="text-sm  text-center lg:text-start text-[#475467] py-2">
              You can manage your cookie preferences through your browser
              settings.
            </p>
          </div> */}
          {/* <div className="mt-5">
            <h2 className="text-[#101828] text-[1.5rem] font-semibold text-center lg:text-start py-2">
              Retention of Your Information
            </h2>
            <p className="text-sm  text-center lg:text-start text-[#475467] py-1">
              We retain your data only as long as necessary to fulfill the
              purposes for which it was collected, including compliance with
              legal and regulatory obligations. Once the retention period
              expires, we will securely delete or anonymize your information.
            </p>
          </div> */}
          {/* <div className="mt-5">
            <h2 className="text-[#101828] text-[1.5rem] font-semibold  text-center lg:text-start py-2">
              Data Security
            </h2>
            <p className="text-sm  text-center lg:text-start text-[#475467]">
              We implement industry-standard security measures to protect your
              data from unauthorized access, disclosure, or misuse. While we
              strive for maximum security, please be aware that no system is
              completely foolproof.
            </p>
          </div> */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={sectionVariants}
            className="mt-5"
          >
            <h2 className="text-[#101828] text-[1.5rem] font-semibold text-center lg:text-start py-2">
              Your Privacy Rights.
            </h2>
            <p className="text-sm text-center lg:text-start text-[#475467]">
              You may have rights regarding your financial information, For more
              detailed information, please review our Privacy Policy.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={sectionVariants}
            className="mt-5"
          >
            <h2 className="text-[#101828] text-[1.5rem] font-semibold text-center lg:text-start">
              Contact Us
            </h2>
            <p className="text-sm text-center lg:text-start text-[#475467] py-2">
              If you have any questions about these Terms and Conditions or our
              privacy policy, please contact us at:
            </p>
            <p className="text-sm text-center lg:text-start text-[#475467] py-2">
              Email: support@reconxi.com
            </p>
            <p className="text-sm text-center lg:text-start text-[#475467] py-2">
              Phone Number: +1-599-654-7936
            </p>
            <p className="text-sm text-center lg:text-start text-[#475467] py-2">
              Address: Chicago, United States
            </p>
            <p className="text-sm text-center lg:text-start text-[#475467] py-2">
              We are committed to addressing privacy concerns promptly and
              transparently.
            </p>
          </motion.div>
        </div>
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
