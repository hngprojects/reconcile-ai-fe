import { UpdateResponseData } from "./backendResponseTypes";

export const dummyBackendResponseData: UpdateResponseData = {
  reconciliation_id: "rec-2025-03-20-001",
  matches: [
    {
      statements: [
        {
          statement: {
            id: "stmt-001",
            Date: "2025-03-01",
            Description: "Office Supplies Inc",
            Amount: "245.60",
          },
          score: "95",
        },
      ],
      ledgers: [
        {
          ledger: {
            id: "ledg-001",
            Date: "2025-03-01",
            Description: "Office Supplies",
            Amount: "245.60",
          },
          score: "95",
        },
      ],
    },
    {
      statements: [
        {
          statement: {
            id: "stmt-002",
            Date: "2025-03-05",
            Description: "Amazon Purchase",
            Amount: "129.99",
          },
          score: "100",
        },
        {
          statement: {
            id: "stmt-003",
            Date: "2025-03-05",
            Description: "Amazon Prime",
            Amount: "14.99",
          },
          score: "100",
        },
      ],
      ledgers: [
        {
          ledger: {
            id: "ledg-002",
            Date: "2025-03-05",
            Description: "Amazon - Office Equipment",
            Amount: "144.98",
          },
          score: "92",
        },
      ],
    },
    {
      statements: [
        {
          statement: {
            id: "stmt-004",
            Date: "2025-03-05",
            Description: "Amazon Purchase",
            Amount: "144.98",
          },
          score: "100",
        },
      ],
      ledgers: [
        {
          ledger: {
            id: "ledg-003",
            Date: "2025-03-05",
            Description: "Amazon - Office Equipment",
            Amount: "129.99",
          },
          score: "92",
        },
        {
          ledger: {
            id: "ledg-004",
            Date: "2025-03-05",
            Description: "Amazon Prime",
            Amount: "14.99",
          },
          score: "100",
        },
      ],
    },
    {
      statements: [
        {
          statement: {
            id: "stmt-005",
            Date: "2025-03-10",
            Description: "Electricity Bill",
            Amount: "341.75",
          },
          score: "98",
        },
      ],
      ledgers: [
        {
          ledger: {
            id: "ledg-005",
            Date: "2025-03-10",
            Description: "Utility Payment - Electric",
            Amount: "341.75",
          },
          score: "98",
        },
      ],
    },
  ],
  unmatched_statements: [
    {
      Date: "2025-03-15",
      id: "stmt-006",
      Description: "Unknown Vendor Payment",
      Amount: "125.00",
    },
    {
      Date: "2025-03-18",
      id: "stmt-007",
      Description: "Parking Fee",
      Amount: "45.00",
    },
  ],
  unmatched_ledgers: [
    {
      Date: "2025-03-12",
      id: "ledg-006",
      Description: "Software License",
      Amount: "299.99",
    },
    {
      Date: "2025-03-17",
      id: "ledg-007",
      Description: "Contractor Payment",
      Amount: "1200.00",
    },
    {
      Date: "2025-03-19",
      id: "ledg-008",
      Description: "Office Cleaning Service",
      Amount: "150.00",
    },
  ],
  summary: {
    totalMatched: 3,
    totalUnmatched: 5,
    total: 8,
  },
};
