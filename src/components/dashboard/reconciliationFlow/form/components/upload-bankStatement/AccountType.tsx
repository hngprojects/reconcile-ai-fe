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
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

const AccountType = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()
  const bankAccount = watch('bankAccount')

  return (
    <Select
      value={bankAccount}
      onValueChange={(value) =>
        setValue('bankAccount', value, { shouldValidate: true })
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
          <SelectItem value="access">POS Wallet (Access Bank)</SelectItem>
          <SelectItem value="first">Savings Account (First Bank)</SelectItem>
          <SelectItem value="gtb">Main Account (GTB)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default AccountType
