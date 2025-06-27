'use client'

import { useEffect, useState } from 'react'
import { AccountTable } from './AccountTable'
import { AddAccountModal } from './AddAccountModal'
import { fetchChartAccounts } from '@/lib/api'
import { AccountCategory, Account } from '@/types/chartOfAccounts'
import SiteLoader from '@/components/site-loader'

export function Accounts() {
  const [categories, setCategories] = useState<AccountCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function groupAccountsByCategory(accounts: Account[]): AccountCategory[] {
    const categoriesMap = new Map<string, AccountCategory>()

    for (const account of accounts) {
      const cat = account.category
      if (!cat) continue

      if (!categoriesMap.has(cat.id)) {
        categoriesMap.set(cat.id, {
          id: cat.id,
          title: cat.title,
          short_description: '',
          full_description: cat.description,
          is_active: cat.is_active,
          data: [],
        })
      }

      categoriesMap.get(cat.id)?.data.push({
        ...account,
        amount:
          typeof account.balance === 'number'
            ? account.balance
            : Number(account.balance) || 0,
        balance:
          typeof account.balance === 'number'
            ? account.balance
            : Number(account.balance) || 0,
      })
    }

    return Array.from(categoriesMap.values())
  }

  const fetchAndSetAccounts = async () => {
    setLoading(true)
    const result = await fetchChartAccounts()
    if (result.success) {
      setCategories(groupAccountsByCategory(result.data))
      setError(null)
    } else {
      setError(result.error ?? null)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAndSetAccounts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <SiteLoader />
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Chart of Accounts</h1>
          <p className="text-muted-foreground text-sm">
            Manage accounts for financial reporting
          </p>
        </div>

        <AddAccountModal onAccountAdded={fetchAndSetAccounts} />
      </div>

      <div className="space-y-5">
        {categories.map((category) => (
          <AccountTable key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
