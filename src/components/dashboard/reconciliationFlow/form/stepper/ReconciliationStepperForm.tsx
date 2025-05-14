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
import { addLedgers, addStatements, createRecon, reconcileFiles, saveDraft, startReconciliation } from '@/actions/reconcilation'

// Define step-specific form values types
type StepFormValues = {
  'step-1': { ledgers: Record<string, boolean>; saveAsDefault: boolean }
  'step-2': {
    file: File
    bankAccount: string
    period: { from: string; to: string },
    mapper: Record<string, string>
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
    console.log('onSubmit called with values:', values);
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
      }
      if (stepId === 'step-2') {
        updateFormState({
          currentStep: stepNumber,
        });
        if (formState.reconciliation_id) {
          await addStatements(
            formState.bankStatements,
            formState.reconciliation_id
          );
        }
        router.push('/dashboard/reconcile?step=3');
      }
      else if (stepId === 'step-3') {
        const ledgIds = Object.keys(formState.selectedLedgers)
          .filter((ledg) => formState.selectedLedgers[ledg]);

        // Check if this is a draft reconciliation (has reconciliation_id)
        if (formState.reconciliation_id) {
          // This is a draft - start the reconciliation process
          const { status } = await startReconciliation(formState.reconciliation_id);

          if (status === 'success') {
            updateFormState({ currentStep: stepNumber });
            router.push('/dashboard/recon-processing');
          } else {
            throw new Error('Failed to start AI reconciliation process');
          }
        } else {
          // This is a new reconciliation - create and reconcile
          const { status, data } = await reconcileFiles(
            formState.bankStatements,
            ledgIds,
            formState.title
          );

          if (status === 'success') {
            updateFormState({
              currentStep: stepNumber,
              reconciliation_id: data.data.reconciliation_id
            });
            router.push('/dashboard/recon-processing');
          } else {
            throw new Error('Failed to initiate AI reconciliation');
          }
        }
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
      console.error('Form submission error:', error);
    }
  };

  const handleSaveDraft = async () => {
    try {
      switch (formState.currentStep) {
        case 1:
          throw new Error('Save draft not available at this step');

        case 2:
          await handleStep2Submission();
          break;

        case 3:
          await handleStep3Submission();
          break;

        case 4: // Processing
        case 5: // AI Matching
        case 6: // Confirming Results
          await saveCurrentStep();
          break;

        default:
          throw new Error('Invalid step for saving draft');
      }

      toast.success('Progress saved successfully!');
      router.push('/dashboard/reconciliation');

    } catch (err) {
      const error = err as Error;
      console.error('Save draft error:', error);
      toast.error(error.message || 'Failed to save progress');
    }
  };

  const handlePrevBtn = () => {
    if (stepper.isFirst) {
      router.back();
    } else {
      const currentStepNumber = parseInt(stepper.current.id.split('-')[1]);
      updateFormState({ currentStep: currentStepNumber - 1 });
      router.push(
        `/dashboard/reconcile?step=${currentStepNumber - 1}`
      );
    }
  };

  // Step 2: Create reconciliation with ledgers (and statements if present)
  const handleStep2Submission = async () => {
    // Create reconciliation
    const { status: createStatus, data } = await createRecon(formState.title);
    if (createStatus !== 'success') {
      throw new Error('Failed to create reconciliation');
    }

    // Add ledgers
    const ledgers = Object.keys(formState.selectedLedgers)
      .filter(ledg => formState.selectedLedgers[ledg]);

    const { status: ledgerStatus } = await addLedgers(ledgers, data.id);
    if (ledgerStatus !== 'success') {
      throw new Error('Failed to add ledgers to reconciliation');
    }

    updateFormState({ reconciliation_id: data.id });

    if (formState.bankStatements.length > 0) {
      const { status: stmtStatus } = await addStatements(
        formState.bankStatements,
        data.id
      );

      if (stmtStatus !== 'success') {
        throw new Error('Failed to add initial statements');
      }

      updateFormState({ currentStep: 3 });
    } else {
      // Do not call saveDraft here; backend sets draft after ledgers
      updateFormState({ currentStep: 3 });
    }

  };

  // Step 3: Additional statements
  const handleStep3Submission = async () => {
    // Save statements
    const { status: stmtStatus } = await addStatements(
      formState.bankStatements,
      formState.reconciliation_id as string
    );

    if (stmtStatus !== 'success') {
      throw new Error('Failed to save statements');
    }

  };

  // Steps 4-7: Save current progress
  const saveCurrentStep = async () => {
    const { status } = await saveDraft(
      formState.currentStep,
      formState.reconciliation_id as string
    );

    if (status !== 'success') {
      throw new Error('Failed to save progress');
    }
  };

  useEffect(() => {
    const step = searchParams.get('step') || formState.currentStep;
    if (step) {
      const stepNumber = typeof step === 'string' ? parseInt(step) : step;
      if (stepNumber > 1 && stepNumber <= steps.length) {
        stepper.goTo(`step-${stepNumber}` as StepId);
      }
    }
  }, [searchParams, stepper, formState]);

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

            {!stepper.isLast && !stepper.isFirst && Number(stepper.current.id.split('-')[1]) > 3 && (
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