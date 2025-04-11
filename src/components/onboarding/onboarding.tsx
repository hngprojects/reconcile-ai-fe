'use client'
import { useOnBoardingStore } from '@/store/onboarding-store'
import BankStep from './BankStep'
import BasicStep from './BasicStep'
import FinishStep from './FinishStep'
import LedgerStep from './LedgerStep'
import OnboardingProgress from './OnboardingProgress'

export default function Onboarding() {
  const { currentStep } = useOnBoardingStore()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicStep />
      case 2:
        return <BankStep />
      case 3:
        return <LedgerStep />
      case 4:
        return <FinishStep />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <div className="flex w-full max-w-[714px] flex-col items-center justify-center rounded-md border p-5">
        <OnboardingProgress currentStep={currentStep} />
        <main className="w-full">{renderStep()}</main>
      </div>
    </div>
  )
}
