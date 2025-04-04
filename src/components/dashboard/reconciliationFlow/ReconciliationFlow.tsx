'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ReconciliationStepperForm from './form/stepper/ReconciliationStepperForm'

// import { toast } from "sonner";

export default function ReconciliationFlow() {
  const router = useRouter()

  return (
    <div className="mb-20 flex flex-col gap-6 self-stretch">
      <div className="space-y-8">
        <div
          onClick={() => router.back()}
          className="flex w-fit cursor-pointer items-center gap-2"
        >
          <ArrowLeft className="h-6 w-6" />
          <p>Back to reconciliation</p>
        </div>

        <div>
          <h1 className="text-2xl font-semibold">Bank Reconciliation</h1>
          <p className="font-light">
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
