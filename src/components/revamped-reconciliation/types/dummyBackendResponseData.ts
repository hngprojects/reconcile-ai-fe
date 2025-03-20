import { UpdateResponseData } from "./backendResponseTypes";

export const dummyBackendResponseData: UpdateResponseData = {
  reconciliation_id: "rec-2025-03-20-001",
  matches: [
    {
      statements: [
        {
          statement: {
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
            Date: "2025-03-05",
            Description: "Amazon Purchase",
            Amount: "129.99",
          },
          score: "100",
        },
        {
          statement: {
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
            Date: "2025-03-05",
            Description: "Amazon - Office Equipment",
            Amount: "129.99",
          },
          score: "92",
        },
        {
          ledger: {
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
      Description: "Unknown Vendor Payment",
      Amount: "125.00",
    },
    {
      Date: "2025-03-18",
      Description: "Parking Fee",
      Amount: "45.00",
    },
  ],
  unmatched_ledgers: [
    {
      Date: "2025-03-12",
      Description: "Software License",
      Amount: "299.99",
    },
    {
      Date: "2025-03-17",
      Description: "Contractor Payment",
      Amount: "1200.00",
    },
    {
      Date: "2025-03-19",
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
