export type BackendTransaction = {
  id: string
  Date: string
  Description: string
  Amount: string
}

export type StatementTransaction = {
  Amount: string
  Date: string
  Description: string
  accountName: string
  accountNumber: string
  bank: string
  id: string
}

export type LedgerTransaction = {
  Amount: string
  Date: string
  Description: string
  amount_paid: number
  id: string
  reconciled: boolean
  reference: boolean
  status: string
  type: string
}

export type StatementMatch = StatementTransaction

export type LedgerMatch = LedgerTransaction

export type Matched = {
  statement: StatementMatch
  ledger: LedgerMatch
  matched_by: string
  score: number
}

type Summary = {
  ai_matched: number
  duration: string
  manual_matched: number
  status: string
  total: number
  totalMatched: number
  totalUnmatched: number
  project_name: string
  created_at: string
  updated_at: string
}

export type UpdateResponseData = {
  reconciliation_id: string
  matches: Matched[]
  unmatched_ledgers: LedgerTransaction[]
  unmatched_statements: StatementTransaction[]
  summary: Summary
}

export type ReconciliationTableProps = {
  leftTableTitle?: string
  rightTableTitle?: string
}
