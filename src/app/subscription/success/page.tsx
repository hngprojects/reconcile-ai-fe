'use client'
import { useEffect, Suspense, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Container from '@/components/Container'
import { PartyPopper, Loader2 } from 'lucide-react'
import { updatePaymentPlan } from '@/lib/api'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

function SubscriptionSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')
  const { data } = useSession()
  const user = data?.user
  const [isUpdating, startUpdating] = useTransition()

  useEffect(() => {
    if (plan) {
      const planMap: { [key: string]: { name: string; price: number } } = {
        starter: { name: 'Starter Plan', price: 10.0 },
        business: { name: 'Business Plan', price: 25.0 },
      }

      const selectedPlan = planMap[plan.toLowerCase()]
      if (selectedPlan) {
        startUpdating(() => {
          updatePaymentPlan({
            plan: plan.charAt(0).toUpperCase() + plan.slice(1),
            price: selectedPlan.price,
          })
            .then(() => {
              toast.success('Payment plan updated successfully')
            })
            .catch((error) => {
              console.error('Error updating plan:', error)
              toast.error('Failed to update payment plan')
              router.push('/manage-plan')
            })
        })
      }
    }
  }, [user, router, plan])

  if (isUpdating) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#2E604A]" />
          <p className="text-[#475467]">Updating your subscription...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-[600px] rounded-xl border-2 border-[#2E604A] bg-white p-8 text-center shadow-lg"
      >
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#2E604A]/10">
          <PartyPopper className="h-16 w-16 text-[#2E604A]" />
        </div>
        <h1 className="font-inter mb-4 text-[32px] leading-[40px] font-semibold text-[#101828]">
          Welcome to Magic
          {/* Welcome to {planDetails?.name}! */}
        </h1>
        <p className="font-inter mb-8 text-[18px] leading-[28px] text-[#475467]">
          Your subscription has been successfully activated.
        </p>

        <button
          onClick={() => router.push('/file-upload')}
          className="cursor-pointer rounded-lg bg-[#2E604A] px-8 py-4 font-semibold text-white transition-colors hover:bg-[#2E604A]/90"
        >
          Start Reconciling
        </button>
      </motion.div>
    </div>
  )
}

export default function SubscriptionSuccessPage() {
  return (
    <Container>
      <Suspense
        fallback={
          <div className="flex min-h-[80vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#2E604A]" />
          </div>
        }
      >
        <SubscriptionSuccessContent />
      </Suspense>
    </Container>
  )
}
