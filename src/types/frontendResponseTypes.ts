export type FrontendTransaction = {
  id: string
  date: string
  description: string
  amount: string | number
}

export type StatementWithScore = {
  bank_txn: FrontendTransaction
  score: string
}

export type LedgerWithScore = {
  ledger_txn: FrontendTransaction
  score: string
}

export type ReconciliationItem = {
  reconciliation_pair_id: string
  statements: StatementWithScore[] | null
  ledgers: LedgerWithScore[] | null
  matched: boolean
}

type Summary = {
  total_matched: number
  total_unmatched: number
  total: number
}

export type ReconciliationResponse = {
  reconciliation_id: string
  reconciliation_data: ReconciliationItem[]
  unmatched_bank_transactions: FrontendTransaction[]
  unmatched_ledger_transactions: FrontendTransaction[]
  summary: Summary
}
