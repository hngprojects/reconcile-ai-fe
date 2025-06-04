import { get_all_chart_account_categories } from '@/actions/chartOfAccounts'
import {
  get_reconcilations,
  get_reconcilations_by_id,
} from '@/actions/reconcilation-server'
import { useQuery } from '@tanstack/react-query'

export const useReconcilations = () => {
  return useQuery({
    queryKey: ['reconciliations'],
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

export const useChartOfAccountsCategories = () => {
  return useQuery({
    queryKey: ['chart_account_categories'],
    queryFn: async () => {
      const response = await get_all_chart_account_categories()
      return response
    },
  })
}
