export type BackendTransaction = {
  id: string;
  Date: string;
  Description: string;
  Amount: string;
};

export type StatementMatch = {
  statement: BackendTransaction;
  score: string;
};

export type LedgerMatch = {
  ledger: BackendTransaction;
  score: string;
};

export type Matched = {
  statements: StatementMatch[];
  ledgers: LedgerMatch[];
};

type Summary = {
  totalMatched: number;
  totalUnmatched: number;
  total: number;
};

export type UpdateResponseData = {
  reconciliation_id: string;
  matches: Matched[];
  unmatched_ledgers: BackendTransaction[];
  unmatched_statements: BackendTransaction[];
  summary: Summary;
};

export type ReconciliationTableProps = {
  leftTableTitle?: string;
  rightTableTitle?: string;
};
