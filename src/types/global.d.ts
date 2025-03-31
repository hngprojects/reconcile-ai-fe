export type APIResponse<T> = {
  success: boolean
  status?: 'success' | 'error'
  message: string
  data: T
  access_token?: string
  meta?: {
    total: number
    page: number
    limit: number
    total_pages: number
    has_next: boolean
    has_previous: boolean
  }
}

export interface RecordItem {
  id: string
  title: string
  status: 'Completed' | 'Pending' | 'In Progress' | string
  date: string
}

export type RecordList = RecordItem[]

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>
export type Params = Promise<{ [key: string]: string }>
