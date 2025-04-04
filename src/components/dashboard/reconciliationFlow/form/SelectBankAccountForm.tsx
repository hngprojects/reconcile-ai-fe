import * as React from 'react'
import { z } from 'zod'
import { useFormContext, Controller } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const dummyBankData = [
  {
    id: '1',
    name: 'First Bank',
    accountNumber: '123456789',
    bal: '1,565,777.00',
    type: 'savings',
  },
  {
    id: '2',
    name: 'Access Bank',
    accountNumber: '987654321',
    bal: '1,565.00',
    type: 'current',
  },
  {
    id: '3',
    name: 'Sterling Bank',
    accountNumber: '456123789',
    bal: '777.00',
    type: 'savings',
  },
]

export const SelectBankAccountSchema = z.object({
  selectedBankId: z.string().min(1, 'Please select a bank account').default(''),
})

type SelectBankAccountFormValues = z.infer<typeof SelectBankAccountSchema>

const SelectBankAccountForm = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<SelectBankAccountFormValues>()

  const selectedBankId = watch('selectedBankId')
  const selectedBank = dummyBankData.find((bank) => bank.id === selectedBankId)

  return (
    <div className="space-y-6 text-start">
      {/* Bank Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Bank Account</label>
        <Controller
          name="selectedBankId"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a bank account" />
              </SelectTrigger>
              <SelectContent>
                {dummyBankData.map((bank) => (
                  <SelectItem key={bank.id} value={bank.id}>
                    {`${bank.type.charAt(0).toUpperCase() + bank.type.slice(1)} Account (${bank.name})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.selectedBankId && (
          <span className="text-destructive text-sm">
            {errors.selectedBankId.message}
          </span>
        )}
      </div>

      {/* Selected Bank Details */}
      {selectedBank && (
        <div className="space-y-2 rounded-xl border border-black/15 bg-[#F9FAFB] px-6 py-5">
          <h5 className="text-sm font-medium">Account Details</h5>
          <div className="flex items-center justify-between text-sm text-[#475467]">
            <div>
              Bank:{' '}
              <span className="font-medium text-black">
                {selectedBank.name}
              </span>
            </div>
            <div>
              Current Balance:{' '}
              <span className="font-medium text-black">
                ₦{selectedBank.bal}
              </span>
            </div>
          </div>
        </div>
      )}

      <div>
        <Button
          variant="link"
          className="cursor-pointer px-0 hover:no-underline has-[>svg]:px-0"
        >
          <Plus className="size-5 shrink-0 stroke-2" />
          <span>Add a new bank account</span>
        </Button>
      </div>
    </div>
  )
}

export default SelectBankAccountForm
