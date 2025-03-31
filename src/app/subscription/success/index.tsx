'use client'
import { useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, PartyPopper } from 'lucide-react'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { get_current_user, update_user_plan } from '@/actions/user'

export function SubscriptionSuccessContent({
  plan,
}: {
  plan: 'starter' | 'business'
}) {
  const router = useRouter()
  const { update, data } = useSession()
  const user = data?.user
  const [isUpdating, startUpdating] = useTransition()

  useEffect(() => {
    if (plan) {
      const planMap: { [key: string]: { name: string; price: number } } = {
        starter: { name: 'Starter', price: 10.0 },
        business: { name: 'Business', price: 25.0 },
      }
      const selectedPlan = planMap[plan.toLowerCase()]
      if (selectedPlan) {
        startUpdating(async () => {
          await update_user_plan(
            selectedPlan.price,
            selectedPlan.name as 'Starter' | 'Business'
          ).then(async (res) => {
            if (res.success) {
              const res = await get_current_user()
              toast.success('Payment plan updated successfully', {
                description: res.message,
              })
              await update({
                plan: res.data?.plan,
                user: {
                  ...user,
                  payment_plan: {
                    plan: res.data?.plan,
                  },
                },
              })
              router.push('/file-upload')
            } else {
              toast.error('Failed to update payment plan', {
                description: res.message,
              })
              router.push('/')
            }
          })
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
