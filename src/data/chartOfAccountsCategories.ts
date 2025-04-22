import { expenseAccountData, revenueAccountData } from '@/mocks/chartOfAccounts'
import { AccountCategory } from '@/types/chartOfAccounts'

export const chartOfAccountsCategories: AccountCategory[] = [
  {
    id: 1,
    title: 'Revenue',
    short_description: 'Track income from sales and services',
    full_description:
      'This account tracks all income and appears in the Revenue section of your P&L report.',
    is_active: true,
    data: revenueAccountData,
  },
  {
    id: 2,
    title: 'Expenses',
    short_description: 'Costs of running your business',
    full_description:
      'This account tracks all costs and appears in the Expenses section of your P&L report.',
    is_active: true,
    data: expenseAccountData,
  },
  {
    id: 3,
    title: 'Assets',
    short_description: 'Things your business owns',
    full_description: 'Things your business owns',
    is_active: false,
    data: [],
  },
  {
    id: 4,
    title: 'Liabilities',
    short_description: 'Debts your business owes',
    full_description: 'Debts your business owes',
    is_active: false,
    data: [],
  },
  {
    id: 5,
    title: 'Equity',
    short_description: "Owner's stake in the business",
    full_description: "Owner's stake in the business",
    is_active: false,
    data: [],
  },
]
