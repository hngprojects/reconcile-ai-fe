import { FormEvent, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'

interface FormData {
  businessName: string
  businessType: string
  reportingYear: string
  currency: string
  bankName: string
  accountName: string
  accountNumber: string
  openingCashBalance: string
  generalLedger: boolean
  vendorLedger: boolean
  customerLedger: boolean
}

interface BankStepProps {
  formData: FormData
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  handleNext: () => void
  handleBack: () => void
}

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

export default function BankStep({
  formData,
  handleInputChange,
  handleNext,
  handleBack,
}: BankStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    // Validate form with Zod
    const result = bankFormSchema.safeParse({
      bankName: formData.bankName,
      accountName: formData.accountName,
      accountNumber: formData.accountNumber,
      openingCashBalance: formData.openingCashBalance,
    })

    if (!result.success) {
      // Extract error messages
      const formattedErrors: Record<string, string> = {}
      result.error.errors.forEach((error) => {
        if (error.path) {
          formattedErrors[error.path[0].toString()] = error.message
        }
      })
      setErrors(formattedErrors)
      return
    }

    // Clear errors and proceed
    setErrors({})
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
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <Label
              className="flex items-center gap-1 text-base text-[#333333] md:text-[20px]"
              htmlFor="bankName"
            >
              <span>Bank Name</span>
              <span className="text-[#F30707]">*</span>
            </Label>
            <Input
              type="text"
              id="bankName"
              name="bankName"
              required
              value={formData.bankName}
              onChange={handleInputChange}
              placeholder="e.g Guaranty Trust Bank"
              className="mt-3 h-12 w-full rounded-[6px] border border-[#D1D5DB] p-3 text-[#667085] shadow-sm"
            />
            {errors.bankName && (
              <p className="mt-1 text-sm text-red-500">{errors.bankName}</p>
            )}
          </div>

          <div>
            <Label
              className="flex items-center gap-1 text-base text-[#333333] md:text-[20px]"
              htmlFor="accountName"
            >
              <span>Account Name</span>
              <span className="text-[#F30707]">*</span>
            </Label>
            <Input
              type="text"
              id="accountName"
              required
              name="accountName"
              value={formData.accountName}
              onChange={handleInputChange}
              placeholder="e.g Business Account"
              className="mt-3 h-12 w-full rounded-[6px] border border-[#D1D5DB] p-3 text-[#667085] shadow-sm"
            />
            {errors.accountName && (
              <p className="mt-1 text-sm text-red-500">{errors.accountName}</p>
            )}
          </div>

          <div>
            <Label
              className="flex items-center gap-1 text-base text-[#333333] md:text-[20px]"
              htmlFor="accountNumber"
            >
              <span>Account Number</span>
              <span className="text-[#F30707]">*</span>
            </Label>
            <Input
              type="text"
              id="accountNumber"
              name="accountNumber"
              required
              value={formData.accountNumber}
              onChange={handleInputChange}
              placeholder="e.g 1234567890"
              className="mt-3 h-12 w-full rounded-[6px] border border-[#D1D5DB] p-3 text-[#667085] shadow-sm"
            />
            {errors.accountNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.accountNumber}
              </p>
            )}
          </div>

          <div>
            <Label
              className="flex items-center gap-1 text-base text-[#333333] md:text-[20px]"
              htmlFor="openingCashBalance"
            >
              <span>Opening Cash Balance</span>
              <span className="text-[#F30707]">*</span>
            </Label>

            <Input
              type="text"
              id="openingCashBalance"
              name="openingCashBalance"
              required
              value={formData.openingCashBalance}
              onChange={handleInputChange}
              placeholder="# 0.00"
              className="mt-3 h-12 w-full rounded-[6px] border border-[#D1D5DB] p-3 text-[#667085] shadow-sm"
            />
            {errors.openingCashBalance && (
              <p className="mt-1 text-sm text-red-500">
                {errors.openingCashBalance}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            type="button"
            className="w-[137px] border border-[#C0C0C0] bg-white p-3 text-[#333333]"
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
