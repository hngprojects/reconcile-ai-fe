import { create } from 'zustand'

interface BankStatementData {
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
  title: string
}

interface ReconciliationStore {
  formState: ReconciliationFormState
  updateFormState: (updates: Partial<ReconciliationFormState>) => void
  addBankStatement: (statement: BankStatementData) => void
  updateBankStatement: (index: number, statement: Partial<BankStatementData>) => void
  removeBankStatement: (index: number) => void
}

const initialState: ReconciliationFormState = {
  currentStep: 1,
  selectedLedgers: {},
  bankStatements: [],
  processingComplete: false,
  title: '',
}

export const useReconciliationStore = create<ReconciliationStore>()((set) => ({
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
}))
