export interface BankAccount {
  id: number
  user_id: number
  bank_name: string
  account_number: string
  account_name: string
  opening_balance: number
  currency: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface BankAccountsResponse {
  message: string
  status: string
  status_code: number
  data: BankAccount[]
}
