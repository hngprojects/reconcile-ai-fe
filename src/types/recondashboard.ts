export interface ProjectData {
  id: string
  title: string
  status: 'completed' | 'in-progress'
  progress: number
  steps: number
  totalSteps: number
  unreconciled: number
  reconciled?: number
  lastUpdated?: string
}
