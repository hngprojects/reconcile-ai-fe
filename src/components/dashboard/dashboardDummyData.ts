export interface ReconciliationHistoryTypes {
  id: number;
  date: string;
  reconciliationId: string;
  status: "pending" | "complete";
}

export const reconciliations: ReconciliationHistoryTypes[] = [
  {
    id: 1,
    date: "27/01/2024",
    reconciliationId: "RCL-20250310-001",
    status: "complete",
  },
  {
    id: 2,
    date: "27/01/2024",
    reconciliationId: "RCL-20250310-001",
    status: "pending",
  },
  {
    id: 3,
    date: "27/01/2024",
    reconciliationId: "RCL-20250310-001",
    status: "complete",
  },
  {
    id: 4,
    date: "27/01/2024",
    reconciliationId: "RCL-20250310-001",
    status: "pending",
  },
  {
    id: 5,
    date: "27/01/2024",
    reconciliationId: "RCL-20250310-001",
    status: "complete",
  },
  {
    id: 6,
    date: "27/01/2024",
    reconciliationId: "RCL-20250405-002",
    status: "complete",
  },
  {
    id: 7,
    date: "27/01/2024",
    reconciliationId: "RCL-20250405-002",
    status: "complete",
  },
  {
    id: 8,
    date: "27/01/2024",
    reconciliationId: "RCL-20250405-002",
    status: "complete",
  },
  {
    id: 9,
    date: "27/01/2024",
    reconciliationId: "RCL-20250405-002",
    status: "complete",
  },
  {
    id: 10,
    date: "27/01/2024",
    reconciliationId: "RCL-20250405-002",
    status: "complete",
  },
  // Additional data for pagination
  {
    id: 11,
    date: "28/01/2024",
    reconciliationId: "RCL-20250406-001",
    status: "pending",
  },
  {
    id: 12,
    date: "28/01/2024",
    reconciliationId: "RCL-20250406-001",
    status: "complete",
  },
  {
    id: 13,
    date: "28/01/2024",
    reconciliationId: "RCL-20250406-001",
    status: "pending",
  },
  {
    id: 14,
    date: "28/01/2024",
    reconciliationId: "RCL-20250406-001",
    status: "pending",
  },
  {
    id: 15,
    date: "28/01/2024",
    reconciliationId: "RCL-20250406-001",
    status: "pending",
  },
  {
    id: 16,
    date: "29/01/2024",
    reconciliationId: "RCL-20250407-001",
    status: "complete",
  },
  {
    id: 17,
    date: "29/01/2024",
    reconciliationId: "RCL-20250407-001",
    status: "complete",
  },
  {
    id: 18,
    date: "29/01/2024",
    reconciliationId: "RCL-20250407-001",
    status: "complete",
  },
  {
    id: 19,
    date: "29/01/2024",
    reconciliationId: "RCL-20250407-001",
    status: "complete",
  },
  {
    id: 20,
    date: "29/01/2024",
    reconciliationId: "RCL-20250407-001",
    status: "complete",
  },
];
