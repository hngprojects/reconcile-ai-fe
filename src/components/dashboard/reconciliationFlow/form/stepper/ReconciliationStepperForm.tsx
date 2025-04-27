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
import {
  useReconciliationStore,
  type ReconciliationFormState,
} from '@/store/reconciliation-store'
import { toast } from 'sonner'

// Define step-specific form values types
type StepFormValues = {
  'step-1': { ledgers: Record<string, boolean>; saveAsDefault: boolean }
  'step-2': {
    file: File
    bankAccount: string
    period: { from: string; to: string }
  }
  'step-3': Record<string, never>
  'step-4': Record<string, never>
  'step-5': Record<string, never>
  'step-6': Record<string, never>
}

const steps = [
  {
    id: 'step-1' as const,
    title: 'Select Ledgers',
    schema: SelectLedgerSchema,
    Component: SelectLedgerForm,
  },
  {
    id: 'step-2' as const,
    title: 'Upload Bank Statement',
    schema: UploadBankStatementSchema,
    Component: UploadBankStatementForm,
  },
  {
    id: 'step-3' as const,
    title: 'Add Bank Account',
    schema: z.object({}),
    Component: AddBankAccount,
  },
  {
    id: 'step-4' as const,
    title: 'Match Transactions',
    schema: z.object({}),
    Component: MatchTransaction,
  },
  {
    id: 'step-5' as const,
    title: 'Confirm Matches',
    schema: z.object({}),
    Component: ConfirmMatch,
  },
  {
    id: 'step-6' as const,
    title: 'Complete',
    schema: z.object({}),
    Component: Complete,
  },
] as const

const {
  StepperProvider,
  StepperControls,
  StepperNavigation,
  StepperStep,
  useStepper,
  StepperTitle,
} = defineStepper(...steps)

type StepId = (typeof steps)[number]['id']

const StepperFormContent = () => {
  const router = useRouter()
  const stepper = useStepper()
  const { updateFormState, saveDraft, loadDraft } = useReconciliationStore()
  const [isInitialized, setIsInitialized] = React.useState(false)

  const form = useForm<StepFormValues[StepId]>({
    resolver: zodResolver(stepper.current.schema),
    mode: 'all',
  })

  // Load draft when component mounts
  React.useEffect(() => {
    if (!isInitialized) {
      const draft = loadDraft()
      if (draft) {
        const stepId = stepper.current.id as StepId

        // Map store data to form values
        if (stepId === 'step-1' && draft.selectedLedgers) {
          form.reset({
            ledgers: draft.selectedLedgers,
            saveAsDefault: draft.saveAsDefault,
          } as StepFormValues[typeof stepId])
        } else if (stepId === 'step-2' && draft.bankStatement) {
          form.reset(draft.bankStatement as StepFormValues[typeof stepId])
        }

        setIsInitialized(true)
      }
    }
  }, [form, loadDraft, isInitialized, stepper])

  const handleSaveDraft = React.useCallback(() => {
    try {
      const currentValues = form.getValues()
      const stepId = stepper.current.id as StepId

      // Get numeric step number for store
      const stepNumber = parseInt(stepId.split('-')[1])

      // Map form values to store data structure
      const updates = {
        currentStep: stepNumber,
      }

      if (stepId === 'step-1') {
        const values = currentValues as StepFormValues['step-1']
        Object.assign(updates, {
          selectedLedgers: values.ledgers,
          saveAsDefault: values.saveAsDefault,
        })
      } else if (stepId === 'step-2') {
        const values = currentValues as StepFormValues['step-2']
        Object.assign(updates, {
          bankStatement: values,
        })
      }

      updateFormState(updates)
      saveDraft()
      toast.success('Progress saved successfully')
    } catch (error) {
      console.error('Error saving draft:', error)
      toast.error('Failed to save progress')
    }
  }, [form, updateFormState, saveDraft, stepper])

  const onSubmit = async (values: StepFormValues[StepId]) => {
    try {
      const stepId = stepper.current.id as StepId
      const stepNumber = parseInt(stepId.split('-')[1])

      // Map form values to store data structure
      const updates: Partial<ReconciliationFormState> = {
        currentStep: stepNumber,
      }

      if (stepId === 'step-1') {
        const stepValues = values as StepFormValues['step-1']
        updates.selectedLedgers = stepValues.ledgers
        updates.saveAsDefault = stepValues.saveAsDefault
      } else if (stepId === 'step-2') {
        const stepValues = values as StepFormValues['step-2']
        updates.bankStatement = stepValues
      }

      updateFormState(updates)

      if (!stepper.isLast) {
        stepper.next()
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('Failed to save form data')
      console.error('Form submission error:', error)
    }
  }

  const handlePrevBtn = () => {
    if (stepper.isFirst) {
      router.back()
    } else {
      // Save current progress before going back
      handleSaveDraft()
      stepper.prev()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="dark:border-border bg-background dark:bg-background space-y-4 rounded-xl border border-black/15 px-6 py-8"
      >
        <StepperNavigation>
          <StepperStep of={stepper.current.id}>
            <StepperTitle className="dark:text-foreground">
              {stepper.current.title}
            </StepperTitle>
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
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="dark:border-border dark:text-foreground cursor-pointer border-[0.5px] border-black/15"
                onClick={handlePrevBtn}
              >
                {!stepper.isFirst && <ArrowLeft className="mr-2 h-4 w-4" />}
                <span>{stepper.isFirst ? 'Cancel' : 'Back'}</span>
              </Button>

              {!stepper.isFirst && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleSaveDraft}
                  className="hover:bg-accent/50 dark:text-foreground dark:hover:bg-accent/50 cursor-pointer font-normal text-black"
                >
                  Save Draft
                </Button>
              )}
            </div>
          )}
          <Button
            type="submit"
            className="dark:text-primary-foreground cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {stepper.isLast && <Check className="mr-2 h-4 w-4" />}
            <span>{stepper.isLast ? 'Finish' : 'Continue'}</span>
            {!stepper.isLast && <ArrowRight className="ml-2 h-4 w-4" />}
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
