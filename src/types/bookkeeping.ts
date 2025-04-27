export interface BookkeepingLedger {
  id: string
  user_id: string
  name: string
  description: string
  categories: string[]
  is_active: boolean
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface BookkeepingLedgerResponse {
  status_code: number
  message: string
  data: BookkeepingLedger[]
}
