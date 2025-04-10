'use client'
import { useOnBoardingStore } from '@/store/onboarding-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Switch } from '../ui/switch'

export const LedgerFormSchema = z.object({
  generalLedger: z.boolean().default(true),
  vendorLedger: z.boolean().default(false),
  customerLedger: z.boolean().default(false),
})

export type LedgerFormValues = z.infer<typeof LedgerFormSchema>

export default function LedgerStep() {
  const { ledgerSettings, updateLedgerSettings, handleNext, handleBack } =
    useOnBoardingStore()

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
    handleNext()
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
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            type="button"
            variant="outline"
            className="w-[137px]"
            onClick={handleBack}
          >
            Back
          </Button>

          <Button
            type="submit"
            className="w-[137px] p-3"
            disabled={form.formState.isSubmitting}
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  )
}
