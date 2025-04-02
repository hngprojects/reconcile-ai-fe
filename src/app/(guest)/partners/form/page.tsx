'use client'

import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import PartnerForm from '@/components/form/PartnersForm'

export default function Home() {
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
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
          className="flex w-full max-w-3xl flex-1 flex-col items-center px-4 py-[59px] text-center"
        >
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
            className="mb-4 text-5xl font-bold text-[#333333] md:text-5xl"
          >
            Join the ReconXi Community
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={3}
            variants={textVariants}
            className="mb-12 max-w-2xl text-lg text-[#475467]"
          >
            Thank you for your interest in partnering with ReconXi! Please fill
            out the form below, and our team will reach out to discuss
            partnership opportunities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
              delay: 0.5,
            }}
            className="w-full"
          >
            <PartnerForm />
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </main>
  )
}
