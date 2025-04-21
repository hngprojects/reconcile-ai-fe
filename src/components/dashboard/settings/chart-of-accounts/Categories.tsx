import { toggle_a_chart_account_category } from '@/actions/chartOfAccounts'
import { useChartOfAccountsCategories } from '@/app/queries'
import { Switch } from '@/components/ui/switch'
import { useChartOfAccountCategoriesStore } from '@/store/chart-of-accounts-store'

export function ChartOfAccountsCategories() {
  const { isLoading, data, error } = useChartOfAccountsCategories()
  const { categories, toggleCategory, isDisabled } =
    useChartOfAccountCategoriesStore()

  console.log({ isLoading, data, error })

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
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-row items-center justify-between gap-4"
          >
            <div>
              <p className="font-semibold">{category.name}</p>
              <p className="text-muted-foreground text-sm">
                {category.short_description}
              </p>
            </div>

            <Switch
              checked={category.is_active}
              disabled={isDisabled(category.name)}
              onCheckedChange={() => {
                toggleCategory(category.name)
                toggle_a_chart_account_category(category.id)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
