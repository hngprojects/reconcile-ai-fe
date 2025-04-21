// AccountType.tsx
'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronDown } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { FormValues } from './AddNewStatement'
import { cn } from '@/lib/utils'

interface AccountTypeProps {
  form: UseFormReturn<FormValues>
}

const AccountType = ({ form }: AccountTypeProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = form
  const bankAccount = watch('bankAccount')

  return (
    <Select
      value={bankAccount}
      onValueChange={(value) =>
        setValue('bankAccount', value, {
          shouldValidate: true,
        })
      }
    >
      <SelectTrigger
        hideIcon
        className={cn(
          `group hover:bg-accent flex w-full cursor-pointer items-center justify-between border-black/20 placeholder:text-sm placeholder:font-medium data-[placeholder]:text-black data-[size=default]:h-10 [&_[data-radix-select-chevron]]:hidden`,
          errors.bankAccount && 'border-[#C50700]'
        )}
      >
        <SelectValue placeholder="Select Bank Account" />
        <ChevronDown className="size-4 text-black/60 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180" />
      </SelectTrigger>
      <SelectContent sideOffset={3} align="center">
        <SelectGroup>
          <SelectItem value="POS Wallet (Access Bank)">
            POS Wallet (Access Bank)
          </SelectItem>
          <SelectItem value="Savings Account (First Bank)">
            Savings Account (First Bank)
          </SelectItem>
          <SelectItem value="Main Account (GTB)">Main Account (GTB)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default AccountType
