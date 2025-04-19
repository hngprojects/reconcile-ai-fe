export interface AccountItem {
  amount: number
  account_name: string
  description: string
  balance: number
}

export interface AccountCategory {
  category: string
  short_description: string
  full_description: string
  isActive: boolean
  data: AccountItem[]
}
