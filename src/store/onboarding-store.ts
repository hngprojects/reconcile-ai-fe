import { create } from 'zustand'

export type BasicInfoType = {
  businessName: string
  businessType: string
  reportingYear: string
  currency: string
}

export type BankInfoType = {
  bankName: string
  accountName: string
  accountNumber: string
  openingCashBalance: string
}

export type LedgerSettingsType = {
  generalLedger: boolean
  vendorLedger: boolean
  customerLedger: boolean
}

export interface OnBoardingStore {
  currentStep: number

  basicInfo: BasicInfoType
  bankInfo: BankInfoType
  ledgerSettings: LedgerSettingsType

  setCurrentStep: (step: number) => void
  handleNext: () => void
  handleBack: () => void

  updateBasicInfo: (updates: Partial<BasicInfoType>) => void
  updateBankInfo: (updates: Partial<BankInfoType>) => void
  updateLedgerSettings: (updates: Partial<LedgerSettingsType>) => void
}

export const useOnBoardingStore = create<OnBoardingStore>((set) => ({
  currentStep: 3,

  basicInfo: {
    businessName: '',
    businessType: '',
    reportingYear: '',
    currency: '',
  },

  bankInfo: {
    bankName: '',
    accountName: '',
    accountNumber: '',
    openingCashBalance: '',
  },

  ledgerSettings: {
    generalLedger: true,
    vendorLedger: false,
    customerLedger: false,
  },

  setCurrentStep: (step) => set({ currentStep: step }),

  handleNext: () =>
    set((state) => ({
      currentStep: state.currentStep + 1,
    })),

  handleBack: () =>
    set((state) => ({
      currentStep: state.currentStep - 1,
    })),

  updateBasicInfo: (updates) =>
    set((state) => ({
      basicInfo: { ...state.basicInfo, ...updates },
    })),

  updateBankInfo: (updates) =>
    set((state) => ({
      bankInfo: { ...state.bankInfo, ...updates },
    })),

  updateLedgerSettings: (updates) =>
    set((state) => ({
      ledgerSettings: { ...state.ledgerSettings, ...updates },
    })),
}))
