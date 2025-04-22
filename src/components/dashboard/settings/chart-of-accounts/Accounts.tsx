import { chartOfAccountsCategories } from '@/data/chartOfAccountsCategories'
import { AccountTable } from './AccountTable'
import { AddAccountModal } from './AddAccountModal'

export function Accounts() {
  const categories = chartOfAccountsCategories

  return (
    <div className="space-y-5">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Chart of Accounts</h1>
          <p className="text-muted-foreground text-sm">
            Manage accounts for financial reporting
          </p>
        </div>

        <AddAccountModal />
      </div>

      <div className="space-y-5">
        {categories.map((category) => {
          const activeCategories = category.is_active

          return (
            activeCategories && (
              <AccountTable key={category.id} category={category} />
            )
          )
        })}
      </div>
    </div>
  )
}
