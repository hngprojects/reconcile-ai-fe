import {
  get_reconcilations,
  get_reconcilations_by_id,
} from '@/actions/reconcilation-server'
import { useQuery } from '@tanstack/react-query'

export const useReconcilations = () => {
  return useQuery({
    queryKey: ['reconcilations'],
    queryFn: async () => {
      const response = await get_reconcilations()
      return response.data?.reverse()
    },
  })
}

export const useReconcilationsById = (id: string) => {
  return useQuery({
    queryKey: ['reconcilations_by_id'],
    queryFn: async () => {
      const response = await get_reconcilations_by_id(id)
      return response.data
    },
  })
}
