'use client'
import { useState } from 'react'
import { ArrowLeft, CircleCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import Container from '@/components/Container'
import Footer from '@/components/Footer'

export default function UpgradePlan() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

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

  const renderFeaturesList = (features: string[], isActive: boolean) => (
    <ul className="space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2">
          <CircleCheck
            className={cn(
              'h-5 w-5',
              isActive ? 'text-white' : 'text-[#39B057]'
            )}
          />
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
    <div>
      <Container className="font-inter mb-15">
        <div className="my-5 flex cursor-pointer items-center gap-3 text-sm text-[#333333] sm:text-base">
          <ArrowLeft />
          <p className="">Go Back</p>
        </div>
        <div>
          <h1 className="mb-10 border-b-1 border-solid border-[#EAECF0] pb-7 text-[32px] leading-[40px] font-bold text-[#101828]">
            Upgrade Your Plan
          </h1>
          <div className="flex flex-col justify-between gap-8 px-4 lg:flex-row">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  'relative h-[563px] w-full rounded-[13px] p-[40px_20px] transition-all duration-300',
                  activeCard === plan.id
                    ? 'scale-105 bg-[#2E604A] text-white'
                    : 'border-2 border-[#38B43C] hover:scale-105',
                  activeCard !== null && activeCard !== plan.id && 'opacity-50'
                )}
                onMouseEnter={() => setActiveCard(plan.id)}
                onMouseLeave={() => setActiveCard(null)}
                tabIndex={0}
                aria-label={`${plan.name} pricing plan`}
              >
                <div className="border-b border-[#BFB8B8] pb-5">
                  <h3 className="font-inter text-[16px] leading-[100%] font-[500]">
                    {plan.name}
                  </h3>
                </div>

                <div className="mt-11 space-y-6">
                  <p className="text-[32px] leading-[100%] font-[600]">
                    <span className="text-2xl">$</span>
                    {plan.price}
                  </p>
                  {renderFeaturesList(plan.features, activeCard === plan.id)}

                  <button
                    className={cn(
                      'h-[47px] w-full cursor-pointer rounded-[8px] border-[1.5px] text-[16px] leading-[100%] font-[600] transition-colors',
                      activeCard === plan.id
                        ? 'border-white bg-white text-[#2A5743]'
                        : 'border-[#6E756E] bg-[#2E604A] text-[#EAEFED]'
                    )}
                  >
                    {plan.id === 1 ? 'Get Started' : 'Upgrade'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  )
}
