import { create } from 'zustand'
import type { AccountCategory } from '@/types/chartOfAccounts'
import { chartOfAccountsCategories } from '@/data/chartOfAccountsCategories'

interface ChartOfAccountsCategoriesState {
  categories: AccountCategory[]
  toggleCategory: (category: string) => void
  isDisabled: (category: string) => boolean
}

export const useChartOfAccountCategoriesStore =
  create<ChartOfAccountsCategoriesState>((set, get) => ({
    categories: chartOfAccountsCategories,

    toggleCategory: (category: string) => {
      if (get().isDisabled(category)) return

      set((state) => ({
        categories: state.categories.map((item) =>
          item.category === category
            ? { ...item, isActive: !item.isActive }
            : item
        ),
      }))
    },

    isDisabled: (category: string) => {
      return category === 'Revenue' || category === 'Expenses'
    },
  }))
