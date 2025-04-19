import { Button } from '@/components/ui/button'
import { chartOfAccountsCategories } from '@/data/chartOfAccountsCategories'
import { Plus } from 'lucide-react'
import { AccountTable } from './AccountTable'

export function Accounts() {
  return (
    <div className="space-y-5">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Chart of Accounts</h1>
          <p className="text-muted-foreground text-sm">
            Manage accounts for financial reporting
          </p>
        </div>

        <Button>
          <Plus /> Add Account
        </Button>
      </div>

      <div className="space-y-5">
        {chartOfAccountsCategories.map((account) => {
          const activeCategories = account.isActive

          return activeCategories && <AccountTable account={account} />
        })}
      </div>
    </div>
  )
}
