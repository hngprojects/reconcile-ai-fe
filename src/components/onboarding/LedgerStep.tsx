import { useOnBoardingStore } from '@/store/onboarding-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

export const LedgerFormSchema = z.object({
  generalLedger: z.boolean(),
  vendorLedger: z.boolean(),
  customerLedger: z.boolean(),
})

export default function LedgerStep() {
  const { ledgerSettings, updateLedgerSettings, handleNext, handleBack } =
    useOnBoardingStore()

  const form = useForm<z.infer<typeof LedgerFormSchema>>({
    resolver: zodResolver(LedgerFormSchema),
    defaultValues: {
      generalLedger: ledgerSettings.generalLedger,
      vendorLedger: ledgerSettings.vendorLedger,
      customerLedger: ledgerSettings.customerLedger,
    },
  })

  const onSubmit = (data: z.infer<typeof LedgerFormSchema>) => {
    const result = LedgerFormSchema.safeParse(data)

    if (!result.success) return null

    updateLedgerSettings({
      generalLedger: data.generalLedger,
      vendorLedger: data.vendorLedger,
      customerLedger: data.customerLedger,
    })

    handleNext()
  }

  return (
    <form className="mt-5 w-full" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="mb-7 space-y-4">
          <h3 className="mb-2 font-medium">Active Ledgers</h3>
          <p className="text-muted-foreground text-sm">
            Select which ledgers you want to use in your accounting system
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="generalLedger">General Ledger</Label>
              <p className="text-muted-foreground text-sm">
                Main accounting ledger for all transactions
              </p>
            </div>
            <Switch
              id="generalLedger"
              // checked={}
              // onCheckedChange={}
              disabled={true} // General ledger is required
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="vendorLedger">Vendor Ledger</Label>
              <p className="text-muted-foreground text-sm">
                Track accounts payable and vendor transactions
              </p>
            </div>
            <Switch
              id="vendorLedger"
              // checked={}
              // onCheckedChange={}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="customerLedger">Customer Ledger</Label>
              <p className="text-muted-foreground text-sm">
                Track accounts receivable and customer transactions
              </p>
            </div>
            <Switch
              id="customerLedger"
              // checked={}
              // onCheckedChange={}
            />
          </div>
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

        <Button type="submit" className="w-[137px] p-3">
          Continue
        </Button>
      </div>
    </form>
  )
}
