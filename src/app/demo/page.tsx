'use client'

import { motion } from 'framer-motion'
import DemoForm from './demo-form'
import Footer from '@/components/Footer'

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
            className="mb-4 text-4xl font-bold text-[#333333] md:text-5xl"
          >
            Get a free <span className="text-[#2E604A]">Demo</span> and
          </motion.h1>
          <motion.h2
            initial="hidden"
            animate="visible"
            custom={2}
            variants={textVariants}
            className="mb-8 text-4xl font-bold text-gray-800 md:text-5xl"
          >
            Automate Your Financial Reconciliation
          </motion.h2>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={3}
            variants={textVariants}
            className="mb-12 max-w-2xl text-lg text-[#333333]"
          >
            Experience the power of AI-driven financial reconciliation. Fill out
            the form below to get a free personalized Demo of ReconXi.
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
            <DemoForm />
          </motion.div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 1,
          }}
          className="w-full border-t border-gray-200 py-6 text-center text-gray-600"
        >
          <p>Your data is secured and will not be shared.</p>
        </motion.footer>
      </div>
      <Footer />
    </main>
  )
}
