'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
import { ArrowLeft, ArrowRight, Check, Save } from 'lucide-react'
import Complete from '../Complete'
import MatchTransaction from '../MatchTransaction'
import ConfirmMatch from '../ConfirmMatch'
import { cn } from '@/lib/utils'
import AddBankAccount from '../components/add-bank-account/AddBankAccountForm'
import { useReconciliationStore } from '@/store/reconciliation-store'
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

// Define step type for better type safety
type Step = {
  id: 'step-1' | 'step-2' | 'step-3' | 'step-4' | 'step-5' | 'step-6'
  title: string
  schema: z.ZodSchema
  Component: React.ComponentType
}

const steps: Step[] = [
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

const { StepperProvider, StepperControls, StepperNavigation, StepperStep, useStepper, StepperTitle } =
  defineStepper(...steps)

type StepId = (typeof steps)[number]['id']

const StepperFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepper = useStepper();
  const { formState, updateFormState } = useReconciliationStore();

  const form = useForm<StepFormValues[StepId]>({
    resolver: zodResolver(stepper.current.schema),
    mode: 'all',
  });

  const onSubmit = async (values: StepFormValues[StepId]) => {
    try {
      const stepId = stepper.current.id as StepId;
      const stepNumber = parseInt(stepId.split('-')[1]);

      if (stepId === 'step-1') {
        const stepValues = values as StepFormValues['step-1'];
        updateFormState({
          currentStep: stepNumber,
          selectedLedgers: stepValues.ledgers,
        });
        stepper.next();
      } else if (stepId === 'step-2') {
        const stepValues = values as StepFormValues['step-2'];
        // Update bankStatements with the uploaded data
        updateFormState({
          bankStatements: [...formState.bankStatements, stepValues],
          currentStep: stepNumber,
        });
        router.push('/dashboard/reconciliation-flow?step=3');
      } else if (stepId === 'step-3') {
        // Adjust logic if needed; currently assumes bank statements exist
        updateFormState({ currentStep: stepNumber });
        router.push('/dashboard/recon-processing');
      }
    } catch (error) {
      toast.error('Failed to save form data');
      console.error('Form submission error:', error);
    }
  };

  const handlePrevBtn = () => {
    if (stepper.isFirst) {
      router.back();
    } else {
      const currentStepNumber = parseInt(stepper.current.id.split('-')[1]);
      updateFormState({ currentStep: currentStepNumber - 1 });
      router.push(
        `/dashboard/reconciliation-flow?step=${currentStepNumber - 1}`
      );
    }
  };

  const handleSaveDraft = async () => {
    toast.success('Draft saving will be implemented later');
  };

  useEffect(() => {
    const step = searchParams.get('step');
    if (step) {
      const stepNumber = parseInt(step);
      if (stepNumber > 1 && stepNumber <= steps.length) {
        stepper.goTo(`step-${stepNumber}` as StepId);
      }
    }
  }, [searchParams, stepper]);

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
          <div className="flex items-center gap-2">
            {!stepper.isLast && (
              <Button
                type="button"
                variant="outline"
                className="dark:border-border dark:text-foreground cursor-pointer border-[0.5px] border-black/15"
                onClick={handlePrevBtn}
              >
                {!stepper.isFirst && <ArrowLeft className="mr-2 h-4 w-4" />}
                <span>{stepper.isFirst ? 'Cancel' : 'Back'}</span>
              </Button>
            )}

            {!stepper.isLast && !stepper.isFirst && (
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                className="dark:border-border dark:text-foreground cursor-pointer border-[0.5px] border-black/15"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
            )}
          </div>

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
  );
};

// Memoize the entire StepperFormContent to prevent unnecessary re-renders
const MemoizedStepperFormContent = React.memo(StepperFormContent)

const ReconciliationStepperForm = () => {
  return (
    <div className="flex w-full flex-col gap-8">
      <StepperProvider variant="progress">
        <MemoizedStepperFormContent />
      </StepperProvider>
    </div>
  )
}

export default ReconciliationStepperForm