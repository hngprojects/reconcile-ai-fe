import { Switch } from '@/components/ui/switch'
import { chartOfAccountsCategories } from '@/data/chartOfAccountsCategories'

export function ChartOfAccountsCategories() {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Chart of Accounts Categories</h1>
        <p className="text-muted-foreground text-sm">
          Enable only the account categories your business needs. Revenue and
          Expenses are required.
        </p>
      </div>

      <div className="flex flex-col gap-6 rounded-md border px-5 py-6">
        {chartOfAccountsCategories.map((item) => (
          <div
            key={item.category}
            className="flex flex-row items-center justify-between gap-4"
          >
            <div>
              <p className="font-semibold">{item.category}</p>
              <p className="text-muted-foreground text-sm">
                {item.short_description}
              </p>
            </div>

            <Switch checked={item.isActive} disabled={item.isActive} />
          </div>
        ))}
      </div>
    </div>
  )
}
