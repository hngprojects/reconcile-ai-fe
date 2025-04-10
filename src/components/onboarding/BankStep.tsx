import { useOnBoardingStore } from '@/store/onboarding-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export const bankFormSchema = z.object({
  bankName: z
    .string()
    .max(100, 'Bank name cannot exceed 100 characters')
    .refine((val) => val === '' || /^[a-zA-Z\s]+$/.test(val), {
      message: 'Bank name should only contain letters',
    }),

  accountName: z
    .string()
    .max(100, 'Account name cannot exceed 100 characters')
    .refine((val) => val === '' || /^[a-zA-Z\s]+$/.test(val), {
      message: 'Account name should only contain letters',
    }),

  accountNumber: z
    .string()
    .min(10, 'Account number must be at least 10 digits')
    .max(20, 'Account number cannot exceed 20 digits')
    .refine((val) => val === '' || /^\d+$/.test(val), {
      message: 'Account number should only contain numbers',
    }),

  openingCashBalance: z
    .string()
    .refine((val) => val === '' || /^\d+(\.\d{1,2})?$/.test(val), {
      message: 'Please enter a valid amount',
    }),
})

export default function BankStep() {
  const { bankInfo, updateBankInfo, handleNext, handleBack } =
    useOnBoardingStore()

  const form = useForm<z.infer<typeof bankFormSchema>>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      bankName: bankInfo.bankName,
      accountName: bankInfo.accountName,
      accountNumber: bankInfo.accountNumber,
      openingCashBalance: bankInfo.openingCashBalance,
    },
  })

  const onSubmit = (data: z.infer<typeof bankFormSchema>) => {
    const result = bankFormSchema.safeParse(data)

    if (!result.success) return null

    updateBankInfo({
      bankName: data.bankName,
      accountName: data.accountName,
      accountNumber: data.accountNumber,
      openingCashBalance: data.openingCashBalance,
    })

    handleNext()
  }

  return (
    <div className="mt-[27px] w-full">
      <div className="mb-6">
        <h3 className="text-[20px] font-semibold">Bank Account Setup</h3>
        <p className="text-sm text-[#4D4D4D]">
          Add your primary bank account details
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              className="!h-12 w-full placeholder:text-sm"
              id="bankName"
              name="bankName"
              // value={}
              // onChange={}
              placeholder="e.g., Guaranty Trust Bank"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountName">Account Name</Label>
            <Input
              className="!h-12 w-full placeholder:text-sm"
              id="accountName"
              name="accountName"
              // value={}
              // onChange={}
              placeholder="e.g., Business Account"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              className="!h-12 w-full placeholder:text-sm"
              id="accountNumber"
              name="accountNumber"
              // value={}
              // onChange={}
              placeholder="e.g., 1234567890"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="openingBalance">Opening Cash Balance</Label>
            <div className="relative">
              <span className="absolute top-1/2 left-3 -translate-y-1/2">
                ₦
              </span>
              <Input
                id="openingBalance"
                name="openingBalance"
                className="!h-12 w-full pl-8 placeholder:text-sm"
                placeholder="0.00"
                // value={}
                // onChange={}
              />
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Enter your current cash and bank balances
            </p>
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
    </div>
  )
}
