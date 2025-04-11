'use client'
import { useOnBoardingStore } from '@/store/onboarding-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'

export const bankFormSchema = z.object({
  bankName: z
    .string()
    .min(1, 'Bank name is required')
    .max(100, 'Bank name cannot exceed 100 characters')
    .refine((val) => val === '' || /^[a-zA-Z\s]+$/.test(val), {
      message: 'Bank name should only contain letters',
    }),

  accountName: z
    .string()
    .min(1, 'Account name is required')
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
    .min(1, 'Opening cash balance is required')
    .refine((val) => val === '' || /^\d+(\.\d{1,2})?$/.test(val), {
      message: 'Please enter a valid amount',
    }),
})

export type BankFormValues = z.infer<typeof bankFormSchema>

export default function BankStep() {
  const { basicInfo, bankInfo, updateBankInfo, handleNext, handleBack } =
    useOnBoardingStore()

  const form = useForm<BankFormValues>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      bankName: bankInfo.bankName,
      accountName: bankInfo.accountName,
      accountNumber: bankInfo.accountNumber,
      openingCashBalance: bankInfo.openingCashBalance,
    },
  })

  const onSubmit = (data: BankFormValues) => {
    updateBankInfo(data)
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <FormControl>
                    <Input
                      {...field}
                      className="!h-12 w-full placeholder:text-sm"
                      id="bankName"
                      placeholder="e.g., Guaranty Trust Bank"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="accountName">Account Name</Label>
                  <FormControl>
                    <Input
                      {...field}
                      className="!h-12 w-full placeholder:text-sm"
                      id="accountName"
                      placeholder="e.g., Business Account"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <FormControl>
                    <Input
                      {...field}
                      className="!h-12 w-full placeholder:text-sm"
                      id="accountNumber"
                      placeholder="e.g., 1234567890"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="openingCashBalance"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="openingBalance">Opening Cash Balance</Label>
                  <div className="relative">
                    <span className="absolute top-1/2 left-3 -translate-y-1/2">
                      {basicInfo.currency === 'NGN'
                        ? '₦'
                        : basicInfo.currency === 'USD'
                          ? '$'
                          : basicInfo.currency === 'EUR'
                            ? '€'
                            : '£'}
                    </span>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        id="openingBalance"
                        className="!h-12 w-full pl-8 placeholder:text-sm"
                        placeholder="0.00"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-8 flex justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 sm:w-[137px] sm:flex-none"
              onClick={handleBack}
            >
              Back
            </Button>

            <Button
              type="submit"
              className="flex-1 p-3 sm:w-[137px] sm:flex-none"
              disabled={form.formState.isSubmitting}
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
