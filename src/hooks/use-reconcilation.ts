import { create } from 'zustand'

interface ReconciliationState {
  fromDate: Date | undefined
  toDate: Date | undefined
  isFilterApplied: boolean
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
  applyFilter: () => void
  resetFilter: () => void
}

export const useReconciliationStore = create<ReconciliationState>((set) => ({
  fromDate: undefined,
  toDate: undefined,
  isFilterApplied: false,
  setFromDate: (date) => set({ fromDate: date }),
  setToDate: (date) => set({ toDate: date }),
  applyFilter: () => set({ isFilterApplied: true }),

  resetFilter: () =>
    set({
      fromDate: undefined,
      toDate: undefined,
      isFilterApplied: false,
    }),
}))
