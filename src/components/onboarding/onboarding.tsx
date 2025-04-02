'use client'
import OnboardingProgress from './OnboardingProgress'
import { useState } from 'react'
import BasicsStep from './BasicsStep'
import BankStep from './BankStep'
import LedgerStep from './LedgerStep'
import FinishStep from './FinishStep'

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  interface FormData {
    // Basics step
    businessName: string
    businessType: string
    reportingYear: string
    currency: string

    // Bank step
    bankName: string
    accountName: string
    accountNumber: string
    openingCashBalance: string

    // Ledger step
    generalLedger: boolean
    vendorLedger: boolean
    customerLedger: boolean
  }
  const [formData, setFormData] = useState<FormData>({
    // Basics step
    businessName: '',
    businessType: '',
    reportingYear: '',
    currency: '',

    // Bank step
    bankName: '',
    accountName: '',
    accountNumber: '',
    openingCashBalance: '',

    // Ledger step
    generalLedger: true,
    vendorLedger: false,
    customerLedger: false,
  })

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicsStep
            formData={formData}
            handleInputChange={handleInputChange}
            handleNext={handleNext}
          />
        )
      case 2:
        return (
          <BankStep
            formData={formData}
            handleInputChange={handleInputChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )
      case 3:
        return (
          <LedgerStep
            formData={formData}
            handleInputChange={handleInputChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )
      case 4:
        return <FinishStep />
      default:
        return null
    }
  }

  return (
    <div className="mx-auto my-4 flex min-h-screen max-w-[714px] flex-col justify-center p-5">
      <OnboardingProgress currentStep={currentStep} />
      <main className="w-full">
        <div className="w-full">{renderStep()}</div>
      </main>
    </div>
  )
}
