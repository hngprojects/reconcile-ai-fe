'use client'
import React from 'react'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/Container'
import { motion } from 'framer-motion'

export default function PartnershipPage() {
  const opportunities = [
    'Referral Partners: Expand your portfolio by offering ReconXi solutions to your clients, backed by training and marketing resources.',
    'Referral Partners: Earn rewards by referring potential clients to ReconXi, contributing to their operational excellence.',
    "Referral Partners: Expand your network and drive mutual success by collaborating with ReconXi's partner ecosystem.",
  ]

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <>
      <div>
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mx-auto mt-[42px] flex max-w-full items-center justify-center bg-[#FBFEFD] text-center sm:rounded-xl md:mt-[78px]"
          >
            <div className="gap:8 flex flex-1 flex-col-reverse items-center p-4 text-center sm:text-left md:flex-row md:gap-4 md:p-0">
              <div className="flex w-full flex-row items-start gap-6 md:justify-center">
                <div className="mt-5 flex flex-col items-start gap-4 self-stretch text-left md:mt-0 md:max-w-[614px] md:p-5">
                  <motion.h1
                    initial={{ opacity: 1, y: 0 }}
                    className="font-inter text-2xl leading-tight font-semibold text-[#101828] sm:text-3xl md:text-4xl"
                  >
                    Join us in a winning <br className="hidden md:block" />
                    partnership
                  </motion.h1>
                  <motion.p
                    variants={fadeIn}
                    className="font-inter text-base leading-relaxed text-[#475467] sm:text-lg md:text-xl"
                  >
                    At ReconXi, we are dedicated to transforming the way
                    businesses manage their financial reconciliation processes.
                    By partnering with us, you can enhance your offerings and
                    provide added value to your clients while benefiting from
                    our solution.
                  </motion.p>
                  <motion.div
                    variants={fadeIn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      className="bg-primary text-md hover:bg-primary/90 flex h-12 w-full items-center justify-center rounded-md !p-6 px-5 py-3 font-semibold whitespace-nowrap text-white sm:h-9 sm:w-fit"
                      href="/partners/form"
                    >
                      Partner With Us
                    </Link>
                  </motion.div>
                </div>
              </div>
              <motion.div
                variants={fadeIn}
                className="relative flex w-full max-w-[536px] items-center justify-center"
              >
                <Image
                  src="/assets/images/partners-main-image-mobile.svg"
                  alt="Business People"
                  width={536}
                  height={400}
                  className="block rounded-[10px] md:hidden"
                  priority
                  style={{ width: 'auto', height: 'auto' }}
                />
                <Image
                  src="/assets/images/partners-main-image-desktop.svg"
                  alt="Business People"
                  width={536}
                  height={400}
                  className="hidden rounded-[10px] md:block"
                  priority
                  style={{ width: 'auto', height: 'auto' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </Container>

        <Container className="mt-7 text-center md:mt-15">
          <motion.h3
            initial={{ opacity: 1, y: 0 }}
            className="mb-4 text-2xl leading-tight font-semibold tracking-tight text-[#101828] sm:mb-6 sm:text-3xl md:text-4xl lg:mb-6"
          >
            Why Partner With ReconXi?
          </motion.h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="flex w-full flex-col"
          >
            <div className="flex w-full flex-col justify-center gap-4 md:flex-row md:gap-6 lg:gap-[38px]">
              {[
                'Innovative Solutions',
                'Expand Your Offerings',
                'Drive Customer Success',
              ].map((title, i) => (
                <motion.div
                  key={i}
                  variants={cardAnimation}
                  whileHover={{ scale: 1.03 }}
                  className="flex w-full flex-col gap-1.5 rounded-[8px] border border-[#D9D9D9] p-4 md:w-1/2 md:p-6 lg:w-1/3"
                >
                  <div className="mb-2 flex items-center">
                    <Image
                      src={`/assets/images/${
                        i === 0
                          ? 'innovative'
                          : i === 1
                            ? 'flowbite_expand-outline'
                            : 'checkfeat'
                      }.svg`}
                      alt={`${title} icon`}
                      width={25}
                      height={25}
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <h3 className="ml-[10px] flex font-medium text-[#2E604A]">
                      {title}
                    </h3>
                  </div>
                  <p className="text-start text-sm leading-relaxed sm:text-base">
                    {i === 0 &&
                      'Our platform combines advanced technology with user-friendly features, allowing businesses to reconcile their accounts quickly.'}
                    {i === 1 &&
                      'Enhance your product suite with a trusted reconciliation solution that adds value to your clients.'}
                    {i === 2 &&
                      'Equip your users with tools to achieve accurate, timely financial reporting.'}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-7 flex w-full flex-col justify-center gap-4 md:flex-row md:gap-6 lg:mt-11 lg:gap-[38px]">
              {['Market Reach', 'Dedicated Support'].map((title, i) => (
                <motion.div
                  key={i}
                  variants={cardAnimation}
                  whileHover={{ scale: 1.03 }}
                  className="flex w-full flex-col justify-center gap-1.5 rounded-[8px] border border-[#D9D9D9] p-4 md:w-[270px] md:p-6 lg:w-[404px]"
                >
                  <div className="justify-left mb-2 flex items-center">
                    <Image
                      src={`/assets/images/${
                        i === 0 ? 'fluent-mdl2_market' : 'support_agent'
                      }.svg`}
                      alt={`${title} icon`}
                      width={25}
                      height={25}
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <h3 className="ml-[10px] font-medium text-[#2E604A]">
                      {title}
                    </h3>
                  </div>
                  <p className="text-start text-sm leading-relaxed sm:text-base">
                    {i === 0 &&
                      'Collaborate with us to tap into new markets and expand your customer base. Our strong brand in the industry can help elevate your business.'}
                    {i === 1 &&
                      "We prioritize our partners' success. Our team is committed to providing the support and resources you need to maximize the benefits of our partnership."}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>

        <Container className="mx-auto my-7 flex max-w-7xl flex-col items-center py-10">
          <motion.h3
            initial={{ opacity: 1, y: 0 }}
            className="py-10 text-2xl font-semibold text-[#333333] sm:text-3xl md:text-4xl"
          >
            Partnership Opportunities
          </motion.h3>
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="ml-1 flex list-none flex-col items-center lg:ml-[16px] lg:items-start"
          >
            {opportunities.map((opportunity, index) => {
              if (opportunity.startsWith('Referral Partners:')) {
                const [title, ...description] = opportunity.split(':')
                return (
                  <motion.li
                    key={index}
                    variants={fadeIn}
                    className="mb-4 flex items-center lg:mb-[20px]"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-3 flex-shrink-0 sm:mr-4 sm:h-[28px] sm:w-[28px] lg:h-[32px] lg:w-[32px]"
                    >
                      <path
                        d="M16 0L20.3218 11.6782L32 16L20.3218 20.3218L16 32L11.6782 20.3218L0 16L11.6782 11.6782L16 0Z"
                        fill="#2E604A"
                      />
                    </svg>
                    <span className="text-sm leading-tight text-[#000000] sm:text-base sm:leading-normal lg:text-lg lg:leading-relaxed">
                      <span className="font-bold">{title}:</span>
                      {description.join(':')}
                    </span>
                  </motion.li>
                )
              }
              return (
                <motion.li
                  key={index}
                  variants={fadeIn}
                  className="mb-4 flex items-center lg:mb-[20px]"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 flex-shrink-0 sm:mr-4 sm:h-[40px] sm:w-[40px] lg:h-[50px] lg:w-[50px]"
                  >
                    <path
                      d="M16 0L20.3218 11.6782L32 16L20.3218 20.3218L16 32L11.6782 20.3218L0 16L11.6782 11.6782L16 0Z"
                      fill="#2E604A"
                    />
                  </svg>
                  <span className="text-sm leading-tight text-[#475467] sm:text-base sm:leading-normal lg:text-lg lg:leading-relaxed">
                    {opportunity}
                  </span>
                </motion.li>
              )
            })}
          </motion.ul>
        </Container>

        <div className="pb-0 md:pb-25">
          <Container className="bg-white py-8 md:border md:border-[#E8E8E8] md:bg-[#FBFEFD]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="flex flex-col items-center gap-11 py-7 text-center sm:rounded-xl"
            >
              <motion.h3
                initial={{ opacity: 1, y: 0 }}
                className="text-2xl font-semibold text-[#333333] sm:text-3xl md:text-4xl"
              >
                What We Offer Partners
              </motion.h3>
              {/* Grid container for the cards */}
              <div className="mx-4 grid grid-cols-1 gap-6 md:mx-6 md:grid-cols-3">
                {[
                  {
                    title: 'Technical Support',
                    desc: 'Access to developer resources, documentation and a responsive engineering team.',
                    imagePath: 'support_agent.svg',
                  },
                  {
                    title: 'Marketing Resources',
                    desc: 'Ready-to-use collateral, case studies, and tailored campaigns to amplify your outreach.',
                    imagePath: 'marketing.svg',
                  },
                  {
                    title: 'Training',
                    desc: "Onboarding sessions and ongoing education to ensure your team maximizes ReconXi's potential.",
                    imagePath: 'training.svg',
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardAnimation}
                    whileHover={{ scale: 1.03 }}
                    className="flex flex-col"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <Image
                        src={`/assets/images/${item.imagePath}`}
                        alt={`${item.title} icon`}
                        width={25}
                        height={25}
                        style={{ width: 'auto', height: 'auto' }}
                      />
                      <h3 className="m-0 p-0 text-lg font-medium text-[#2E604A]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-start text-sm leading-relaxed sm:text-base">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  )
}
