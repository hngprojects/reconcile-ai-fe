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

export type matched = {
  file1_transaction: Transaction;
  file2_transaction: Transaction;
  status: string;
};

export type unmatched = {
  unmatched_file1: Transaction[];
  unmatched_file2: Transaction[];
};

export type ResponseData = {
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
