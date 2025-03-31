'use client'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Container from '@/components/Container'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { CircleCheck } from 'lucide-react'
import CTASection from '@/components/CTASection'
import { motion } from 'framer-motion'
import GoogleAuthModal from '@/components/modal/GoogleAuthModal'
import { useSession } from 'next-auth/react'

export default function PricingPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [selectedPlanLink, setSelectedPlanLink] = useState('')
  const { status } = useSession()

  const pricingPlans = [
    {
      id: 1,
      name: 'Basic',
      price: 'Free',
      link: '/dashboard',
      features: [
        'Reconcile up to 5 reconciliations/month',
        'Upload CSV files',
        'Basic AI reconciliation',
        'Manually match transactions detected as unmatched',
        'Email notification for reconciled results',
      ],
    },
    {
      id: 2,
      name: 'Starter Plan',
      price: '10',
      link: 'https://buy.stripe.com/00g9Ez9c42XW9mo14q ',
      features: [
        'Reconcile up to 20 reconciliations/month',
        'Basic AI matching and reconciliation',
        'Export results to CSV',
        'Manually match records detected as unmatched',
        'Unlink records matched by AI, and match them correctly',
        'Email notification for reconciled results',
      ],
    },
    {
      id: 3,
      name: 'Business Plan',
      price: '25',
      link: 'https://buy.stripe.com/6oEdUPag8dCAbuw14r',
      features: [
        'Everything in Starter Plan',
        'Unlimited reconciliation/month',
        'Advanced matching of unmatched records',
        'Advanced AI matching and reconciliation (Large data set: up to 2000 rows)',
        'Merging multiple records/files',
        'Email notification for reconciled results',
      ],
    },
  ]

  const handleGetStarted = (planLink: string) => {
    if (status === 'unauthenticated') {
      setSelectedPlanLink(planLink)
      setShowAuthModal(true)
    } else {
      window.location.href = planLink
    }
  }

  const handleAuthSuccess = () => {
    setShowAuthModal(false)
    if (selectedPlanLink) {
      window.location.href = selectedPlanLink
    }
  }

  const renderFeaturesList = (features: string[], isActive: boolean) => (
    <ul className="space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2" role="listitem">
          <span className="my-auto flex-shrink-0">
            <CircleCheck
              className={cn(
                'h-5 w-5',
                isActive ? 'text-white' : 'text-[#39B057]'
              )}
            />
          </span>
          <span
            className={cn(
              'font-inter text-[13px] leading-[150%] font-[400]',
              isActive ? 'text-white' : 'text-[#333333]'
            )}
          >
            {feature}
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <Container className="py-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter mx-auto mb-6 max-w-full text-center text-[48px] leading-[100%] font-[600] break-words sm:max-w-[90%] lg:max-w-[60%]"
          >
            Flexible Pricing Plans for Every Business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-inter mx-auto max-w-[90%] text-center text-[16px] leading-[150%] font-normal sm:text-[18px] md:max-w-[1216px] md:text-[20px]"
          >
            Find the perfect financial reconciliation plan for your business.
            From freelancers to large enterprises, ReconXi makes AI-powered
            reconciliation fast, accurate, and affordable.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-[111px] flex flex-col justify-between gap-8 px-4 lg:flex-row"
        >
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative h-[563px] w-full rounded-[13px] p-[60px_24px] transition-all duration-300 md:p-[80px_28px] lg:w-[383px] lg:p-[94.7px_32px_94.7px_32px]',
                activeCard === plan.id
                  ? 'scale-105 bg-[#2E604A]'
                  : 'border-2 border-[#38B43C] hover:scale-105',
                activeCard !== null && activeCard !== plan.id && 'opacity-50'
              )}
              onMouseEnter={() => setActiveCard(plan.id)}
              onMouseLeave={() => setActiveCard(null)}
              tabIndex={0}
              aria-label={`${plan.name} pricing plan`}
            >
              <div className="border-b border-[#BFB8B8] pb-5">
                <h3
                  className={cn(
                    'font-inter text-[16px] leading-[100%] font-[500]',
                    activeCard === plan.id ? 'text-white' : 'text-black'
                  )}
                >
                  {plan.name}
                </h3>
              </div>

              <div className="-mx-3 mt-11 space-y-6">
                <p
                  className={cn(
                    'text-[32px] leading-[100%] font-[600]',
                    activeCard === plan.id ? 'text-white' : 'text-black'
                  )}
                >
                  <span className="text-2xl">$</span>
                  {plan.price}
                </p>
                {renderFeaturesList(plan.features, activeCard === plan.id)}

                {plan.id === 1 ? (
                  <button
                    onClick={() => handleGetStarted(plan.link)}
                    className={cn(
                      'h-[47px] w-full cursor-pointer rounded-[8px] border-[1.5px] text-[16px] leading-[100%] font-[600] transition-colors',
                      activeCard === plan.id
                        ? 'border-white bg-white text-[#2A5743]'
                        : 'border-[#6E756E] bg-[#2E604A] text-[#EAEFED]'
                    )}
                  >
                    Get Started
                  </button>
                ) : (
                  <button
                    onClick={() => handleGetStarted(plan.link)}
                    className={cn(
                      'h-[47px] w-full cursor-pointer rounded-[8px] border-[1.5px] text-[16px] leading-[100%] font-[600] transition-colors',
                      activeCard === plan.id
                        ? 'border-white bg-white text-[#2A5743]'
                        : 'border-[#6E756E] bg-[#2E604A] text-[#EAEFED]'
                    )}
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-[111px]"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mb-4 text-center text-2xl leading-tight font-semibold tracking-tight text-[#101828] sm:mb-6 sm:text-3xl md:text-4xl lg:mb-[42px]"
          >
            Why Choose ReconXi?
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex w-full flex-col"
          >
            <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:gap-6 lg:gap-[38px]">
              {['SME-Friendly Pricing', 'Secure & Reliable'].map((title, i) => (
                <div
                  key={i}
                  className="flex w-full flex-col gap-1.5 rounded-[8px] border border-[#D9D9D9] p-4 md:p-6"
                >
                  <div className="mb-2 flex">
                    <Image
                      src={`/assets/images/${
                        i === 0 ? 'dollar' : 'security'
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
                      ' Affordable plans designed for Nigerian businesses and global startups.'}
                    {i === 1 &&
                      'Your financial data is protected with bank-grade encrytion.'}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex w-full flex-col justify-between gap-4 md:flex-row md:gap-6 lg:mt-11 lg:gap-[38px]">
              {['Upload & Export', 'AI-Powered Reconciliation'].map(
                (title, i) => (
                  <div
                    key={i}
                    className="flex w-full flex-col justify-center gap-1.5 rounded-[8px] border border-[#D9D9D9] p-4 md:p-6"
                  >
                    <div className="justify-left mb-2 flex items-center">
                      <Image
                        src={`/assets/images/${
                          i === 0 ? 'upload' : 'aiReconcillation'
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
                      {i === 0 && 'Easily upload and export reports in CSV.'}
                      {i === 1 && 'Helps to reduce errors.'}
                    </p>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </Container>
      <GoogleAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSwitchToLogin={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
      <CTASection />
      <Footer />
    </>
  )
}
