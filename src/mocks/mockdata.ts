// Mock data for General Ledger
interface GeneralLedgerItem {
  date: string
  description: string
  amount: number
  paid: number
  reconciled: boolean
  bankReference: string
}

interface VendorLedgerItem {
  date: string
  vendorName: string
  description: string
  amount: number
  paid: number
  outstanding: number
  reconciled: boolean
  bankReference: string
}

interface CustomerLedgerItem {
  date: string
  customerName: string
  description: string
  amount: number
  received: number
  outstanding: number
  reconciled: boolean
  bankReference: string
}

export const generalData: GeneralLedgerItem[] = [
  
]

// Sample data for Vendors Ledger
export const vendorsData: VendorLedgerItem[] = [
  
]

// Sample data for Customers Ledger
export const customersData: CustomerLedgerItem[] = [
  
]
