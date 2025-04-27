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
import { UploadBankStatementValues } from './UploadBankStatement'
import { useBankAccounts } from '@/hooks/useBankAccounts'
import { Skeleton } from '@/components/ui/skeleton'
import type { BankAccount } from '@/types/bankAccounts'

const BankAccountSelect = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<UploadBankStatementValues>()

  const { data: bankAccountsResponse, isLoading, error } = useBankAccounts()
  const bankAccounts = bankAccountsResponse?.data || []
  const bankAccount = watch('bankAccount')

  const formatAccountLabel = (account: BankAccount) => {
    return `${account.bank_name} - ${account.account_name} (${account.account_number})`
  }

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
          'group hover:bg-accent dark:border-border dark:bg-background dark:text-foreground dark:data-[placeholder]:text-muted-foreground flex w-full cursor-pointer items-center justify-between border-black/20 placeholder:text-sm placeholder:font-medium data-[placeholder]:text-black data-[size=default]:h-10 [&_[data-radix-select-chevron]]:hidden',
          errors.bankAccount && 'dark:border-destructive border-[#C50700]'
        )}
      >
        <SelectValue placeholder="Select Bank Account" />
        <ChevronDown className="dark:text-foreground/60 size-4 text-black/60 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180" />
      </SelectTrigger>
      <SelectContent
        sideOffset={3}
        align="center"
        className="dark:bg-background"
      >
        <SelectGroup>
          {isLoading ? (
            <SelectItem value="loading" disabled>
              <Skeleton className="h-4 w-[200px]" />
            </SelectItem>
          ) : error ? (
            <SelectItem value="error" disabled>
              <span className="text-destructive dark:text-destructive-foreground">
                Failed to load accounts
              </span>
            </SelectItem>
          ) : bankAccounts.length === 0 ? (
            <SelectItem value="no-accounts" disabled>
              <span className="text-muted-foreground">
                No bank accounts found
              </span>
            </SelectItem>
          ) : (
            bankAccounts.map((account) => (
              <SelectItem
                key={account.id}
                value={account.id.toString()}
                className="dark:text-foreground"
              >
                {formatAccountLabel(account)}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default BankAccountSelect
