export interface ProjectData {
  id: string
  title: string
  status: 'completed' | 'in-progress' | 'draft' | 'pending' | 'failed'
  progress: number
  steps: number
  totalSteps: number
  unreconciled: number
  reconciled?: number
  lastUpdated?: Date
}

export interface GeneralSummary {
  total: number,
  completed: number,
  pending: number,
  totalTransactions: number
}