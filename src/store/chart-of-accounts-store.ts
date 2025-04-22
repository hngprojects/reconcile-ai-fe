import type { AccountsCategoryResponse } from '@/types/chartOfAccounts'
import { create } from 'zustand'

interface ChartOfAccountsCategoriesState {
  categories: AccountsCategoryResponse[]
  setCategories: (categories: AccountsCategoryResponse[]) => void
  toggleCategory: (category: string) => void
  isDisabled: (category: string) => boolean
}

export const useChartOfAccountCategoriesStore =
  create<ChartOfAccountsCategoriesState>((set, get) => ({
    categories: [],

    setCategories: (categories) => {
      set({ categories })
    },

    toggleCategory: (id: string) => {
      if (get().isDisabled(id)) return

      set((state) => ({
        categories: state.categories.map((item) =>
          item.id === id ? { ...item, is_active: !item.is_active } : item
        ),
      }))
    },

    isDisabled: (category: string) => {
      return category === 'Revenue' || category === 'Expenses'
    },
  }))
