'use client'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import { useOnBoardingStore } from '@/store/onboarding-store'

export default function FinishStep() {
  const router = useRouter()
  const { basicInfo, bankInfo, ledgerSettings } = useOnBoardingStore()

  console.log({
    basicInfo,
    bankInfo,
    ledgerSettings,
  })

  return (
    <div className="mt-7 flex w-full flex-col items-center">
      <div className="mb-[18px] flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#D6D6D6]">
        <svg
          width="22"
          height="17"
          viewBox="0 0 22 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.73281 17L0.132812 9.40001L2.03281 7.50001L7.73281 13.2L19.9661 0.966675L21.8661 2.86667L7.73281 17Z"
            fill="#333333"
          />
        </svg>
      </div>
      <p className="mb-2 text-center text-[20px] text-[#333333] md:text-[24px]">
        You are all set!
      </p>
      <p className="text-base text-[#6D6D6D] md:text-[20px]">
        Your accounting workspace is ready. start tracking sales, expenses,
        customer payments, and vendor bills - and reconcile your bank account
        with just a few clicks.
      </p>
      <div className="mt-7 w-full self-start">
        <p className="mb-4 text-[20px] font-semibold md:text-[24px]">
          What&apos;s next?
        </p>
        <div className="flex items-center gap-3">
          <ChevronRight className="text-gray-500" />
          <p className="text-base">
            Add your first sale, expense or vendor bill
          </p>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <ChevronRight className="text-gray-500" />
          <p className="text-base">
            Upload a bank statement to start reconciling
          </p>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <ChevronRight className="text-gray-500" />
          <p className="text-base">
            Set up your chart of accounts (categories)
          </p>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <ChevronRight className="text-gray-500" />
          <p className="text-base">Review your ledgers</p>
        </div>
      </div>
      <div className="mt-[31px] w-full">
        <Button className="w-full" onClick={() => router.push('/dashboard')}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}
