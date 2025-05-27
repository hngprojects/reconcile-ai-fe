import { ReconciliationResultType, Summary } from '@/types/reconciliation'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface BankStatementData {
  file: File | null
  bankAccount: string
  period: {
    from: string
    to: string
  }
  mapper?: Record<string, string>
}

export interface ReconciliationFormState {
  currentStep: number
  selectedLedgers: Record<string, boolean>
  bankStatements: BankStatementData[]
  processingComplete?: boolean
  reconciliation_id: string | null
  summary: Summary | null
  results: ReconciliationResultType | null
  title: string
}

interface ReconciliationStore {
  formState: ReconciliationFormState
  updateFormState: (updates: Partial<ReconciliationFormState>) => void
  addBankStatement: (statement: BankStatementData) => void
  updateBankStatement: (
    index: number,
    statement: Partial<BankStatementData>
  ) => void
  removeBankStatement: (index: number) => void
  clearStore: () => void
}

const initialState: ReconciliationFormState = {
  currentStep: 1,
  selectedLedgers: {},
  bankStatements: [],
  processingComplete: false,
  reconciliation_id: null,
  title: '',
  summary: null,
  results: null,
}

export const useReconciliationStore = create<ReconciliationStore>()(
  persist(
    (set) => ({
      formState: initialState,

      updateFormState: (updates) =>
        set((state) => ({
          formState: { ...state.formState, ...updates },
        })),

      addBankStatement: (statement) =>
        set((state) => ({
          formState: {
            ...state.formState,
            bankStatements: [...state.formState.bankStatements, statement],
          },
        })),

      updateBankStatement: (index, statement) =>
        set((state) => ({
          formState: {
            ...state.formState,
            bankStatements: state.formState.bankStatements.map((s, i) =>
              i === index ? { ...s, ...statement } : s
            ),
          },
        })),

      removeBankStatement: (index) =>
        set((state) => ({
          formState: {
            ...state.formState,
            bankStatements: state.formState.bankStatements.filter(
              (_, i) => i !== index
            ),
          },
        })),
      clearStore: () =>
        set(() => {
          // Reset formState to initialState
          return { formState: initialState }
        }),
    }),
    {
      name: 'reconciliation-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
