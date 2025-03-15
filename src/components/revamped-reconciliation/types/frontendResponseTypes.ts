export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
};

export type ReconciliationItem = {
  reconciliation_pair_id: string;
  bank_txn: Transaction | null;
  ledger_txn: Transaction | null;
  matched: boolean;
  match_score: number;
};

export type ReconciliationResponse = {
  reconciliation_id: string;
  reconciliation_data: ReconciliationItem[];
  unmatched_bank_transactions: Transaction[];
  unmatched_ledger_transactions: Transaction[];
  summary: {
    total_bank_transactions: number;
    total_ledger_transactions: number;
    total_matched: number;
    total_unmatched: number;
    auto_matched: number;
    manual_review_needed: number;
  };
};
