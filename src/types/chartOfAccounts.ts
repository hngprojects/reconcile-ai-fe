import { z } from 'zod'

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

export const addChartOfAccountFormSchema = z.object({
  category: z
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
    })
    .optional(),
  openingBalance: z.coerce
    .number()
    .min(1, { message: 'Opening balance must be a positive number' })
    .default(0),
})
