'use client'
import Footer from '@/components/Footer'
import { featuresData } from '@/data/featuresData'
import { FileIcon } from '@/components/Icon/Icons'
import { motion } from 'framer-motion'

const Features = () => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center px-[24px] pt-[50px] pb-[74px] md:pt-[56px] md:pb-[147px] lg:px-[80px]">
        <motion.div
          className="mb-[40px] flex w-full flex-col items-center py-[10px] md:mb-[64px] md:py-[14px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="mb-6 rounded-[16px] bg-[#E6FFF2] px-3 py-1 text-[20px] text-[#2E604A]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            Features
          </motion.p>
          <motion.h1
            className="mb-6 max-w-[1084x] text-center text-[28px] font-medium md:text-[42px] lg:text-[60px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Simplify and enhance your financial reconciliation process with
            ReconXi
          </motion.h1>
          <motion.p
            className="text-center text-[18px] text-[#525252]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Automate bank reconciliation tasks and enhance accuracy to keep your
            finances in perfect balance.
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 justify-center gap-[27px] md:grid-cols-2 md:gap-[32px]">
          {featuresData.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="flex max-w-[624px] flex-col items-center rounded-[6px] border border-[#CBD5E1] bg-[#FAFAFA] p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-7 border-[#C8FFE6] bg-[#B0F1D4]">
                <FileIcon />
              </div>
              <h3 className="mt-6 mb-4 text-center text-[20px] font-medium text-[#0A0A0A]">
                {feature.title}
              </h3>
              <p className="text-center text-[18px] text-[#525252]">
                {feature.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Features
