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
  {
    date: 'Jan 15, 2025',
    description: 'Monthly Office Rent',
    amount: -45000,
    paid: -45000,
    reconciled: true,
    bankReference: 'TRF-20250115-001',
  },
  {
    date: 'Jan 18, 2025',
    description: 'Software Subscription',
    amount: -12000,
    paid: -12000,
    reconciled: true,
    bankReference: 'TRF-20250118-023',
  },
  {
    date: 'Jan 25, 2025',
    description: 'Utility Bills',
    amount: -8500,
    paid: -8500,
    reconciled: false,
    bankReference: '',
  },
  {
    date: 'Feb 01, 2025',
    description: 'Monthly Office Rent',
    amount: -45000,
    paid: -45000,
    reconciled: true,
    bankReference: 'TRF-20250201-018',
  },
  {
    date: 'Jan 15, 2025',
    description: 'Monthly Office Rent',
    amount: -45000,
    paid: -45000,
    reconciled: true,
    bankReference: 'TRF-20250115-001',
  },
  {
    date: 'Jan 18, 2025',
    description: 'Software Subscription',
    amount: -12000,
    paid: -12000,
    reconciled: true,
    bankReference: 'TRF-20250118-023',
  },
  {
    date: 'Jan 25, 2025',
    description: 'Utility Bills',
    amount: -8500,
    paid: -8500,
    reconciled: false,
    bankReference: '',
  },
  {
    date: 'Feb 01, 2025',
    description: 'Monthly Office Rent',
    amount: -45000,
    paid: -45000,
    reconciled: true,
    bankReference: 'TRF-20250201-018',
  },
  {
    date: 'Feb 05, 2025',
    description: 'Equipment Purchase',
    amount: -120000,
    paid: -80000,
    reconciled: false,
    bankReference: '',
  },
  {
    date: 'Feb 15, 2025',
    description: 'Internet Subscription',
    amount: -15000,
    paid: -15000,
    reconciled: true,
    bankReference: 'TRF-20250215-042',
  },
  {
    date: 'Jan 15, 2025',
    description: 'Monthly Office Rent',
    amount: -45000,
    paid: -45000,
    reconciled: true,
    bankReference: 'TRF-20250115-001',
  },
  {
    date: 'Jan 18, 2025',
    description: 'Software Subscription',
    amount: -12000,
    paid: -12000,
    reconciled: true,
    bankReference: 'TRF-20250118-023',
  },
  {
    date: 'Jan 25, 2025',
    description: 'Utility Bills',
    amount: -8500,
    paid: -8500,
    reconciled: false,
    bankReference: '',
  },
  {
    date: 'Feb 01, 2025',
    description: 'Monthly Office Rent',
    amount: -45000,
    paid: -45000,
    reconciled: true,
    bankReference: 'TRF-20250201-018',
  },
]

// Sample data for Vendors Ledger
export const vendorsData: VendorLedgerItem[] = [
  {
    date: 'Jan 25, 2025',
    vendorName: 'Online Sales',
    description: 'Utility Bills',
    amount: -100000,
    paid: -100000,
    outstanding: 0,
    reconciled: true,
    bankReference: 'TRF-20250115-001',
  },
  {
    date: 'Feb 25, 2025',
    vendorName: 'Staff Salaries',
    description: 'Inventory Purchase',
    amount: -75000,
    paid: -75000,
    outstanding: 0,
    reconciled: false,
    bankReference: 'TRF-20250115-003',
  },
  {
    date: 'Mar 25, 2025',
    vendorName: 'Online Sales',
    description: 'Inventory Purchase',
    amount: -100000,
    paid: -75000,
    outstanding: 25000,
    reconciled: false,
    bankReference: '',
  },
  {
    date: 'Apr 25, 2025',
    vendorName: 'Online Sales',
    description: 'Marketing Campaign',
    amount: -75000,
    paid: -75000,
    outstanding: 0,
    reconciled: false,
    bankReference: '',
  },
  {
    date: 'May 25, 2025',
    vendorName: 'Online Sales',
    description: 'Office Supplies',
    amount: -100000,
    paid: -100000,
    outstanding: 0,
    reconciled: true,
    bankReference: 'TRF-20250315-001',
  },
  {
    date: 'Jun 25, 2025',
    vendorName: 'Online Sales',
    description: 'Inventory Purchase',
    amount: -75000,
    paid: -75000,
    outstanding: 0,
    reconciled: false,
    bankReference: '',
  },
]

// Sample data for Customers Ledger
export const customersData: CustomerLedgerItem[] = [
  {
    date: 'Jan 10, 2025',
    customerName: 'Acme Corp',
    description: 'Invoice #INV-001',
    amount: 150000,
    received: 150000,
    outstanding: 0,
    reconciled: true,
    bankReference: 'TRF-20250110-031',
  },
  {
    date: 'Jan 22, 2025',
    customerName: 'Global Industries',
    description: 'Invoice #INV-002',
    amount: 75000,
    received: 50000,
    outstanding: 25000,
    reconciled: false,
    bankReference: 'TRF-20250122-045',
  },
  {
    date: 'Feb 05, 2025',
    customerName: 'Tech Solutions',
    description: 'Invoice #INV-003',
    amount: 120000,
    received: 120000,
    outstanding: 0,
    reconciled: true,
    bankReference: 'TRF-20250205-078',
  },
  {
    date: 'Feb 18, 2025',
    customerName: 'Retail Partners',
    description: 'Invoice #INV-004',
    amount: 60000,
    received: 0,
    outstanding: 60000,
    reconciled: false,
    bankReference: '',
  },
  {
    date: 'Mar 01, 2025',
    customerName: 'Acme Corp',
    description: 'Invoice #INV-005',
    amount: 90000,
    received: 90000,
    outstanding: 0,
    reconciled: true,
    bankReference: 'TRF-20250301-012',
  },
  {
    date: 'Mar 15, 2025',
    customerName: 'Global Industries',
    description: 'Invoice #INV-006',
    amount: 135000,
    received: 100000,
    outstanding: 35000,
    reconciled: false,
    bankReference: 'TRF-20250315-067',
  },
]
