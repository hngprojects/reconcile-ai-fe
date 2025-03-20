export type Transaction = {
  Date: string;
  Description: string;
  Amount: string | number;
};

export interface ReconciliationItem {
  bankStatement: Transaction;
  companyLedger?: Transaction;
  matched: boolean;
  match_score: number;
}

export type Matched = {
  file1_transaction: Transaction;
  file2_transaction: Transaction;
  match_score: number;
  status?: string;
};

export type Unmatched = {
  unmatched_file1: Transaction[];
  unmatched_file2: Transaction[];
};

export type MatchSummary = {
  totalMatched: number;
  totalUnmatched: number;
};

export type ResponseData = {
  reconciliation_id: string;
  matches: Matched[];
  unmatched: Unmatched;
  only_in_file1: Transaction[];
  only_in_file2: Transaction[];
};

export type TData = {
  [key: string]: string | number;
};
export type ReconciliationTableProps = {
  leftTableTitle?: string;
  rightTableTitle?: string;
};
