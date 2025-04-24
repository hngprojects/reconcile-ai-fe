'use client'

import * as React from 'react'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { defineStepper } from '@/components/ui/stepper'
import SelectLedgerForm, { SelectLedgerSchema } from '../SelectLedgerForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import UploadBankStatementForm, {
  UploadBankStatementSchema,
} from '../components/upload-bankStatement/UploadBankStatement'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Complete from '../Complete'
import MatchTransaction from '../MatchTransaction'
import ConfirmMatch from '../ConfirmMatch'
import { cn } from '@/lib/utils'
import AddBankAccount from '../AddBankAccount'

const steps = [
  {
    id: 'step-1',
    title: 'Select Ledgers',
    schema: SelectLedgerSchema,
    Component: SelectLedgerForm,
  },
  {
    id: 'step-2',
    title: 'Upload Bank Statement',
    schema: UploadBankStatementSchema,
    Component: UploadBankStatementForm,
  },
  {
    id: 'step-3',
    title: 'Add Bank Account',
    schema: z.object({}),
    Component: AddBankAccount,
  },
  {
    id: 'step-4',
    title: 'Match Transactions',
    schema: z.object({}),
    Component: MatchTransaction,
  },
  {
    id: 'step-5',
    title: 'Confirm Matches',
    schema: z.object({}),
    Component: ConfirmMatch,
  },
  {
    id: 'step-6',
    title: 'Complete',
    schema: z.object({}),
    Component: Complete,
  },
]

const {
  StepperProvider,
  StepperControls,
  StepperNavigation,
  StepperStep,
  useStepper,
  StepperTitle,
} = defineStepper(...steps)

const StepperFormContent = () => {
  const router = useRouter()
  const stepper = useStepper()

  const form = useForm({
    resolver: zodResolver(stepper.current.schema),
    mode: 'all',
  })

  const onSubmit = (values: z.infer<typeof stepper.current.schema>) => {
    console.log(`Form values for step ${stepper.current.id}:`, values)

    if (!stepper.isLast) {
      stepper.next()
    } else {
      router.push('/dashboard')
    }
  }

  const handlePrevBtn = () => {
    if (stepper.isFirst) {
      router.back()
    } else {
      stepper.prev()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-xl border border-black/15 px-6 py-8"
      >
        <StepperNavigation>
          <StepperStep of={stepper.current.id}>
            <StepperTitle>{stepper.current.title}</StepperTitle>
          </StepperStep>
        </StepperNavigation>
        {stepper.switch(
          steps.reduce(
            (acc, step) => ({
              ...acc,
              [step.id]: ({ Component }: { Component: React.ElementType }) => (
                <Component />
              ),
            }),
            {}
          )
        )}
        <StepperControls
          className={cn(
            `mt-7 flex items-center justify-between`,
            stepper.isLast && 'justify-end'
          )}
        >
          {!stepper.isLast && (
            <div className="flex">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer border-[0.5px] border-black/15"
                onClick={handlePrevBtn}
              >
                {!stepper.isFirst && <ArrowLeft />}
                <span>{stepper.isFirst ? 'Cancel' : 'back'}</span>
              </Button>

              {!stepper.isFirst && (
                <Button
                  type="button"
                  variant="link"
                  className="cursor-pointer font-normal text-black hover:no-underline"
                >
                  Save Draft
                </Button>
              )}
            </div>
          )}
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {stepper.isLast && <Check className="size-4 text-white" />}
            <span>{stepper.isLast ? 'Finish' : 'Continue'}</span>
            {!stepper.isLast && <ArrowRight />}
          </Button>
        </StepperControls>
      </form>
    </Form>
  )
}

const ReconciliationStepperForm = () => {
  return (
    <div className="flex w-full flex-col gap-8">
      <StepperProvider variant="progress">
        <StepperFormContent />
      </StepperProvider>
    </div>
  )
}

export default ReconciliationStepperForm
