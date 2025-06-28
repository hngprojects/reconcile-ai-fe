'use client'

import { ArrowLeft } from 'lucide-react'
import ReconciliationStepperForm from './form/stepper/ReconciliationStepperForm'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function ReconciliationFlow() {
  const router = useRouter()
  return (
    <div className="mb-20 flex flex-col gap-6 self-stretch">
      <div className="space-y-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push('/dashboard/reconciliation')}
          className="group hover:bg-primary hover:text-primary-foreground flex items-center gap-2 transition-all duration-200 hover:shadow-md cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span className="transition-all duration-200 group-hover:font-medium">
            Back to Dashboard
          </span>
        </Button>

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
