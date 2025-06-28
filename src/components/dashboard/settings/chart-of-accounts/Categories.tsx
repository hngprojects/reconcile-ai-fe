import { toggle_a_chart_account_category } from '@/actions/chartOfAccounts'
import { useChartOfAccountsCategories } from '@/app/queries'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { useChartOfAccountCategoriesStore } from '@/store/chart-of-accounts-store'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export function ChartOfAccountsCategories() {
  const router = useRouter()
  const {
    isLoading,
    data: categories,
    error,
    refetch,
  } = useChartOfAccountsCategories()
  const { toggleCategory, isDisabled } = useChartOfAccountCategoriesStore()
  const [checkedCategories, setCheckedCategories] = useState<
    Record<string, boolean>
  >({})

  useEffect(() => {
    const initialChecked: Record<string, boolean> = {}
    if (categories?.data) {
      categories.data.forEach((category) => {
        initialChecked[category.id] = isDisabled(category.title) ? true : false
      })
    }
    setCheckedCategories(initialChecked)
  }, [categories, isDisabled])

  console.log({ isLoading, categories, error })

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">
            Chart of Accounts Categories
          </h1>
          <p className="text-muted-foreground text-sm">
            Enable only the account categories your business needs. Revenue and
            Expenses are required.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push('/dashboard/settings')}
          className="group hover:bg-primary hover:text-primary-foreground flex items-center gap-2 transition-all duration-200 hover:shadow-md cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span className="transition-all duration-200 group-hover:font-medium">
            Back to Settings
          </span>
        </Button>
      </div>

      <div className="flex flex-col gap-6 rounded-md border px-5 py-6">
        {isLoading && (
          <div className="py-4 text-center">Loading categories...</div>
        )}

        {error && (
          <div className="py-4 text-center text-red-500">
            Error loading categories. Please try again.
          </div>
        )}

        {!isLoading &&
          !error &&
          categories?.data &&
          categories.data.length > 0 && (
            <>
              {[...categories.data]
                .sort((a, b) => {
                  if (a.is_required !== b.is_required) {
                    return a.is_required ? -1 : 1
                  }

                  if (a.is_active !== b.is_active) {
                    return a.is_active ? -1 : 1
                  }

                  return 0
                })
                .map((category) => (
                  <div
                    key={category.id}
                    className="flex flex-row items-center justify-between gap-4"
                  >
                    <div>
                      <p className="font-semibold">{category.title}</p>
                      <p className="text-muted-foreground text-sm">
                        {category.description}
                      </p>
                    </div>

                    <Switch
                      checked={!!checkedCategories[category.id]}
                      disabled={isDisabled(category.title)}
                      onCheckedChange={async () => {
                        setCheckedCategories((prev) => ({
                          ...prev,
                          [category.id]: !prev[category.id],
                        }))
                        await toggle_a_chart_account_category(category.id)
                        refetch()
                        toggleCategory(category.id)
                      }}
                    />
                  </div>
                ))}
            </>
          )}

        {!isLoading &&
          !error &&
          (!categories?.data || categories.data.length === 0) && (
            <div className="text-muted-foreground py-4 text-center">
              No categories available.
            </div>
          )}
      </div>
    </div>
  )
}
