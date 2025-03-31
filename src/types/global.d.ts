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

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>
