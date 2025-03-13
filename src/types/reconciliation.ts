export interface ReconciliationItem {
  bankStatement: {
    date?: string;
    description?: string;
    amount?: number;
  };
  companyLedger?: {
    date?: string;
    description?: string;
    amount?: number;
  };
  matched: boolean;
}

export const REQUIRED_HEADERS = {
  bankStatement: ["Date", "Description", "Amount"],
  companyLedger: ["Date", "Description", "Amount"],
} as const;

export type matched = {
  file1_transaction: Transaction;
  file2_transaction: Transaction;
  status: string;
};

export type matchedItem = {
  bankStatement: Transaction;
  companyLedger: Transaction;
  matched: boolean;
};

export type unmatched = {
  unmatched_file1: Transaction[];
  unmatched_file2: Transaction[];
};

export type ResponseData = {
  reconciliation_id: string;
  matches: matched[];
  unmatched: unmatched;
  only_in_file1: Transaction[];
  only_in_file2: Transaction[];
};

export type Transaction = {
  Description: string;
  Date: string;
  Amount: number;
};

export type TData = {
  [key: string]: string | number;
};
export type ReconciliationTableProps = {
  leftTableTitle?: string;
  rightTableTitle?: string;
};

export type ManualRequestBody = {
  statement: {
    date?: string;
    description?: string;
    amount?: number;
  };
  ledger?: {
    date?: string;
    description?: string;
    amount?: number;
  };
  action: string;
};
