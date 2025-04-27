import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ReconciliationFormState {
  currentStep: number
  selectedLedgers: Record<string, boolean>
  bankStatement: {
    file?: File | null
    bankAccount: string
    period: {
      from: string
      to: string
    }
  }
  saveAsDefault: boolean
}

interface ReconciliationStore {
  formState: ReconciliationFormState
  updateFormState: (updates: Partial<ReconciliationFormState>) => void
  saveDraft: () => void
  loadDraft: () => ReconciliationFormState | null
  clearDraft: () => void
}

const initialState: ReconciliationFormState = {
  currentStep: 1,
  selectedLedgers: {},
  bankStatement: {
    file: null,
    bankAccount: '',
    period: {
      from: '',
      to: '',
    },
  },
  saveAsDefault: false,
}

export const useReconciliationStore = create<ReconciliationStore>()(
  persist(
    (set, get) => ({
      formState: initialState,

      updateFormState: (updates) =>
        set((state) => ({
          formState: { ...state.formState, ...updates },
        })),

      saveDraft: () => {
        const currentState = get().formState
        localStorage.setItem(
          'reconciliationDraft',
          JSON.stringify(currentState)
        )
      },

      loadDraft: () => {
        const savedDraft = localStorage.getItem('reconciliationDraft')
        if (savedDraft) {
          const draft = JSON.parse(savedDraft)
          set({ formState: draft })
          return draft
        }
        return null
      },

      clearDraft: () => {
        localStorage.removeItem('reconciliationDraft')
        set({ formState: initialState })
      },
    }),
    {
      name: 'reconciliation-draft',
      skipHydration: true,
    }
  )
)
