export interface ReconciliationItem {
  bankStatement?: {
    date?: string
    description?: string
    amount?: number
  }
  companyLedger?: {
    date?: string
    description?: string
    amount?: number
  }
  matched: boolean
}

export type TStatement = Transaction & {
  bank: string,
  accountNumber: number,
  accountName: string
}

export type TLedger = Transaction & {
  type: string,
  status: string,
  reconciled: boolean,
  amount_paid: number,
  reference: string
}

export const REQUIRED_HEADERS = {
  bankStatement: ['Date', 'Description', 'Amount'],
  companyLedger: ['Date', 'Description', 'Amount'],
} as const

export type matched = {
  file1_transaction: Transaction
  file2_transaction: Transaction
  status: string
}

export type matchedItem = {
  statement: TStatement
  ledger: TLedger
  score: number
  matched_by: string
}

export type unmatched = {
  unmatched_file1: Transaction[]
  unmatched_file2: Transaction[]
}

export type ResponseData = {
  reconciliation_id: string
  matches: matched[]
  unmatched: unmatched
  only_in_file1: Transaction[]
  only_in_file2: Transaction[]
}

export type Transaction = {
  id: string
  Date: string
  Description: string
  Amount: number
  [key: string]: string | number
}

export type TData = {
  [key: string]: string | number
}
export type ReconciliationTableProps = {
  leftTableTitle?: string
  rightTableTitle?: string
}

export type ManualRequestBody = {
  ledgers?: {
    Date?: string
    Person?: string
    Amount?: number
  }[]
  statements: {
    Date?: string
    Person?: string
    Amount?: number
  }[]
  action: string
}

export interface ReconciliationHistoryType {
  id: string
  title: string
  status: string
  date: string
}

export interface ReconciliationResultType {
  matches?: matchedItem[],
  unmatched_ledgers?: Transaction[],
  unmatched_statements?: Transaction[]
}

export type Summary = {
  totalMatched: number
  totalUnmatched: number
  total: number,
  ai_matched: number,
  manual_matched: number,
  duration: string,
  status: string,
  updated_at: Date
}

export type ReconResponseData = {
  reconciliation_id: string
  matches?: matchedItem[]
  unmatched_ledgers?: Transaction[]
  unmatched_statements?: Transaction[]
  summary: Summary
}

type TMatch = {
  ledger: string,
  statement: string,
  matched_by: string,
  score: number,
  action: string
}

export interface MatchRequestBody {
  matches: TMatch[]
}