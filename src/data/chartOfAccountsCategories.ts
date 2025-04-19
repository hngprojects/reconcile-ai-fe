import { expenseAccountData, revenueAccountData } from '@/mocks/chartOfAccounts'
import { AccountCategory } from '@/types/chartOfAccounts'

export const chartOfAccountsCategories: AccountCategory[] = [
  {
    category: 'Revenue',
    short_description: 'Track income from sales and services',
    full_description:
      'This account tracks all income and appears in the Revenue section of your P&L report.',
    isActive: true,
    data: revenueAccountData,
  },
  {
    category: 'Expenses',
    short_description: 'Costs of running your business',
    full_description:
      'This account tracks all costs and appears in the Expenses section of your P&L report.',
    isActive: true,
    data: expenseAccountData,
  },
  {
    category: 'Assets',
    short_description: 'Things your business owns',
    full_description: 'Things your business owns',
    isActive: false,
    data: [],
  },
  {
    category: 'Liabilities',
    short_description: 'Debts your business owes',
    full_description: 'Debts your business owes',
    isActive: false,
    data: [],
  },
  {
    category: 'Equity',
    short_description: "Owner's stake in the business",
    full_description: "Owner's stake in the business",
    isActive: false,
    data: [],
  },
]
