import { z } from 'zod'

export interface AccountItem {
  amount: number
  account_name: string
  description: string
  balance: number
}

export interface AccountCategory {
  id: string
  title: string
  short_description: string
  full_description: string
  is_active: boolean
  data: AccountItem[]
}

export const addChartOfAccountFormSchema = z.object({
  name: z
    .string({
      required_error: 'Please select an account category',
    })
    .min(1, 'Account category is required'),
  accountNumber: z
    .string()
    .min(1, { message: 'Account number is required' })
    .regex(/^\d+$/, { message: 'Account number must contain only digits' }),
  accountName: z
    .string()
    .min(2, { message: 'Account name must be at least 2 characters' })
    .max(30, { message: 'Account name must be less than 30 characters' }),
  description: z
    .string()
    .min(10, { message: 'Description must be atleast 10 characters' })
    .max(200, {
      message: 'Description must be less than 200 characters',
    }),
  openingBalance: z.coerce
    .number()
    .min(1, { message: 'Opening balance must be a positive number' })
    .default(0),
})

export interface AccountsCategoryResponse {
  id: string
  title: string
  description: string
  created_at: string
  updated_at: string
  is_required: boolean
  is_active: boolean
  data: AccountItem[]
}

export type Account = {
  id: string
  account_number: string
  account_name: string
  balance: number
  description: string
  amount: number
  category: {
    id: string
    title: string
    description: string
    created_at: string
    updated_at: string
    is_required: boolean
    is_active: boolean
  }
}
