'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ReconciliationStepperForm from './form/stepper/ReconciliationStepperForm'

export default function ReconciliationFlow() {
  const router = useRouter()

  return (
    <div className="mb-20 flex flex-col gap-6 self-stretch">
      <div className="space-y-8">
        <button
          onClick={() => router.back()}
          className="text-foreground flex w-fit cursor-pointer items-center gap-2"
        >
          <ArrowLeft className="h-6 w-6" />
          <p>Back to reconciliation</p>
        </button>

        <div>
          <h1 className="text-foreground text-2xl font-semibold">
            Bank Reconciliation
          </h1>
          <p className="text-muted-foreground font-light">
            Match your bank transactions with your accounting record
          </p>
        </div>
      </div>
      <div>
        <ReconciliationStepperForm />
      </div>
    </div>
  )
}
