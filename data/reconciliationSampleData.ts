// Format currency
export const formatCurrency = (amount: number) => {
  return `$ ${amount.toLocaleString("en-US")}`;
};

export interface ReconciliationItem {
  bankStatement: {
    date: string;
    description: string;
    amount: number;
  };
  companyLedger?: {
    date: string;
    description: string;
    amount: number;
  };
  matched: boolean;
}

export interface MobileReconciliationViewProps {
  data: ReconciliationItem[];
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  totalItems: number;
}

export interface BankStatement {
  id: string;
  date: string;
  description: string;
  amount: number;
}

export interface CompanyLedger {
  id: string;
  date: string;
  description: string;
  amount: number;
  matched: boolean;
}

export const bankStatementData: BankStatement[] = [
  {
    id: "1",
    date: "27/01/2024",
    description: "Salary",
    amount: 681321,
  },
  {
    id: "2",
    date: "27/01/2024",
    description: "Ajah Property",
    amount: 665129,
  },
  {
    id: "3",
    date: "27/01/2024",
    description: "Chichi School Fees",
    amount: 615209,
  },
  {
    id: "4",
    date: "27/01/2024",
    description: "Investment",
    amount: 681709,
  },
  {
    id: "5",
    date: "27/01/2024",
    description: "Piggy Savings",
    amount: 121211,
  },
  {
    id: "6",
    date: "27/01/2024",
    description: "Dorathy Loan",
    amount: 312319,
  },
  {
    id: "7",
    date: "27/01/2024",
    description: "Land part payment",
    amount: 552121,
  },
  {
    id: "8",
    date: "27/01/2024",
    description: "Car Installment",
    amount: 838509,
  },
  {
    id: "9",
    date: "28/01/2024",
    description: "Office Rent Payment",
    amount: 950000,
  },
  {
    id: "10",
    date: "28/01/2024",
    description: "Utility Bills Payment",
    amount: 45000,
  },
  {
    id: "11",
    date: "28/01/2024",
    description: "Internet Service Fee",
    amount: 25000,
  },
  {
    id: "12",
    date: "28/01/2024",
    description: "Staff Salaries",
    amount: 1250000,
  },
  {
    id: "13",
    date: "28/01/2024",
    description: "Equipment Purchase",
    amount: 350000,
  },
  {
    id: "14",
    date: "28/01/2024",
    description: "Marketing Campaign Expenses",
    amount: 175000,
  },
  {
    id: "15",
    date: "28/01/2024",
    description: "Insurance Premium Payment",
    amount: 85000,
  },
  {
    id: "16",
    date: "28/01/2024",
    description: "Building Maintenance Fee",
    amount: 32500,
  },
  // Unmatched transactions
  {
    id: "17",
    date: "29/01/2024",
    description: "Miscellaneous Expense",
    amount: 10000,
  },
  { id: "18", date: "29/01/2024", description: "Bank Charges", amount: 5000 },
];

export const companyLedgerData: CompanyLedger[] = [
  {
    id: "1",
    date: "27/01/2024",
    description: "Salary",
    amount: 681321,
    matched: true,
  },
  {
    id: "2",
    date: "27/01/2024",
    description: "Ajah Property",
    amount: 665129,
    matched: true,
  },
  {
    id: "3",
    date: "",
    description: "",
    amount: 0,
    matched: false,
  },
  {
    id: "4",
    date: "27/01/2024",
    description: "Investment",
    amount: 681709,
    matched: true,
  },
  {
    id: "5",
    date: "27/01/2024",
    description: "Dorathy Loan",
    amount: 312319,
    matched: true,
  },
  {
    id: "6",
    date: "27/01/2024",
    description: "Car Installment",
    amount: 838509,
    matched: true,
  },
  {
    id: "7",
    date: "28/01/2024",
    description: "Office Rent Payment",
    amount: 950000,
    matched: true,
  },
  {
    id: "8",
    date: "28/01/2024",
    description: "Utility Bills Payment",
    amount: 45000,
    matched: true,
  },
  {
    id: "9",
    date: "28/01/2024",
    description: "Staff Salaries",
    amount: 1250000,
    matched: true,
  },
  {
    id: "10",
    date: "28/01/2024",
    description: "Equipment Purchase",
    amount: 350000,
    matched: true,
  },
  {
    id: "11",
    date: "28/01/2024",
    description: "Marketing Campaign Expenses",
    amount: 175000,
    matched: true,
  },
  {
    id: "12",
    date: "28/01/2024",
    description: "Insurance Premium Payment",
    amount: 85000,
    matched: true,
  },
  {
    id: "13",
    date: "28/01/2024",
    description: "Building Maintenance Fee",
    amount: 32500,
    matched: true,
  },
  // Unmatched transactions
  {
    id: "14",
    date: "29/01/2024",
    description: "Consultancy Fees",
    amount: 50000,
    matched: false,
  },
  {
    id: "15",
    date: "29/01/2024",
    description: "Travel Expenses",
    amount: 30000,
    matched: false,
  },
  // Partial matches (same description, different amount)
  {
    id: "16",
    date: "27/01/2024",
    description: "Chichi School Fees",
    amount: 600000, // Slightly different amount
    matched: false,
  },
  {
    id: "17",
    date: "27/01/2024",
    description: "Piggy Savings Contribution",
    amount: 120000, // Slightly different amount
    matched: false,
  },
];
