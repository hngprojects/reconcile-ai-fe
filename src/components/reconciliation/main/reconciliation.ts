export interface ReconciliationItem {
  bankStatement: Transaction;
  companyLedger?: Transaction;
  matched: boolean;
}

export type matched = {
  file1_transaction: Transaction;
  file2_transaction: Transaction;
  match_score: number;
};

export type unmatched = {
  unmatched_file1: Transaction[];
  unmatched_file2: Transaction[];
};

export type MatchSummary = {
  totalMatched: number;
  totalUnmatched: number;
};

export type ResponseData = {
  matches: matched[];
  only_in_file1: Transaction[];
  only_in_file2: Transaction[];
  unmatched: unmatched;
  matchSummary: MatchSummary;
};

export type Transaction = {
  Date: string;
  Description: string;
  Amount: string;
};

export type TData = {
  [key: string]: string | number;
};
export type ReconciliationTableProps = {
  leftTableTitle?: string;
  rightTableTitle?: string;
};
