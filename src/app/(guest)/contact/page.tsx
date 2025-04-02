'use client'

import { motion } from 'framer-motion'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import ContactUsForm from '@/components/form/ContactUsForm'

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
        ease: 'easeOut',
        delay: i * 0.1,
      },
    }),
  }

  return (
    <div>
      <div className="px-[24px] pt-[47px] md:bg-[#FAFAFA] md:py-14">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
          className="mx-auto mb-[58px] flex max-w-[996px] flex-col items-center md:mb-[64px]"
        >
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0}
            variants={textVariants}
            className="rounded-[16px] bg-[#E6FFF2] px-3 py-2 text-[20px] text-[#009A49]"
          >
            Contact Us
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.5}
            variants={textVariants}
            className="my-2 text-[28px] font-medium text-[#0A0A0A] sm:text-[35px] md:text-[45px] lg:text-[64px]"
          >
            Get in <span className="text-[#2E604A]">touch with</span> us today
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
            className="mx-auto max-w-[694px] text-center text-[18px]"
          >
            Have questions, feedback, or need assistance? Our team is here to
            help and support you every step of the way. Get in touch with us
            today.
          </motion.p>
        </motion.div>
        <div className="mx-auto flex max-w-[1261px] justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
              delay: 0.5,
            }}
            className="w-full max-w-[663px] rounded-lg md:border md:border-[rgba(82,82,82,0.2)] md:p-8"
          >
            <ContactUsForm />
          </motion.div>
        </div>
      </div>
      <CTASection />
      <Footer />
    </div>
  )
}

export default Contact
