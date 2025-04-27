import { useQuery } from '@tanstack/react-query'
import { fetchBookkeepingLedgers } from '@/lib/api'
import type { BookkeepingLedger } from '@/types/bookkeeping'

interface BookkeepingLedgerResponse {
  success: boolean
  data?: BookkeepingLedger[]
  error?: string
}

export const useBookkeepingLedgers = () => {
  return useQuery<BookkeepingLedgerResponse>({
    queryKey: ['bookkeeping-ledgers'],
    queryFn: async (): Promise<BookkeepingLedgerResponse> => {
      const result = await fetchBookkeepingLedgers()
      return {
        success: result.success,
        data: result.data,
        error: result.error,
      }
    },
  })
}
