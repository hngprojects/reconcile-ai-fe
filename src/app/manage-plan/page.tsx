'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import Container from '@/components/Container'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { CircleCheck } from 'lucide-react'
import { motion } from 'framer-motion'

import CancelSubscriptionModal from '@/components/modal/CancelSubscriptionModal'
import { EditIcon, NoteIcon } from '@/components/Icon/Icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Link from 'next/link'
import { ErrorIcon } from '@/components/Icon/Icons'
import { useSession } from 'next-auth/react'

interface PlanMap {
  [key: string]: number
  Basic: number
  Starter: number
  Business: number
}

export default function ManagePlanPage() {
  const { data } = useSession()
  const router = useRouter()
  const user = data?.user
  const planMap: PlanMap = {
    Basic: 1,
    Starter: 2,
    Business: 3,
  }
  const currentPlan = user?.payment_plan?.plan?.plan
  const activeCard = planMap[currentPlan as keyof PlanMap] || 1
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openPlanDialog, setOpenPlanDialog] = useState(false)
  const [openCancelDialog, setOpenCancelDialog] = useState(false)

  const pricingPlans = [
    {
      id: 1,
      name: 'Basic',
      price: 'Free',
      link: '/file-upload',
      features: [
        'Reconcile up to 5 reconciliations/month',
        'Upload CSV files',
        'Basic AI reconciliation',
        'Manually match transactions detected as unmatched',
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
      ],
    },
    {
      id: 3,
      name: 'Business Plan',
      price: '25',
      link: 'https://buy.stripe.com/test_8wM28u6Y7gpZ2DSeUU',
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

  const handlePlanClick = (planLink: string) => {
    window.location.href = planLink
  }

  // Add helper function to handle reconciliation display
  const getReconciliationInfo = () => {
    const used = user?.payment_plan?.reconciliations_used || 0
    const limit = user?.payment_plan?.plan?.reconciliations_per_month

    if (limit === -1) {
      return {
        display: `${used}/∞`,
        progress: 0,
        remaining: 'Unlimited',
      }
    }

    const defaultLimit = 5
    const actualLimit = limit || defaultLimit
    const progress = Math.min((used / actualLimit) * 100, 100)

    return {
      display: `${used}/${actualLimit}`,
      progress,
      remaining: `${actualLimit - used}`,
    }
  }

  // Update the Dialog content section
  const reconciliationInfo = getReconciliationInfo()

  return (
    <>
      <Container className="py-8 pb-[100px]">
        {/* Back button and Header */}
        <div className="border-b border-[#EAECF0] px-4 pb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="group mb-6 flex cursor-pointer items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5 text-[#101828] transition-transform group-hover:translate-x-[-4px]" />
            <span className="font-inter text-[16px] leading-[38px] font-medium text-[#101828]">
              Go Back
            </span>
          </button>

          <h1 className="font-inter mb-2 text-[30px] leading-[38px] font-semibold text-[#101828]">
            Billing
          </h1>
          <p className="font-inter text-[16px] leading-[24px] font-normal text-[#333333]">
            Manage your billing and payment details.
          </p>
        </div>

        <div className="my-[32px] flex w-full items-center gap-[32px] px-4 md:justify-end md:px-2">
          {/* My Plan */}
          <Dialog open={openPlanDialog} onOpenChange={setOpenPlanDialog}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex cursor-pointer gap-2 rounded-md border border-[#2E604A] bg-white px-4 py-2 text-sm font-medium text-[#2E604A] shadow-none"
                onClick={() => setOpenPlanDialog(true)}
              >
                <EditIcon className="h-4 w-4" />
                My Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-[20px] font-semibold text-[#000000]">
                  My Plan
                </DialogTitle>
                <DialogDescription>
                  <div className="space-y-[12px] p-2">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-[#475467]">
                        Current Plan
                      </h3>
                      <p className="text-[14px] font-semibold text-[#475467]">
                        {user?.payment_plan?.plan?.plan || 'Basic'}
                      </p>
                    </div>

                    <div className="space-y-[12px]">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-[#475467]">Price</h3>
                        <p className="text-[14px] font-semibold text-[#475467]">
                          ${user?.payment_plan?.price || 'Free'}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <h3 className="font-semibold text-[#475467]">
                          Billing interval
                        </h3>
                        <p className="text-[14px] font-semibold text-[#475467]">
                          Monthly
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-[#475467]">
                            Reconcilation
                          </h3>
                          <p className="text-[14px] font-semibold text-[#475467]">
                            {reconciliationInfo.display}
                          </p>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-[100px] bg-[#F5F5F5]">
                          <div
                            className="h-full bg-[#2E604A]"
                            style={{
                              width: `${reconciliationInfo.progress}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {reconciliationInfo.remaining === 'Unlimited'
                            ? 'Unlimited reconciliations'
                            : `${reconciliationInfo.remaining} reconciliations remaining`}
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <Button
                  variant="outline"
                  className="mx-auto h-[48px] w-[80%] cursor-pointer rounded-[8px] border border-[#E63946] px-[28px] py-[12px] text-[#E63946] hover:bg-[#e6394742] hover:text-[#E63946]"
                  onClick={() => {
                    setOpenPlanDialog(false)
                    setTimeout(() => setOpenCancelDialog(true), 200)
                  }}
                >
                  Cancel Subscription
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Cancel Subscription */}
          <Dialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogDescription className="space-y-4">
                  <div className="flex flex-col gap-4 rounded-[12px] border border-[#FDA29B] bg-[#FFFBFA] p-[16px]">
                    <ErrorIcon className="text-[#D92D20]" />
                    <div className="space-y-2">
                      <h3 className="font-semibold text-[#B42318]">
                        Important
                      </h3>
                      <p className="text-[#B42318]">
                        Canceling your subscription will downgrade your account
                        to the Free plan at the end of your current billing
                        period.
                      </p>
                    </div>
                  </div>

                  <div className="px-[16px] py-[24px]">
                    <h2 className="py-4 text-[18px] text-[#101828]">
                      What you will loose
                    </h2>

                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <ErrorIcon className="text-[#333333]" />
                        <p>Reconcile up to 20 transaction/month</p>
                      </div>
                      <div className="flex gap-2">
                        <ErrorIcon className="text-[#333333]" />
                        <p>Basic AI matching (date, amount, description).</p>
                      </div>
                      <div className="flex gap-2">
                        <ErrorIcon className="text-[#333333]" />
                        <p>Export results to CSV.</p>
                      </div>
                      <div className="flex gap-2">
                        <ErrorIcon className="text-[#333333]" />
                        <p>Manual adjustments ( unlink and match errors)</p>
                      </div>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="justify-end">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="cursor-pointer rounded-[8px] border border-[#E63946] px-[28px] py-[12px] text-[#E63946]"
                    onClick={() => alert('Subscription Canceled!')}
                  >
                    Cancel Subscription
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="cursor-pointer rounded-[8px] bg-[#275B4E] px-[28px] py-[12px] text-white transition hover:bg-[#1E4A3E]"
                    onClick={() => setOpenCancelDialog(false)}
                  >
                    Keep Subscription
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Link href={'/billing-history'}>
            <Button
              variant={'secondary'}
              className="flex cursor-pointer gap-2 rounded-md border border-[#2E604A] bg-white px-4 py-2 text-sm font-medium text-[#2E604A] shadow-none"
            >
              <NoteIcon className="h-4 w-4" />
              Billing history
            </Button>
          </Link>
        </div>

        {/* Existing pricing cards section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-col justify-between gap-8 px-4 lg:flex-row xl:gap-12"
        >
          {pricingPlans.map((plan) => {
            const isCurrentPlan = activeCard === plan.id
            const isHovered = hoveredCard === plan.id

            return (
              <div
                key={plan.id}
                className={cn(
                  'relative w-full rounded-[13px] p-[60px_24px] transition-all duration-300 md:p-[40px_24px] lg:w-1/3 xl:p-[94.7px_32px_40px_32px]',
                  isCurrentPlan
                    ? 'scale-105 bg-[#2E604A]'
                    : 'border-2 border-[#38B43C] hover:scale-105',
                  !isCurrentPlan && activeCard !== null && 'opacity-50',
                  isHovered && !isCurrentPlan && 'opacity-100'
                )}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
                tabIndex={0}
                aria-label={`${plan.name} pricing plan`}
              >
                <div className="flex h-full flex-col justify-between gap-10">
                  <div>
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

                    <div className="mt-11 space-y-6">
                      <p
                        className={cn(
                          'text-[32px] leading-[100%] font-[600]',
                          activeCard === plan.id ? 'text-white' : 'text-black'
                        )}
                      >
                        <span className="text-2xl">$</span>
                        {plan.price}
                        {plan.price !== 'Free' && (
                          <span className="text-sm font-normal">/month</span>
                        )}
                      </p>

                      <div className="flex-grow">
                        {renderFeaturesList(
                          plan.features,
                          activeCard === plan.id
                        )}
                      </div>
                    </div>
                  </div>

                  {isCurrentPlan ? (
                    <button
                      type="button"
                      disabled
                      className="text-primary h-[47px] w-full cursor-not-allowed rounded-[8px] border-[1.5px] bg-gray-200 text-[16px] leading-[100%] font-[600]"
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePlanClick(plan.link)}
                      className={cn(
                        'h-[47px] w-full cursor-pointer rounded-[8px] border-[1.5px] text-[16px] leading-[100%] font-[600] transition-all duration-300',
                        isHovered
                          ? 'border-[#2E604A] bg-[#eaf5f1] text-[#2A5743]'
                          : 'border-[#6E756E] bg-[#2E604A] text-[#EAEFED] hover:border-[#2E604A] hover:bg-[#eaf5f1] hover:text-[#2A5743]'
                      )}
                    >
                      Choose Plan
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </motion.div>
        {/* Cancel Subscription Modal */}
        <CancelSubscriptionModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </Container>

      <Footer />
    </>
  )
}
