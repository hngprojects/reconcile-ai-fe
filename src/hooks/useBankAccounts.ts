import { useQuery } from '@tanstack/react-query'
import { fetchBankAccounts } from '@/lib/api'
import type { BankAccount, BankAccountsResponse } from '@/types/bankAccounts'

export function useBankAccounts() {
  return useQuery<BankAccountsResponse>({
    queryKey: ['bank-accounts'],
    queryFn: fetchBankAccounts,
  })
}

export type { BankAccount }
