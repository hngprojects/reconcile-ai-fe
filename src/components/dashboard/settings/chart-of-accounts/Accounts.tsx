import { useChartOfAccountCategoriesStore } from '@/store/chart-of-accounts-store'
import { AccountTable } from './AccountTable'
import { AddTransactionModal } from './AddTransactionModal'

export function Accounts() {
  const { categories } = useChartOfAccountCategoriesStore()

  return (
    <div className="space-y-5">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Chart of Accounts</h1>
          <p className="text-muted-foreground text-sm">
            Manage accounts for financial reporting
          </p>
        </div>

        <AddTransactionModal />
      </div>

      <div className="space-y-5">
        {categories.map((account) => {
          const activeCategories = account.isActive

          return (
            activeCategories && (
              <AccountTable key={account.category} account={account} />
            )
          )
        })}
      </div>
    </div>
  )
}
