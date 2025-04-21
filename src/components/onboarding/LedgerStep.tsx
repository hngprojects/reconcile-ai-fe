'use client'
import { handle_account_setup } from '@/actions/accountSetup'
import { useOnBoardingStore } from '@/store/onboarding-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Switch } from '../ui/switch'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

export const LedgerFormSchema = z.object({
  generalLedger: z.boolean().default(true),
  vendorLedger: z.boolean().default(false),
  customerLedger: z.boolean().default(false),
})

export type LedgerFormValues = z.infer<typeof LedgerFormSchema>

export default function LedgerStep() {
  const { update, data: session } = useSession()
  const [isPending, startTransition] = useTransition()
  const {
    basicInfo,
    bankInfo,
    ledgerSettings,
    updateLedgerSettings,
    handleNext,
    handleBack,
    setCurrentStep,
    reset,
  } = useOnBoardingStore()

  const form = useForm<LedgerFormValues>({
    resolver: zodResolver(LedgerFormSchema),
    defaultValues: {
      generalLedger: ledgerSettings.generalLedger,
      vendorLedger: ledgerSettings.vendorLedger,
      customerLedger: ledgerSettings.customerLedger,
    },
  })

  const onSubmit = (data: LedgerFormValues) => {
    updateLedgerSettings(data)

    const ledgerTypes = ['general']

    if (data.vendorLedger) {
      ledgerTypes.push('vendor')
    }

    if (data.customerLedger) {
      ledgerTypes.push('customer')
    }

    startTransition(() => {
      handle_account_setup({
        business_name: basicInfo.businessName,
        business_type: basicInfo.businessType,
        reporting_year: basicInfo.reportingYear,
        currency: basicInfo.currency,

        bank_name: bankInfo.bankName,
        account_name: bankInfo.accountName,
        account_number: bankInfo.accountNumber,
        opening_balance: Number(bankInfo.openingCashBalance),

        ledger_types: ledgerTypes,
      }).then(async ({ success, message }) => {
        if (success === true) {
          await update({
            user: {
              ...session?.user,
              is_new_user: false,
            },
          })

          toast.success('Onboarding Successful', {
            description: message,
          })

          handleNext()
          reset()
        } else {
          toast.error('Onboarding Failed', {
            description: 'Account setup failed',
          })

          reset()
          setCurrentStep(1)
        }
      })
    })
  }

  return (
    <Form {...form}>
      <form className="mt-5 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="mb-7 space-y-4">
            <h3 className="mb-2 font-medium">Active Ledgers</h3>
            <p className="text-muted-foreground text-sm">
              Select which ledgers you want to use in your accounting system
            </p>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="generalLedger"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label htmlFor="generalLedger">General Ledger</Label>
                    <p className="text-muted-foreground text-sm">
                      Main accounting ledger for all transactions
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      id="generalLedger"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={true} // General ledger is required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="vendorLedger"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label htmlFor="vendorLedger">Vendor Ledger</Label>
                    <p className="text-muted-foreground text-sm">
                      Track accounts payable and vendor transactions
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      id="vendorLedger"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="customerLedger"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label htmlFor="customerLedger">Customer Ledger</Label>
                    <p className="text-muted-foreground text-sm">
                      Track accounts receivable and customer transactions
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      id="customerLedger"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 sm:w-[137px] sm:flex-none"
            onClick={handleBack}
            disabled={isPending}
          >
            Back
          </Button>

          <Button
            type="submit"
            className="flex-1 p-3 sm:w-[137px] sm:flex-none"
            disabled={form.formState.isSubmitting || isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Continue'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
