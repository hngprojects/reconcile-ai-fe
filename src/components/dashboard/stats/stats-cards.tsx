'use client'

import { get_dashboard_analytics } from '@/actions/user'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import {
  TrendingUp,
  TrendingDown,
  CreditCard,
  BarChart3,
  Receipt,
} from 'lucide-react'

export function StatsCards() {
  const { data, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: get_dashboard_analytics,
  });

  const NairaFormat = new Intl.NumberFormat('en-us')


  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={`skeleton-${i}`} className="bg-card dark:bg-card/90">
            <CardHeader>
              <CardTitle>
                <Skeleton className="dark:bg-muted/20 h-4 w-[120px]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="dark:bg-muted/20 h-8 w-[80px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 [@media(min-width:1150px)]:grid-cols-3">
      {/* Key Financial Metrics */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base [@media(min-width:1150px)]:text-lg">
            Cash Position
          </CardTitle>
          <CardDescription>Current cash and bank balances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold [@media(min-width:1150px)]:text-3xl">
                ₦{NairaFormat.format(data?.data?.bank_balance?.total as number)}
              </p>
              <div className="mt-1 flex items-center text-[11px] text-green-500 [@media(min-width:1150px)]:text-xs">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>{data?.data?.bank_balance.increased ? '+' : data?.data?.bank_balance.decreased ? '-' : ''}{data?.data?.bank_balance.difference_percent}% from last month</span>
              </div>
            </div>
            <CreditCard className="text-muted-foreground h-6 w-6 [@media(min-width:1150px)]:h-8 [@media(min-width:1150px)]:w-8" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base [@media(min-width:1150px)]:text-lg">
            Monthly Revenue
          </CardTitle>
          <CardDescription>Current month sales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-green-600 [@media(min-width:1150px)]:text-3xl">
                ₦{NairaFormat.format(data?.data?.income.this_month as number)}
              </p>
              <div className="mt-1 flex items-center text-[11px] text-green-500 [@media(min-width:1150px)]:text-xs">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>{data?.data?.income.increased ? '+' : data?.data?.income.decreased ? '-' : ''}{data?.data?.income.difference_percent}% from last month</span>
              </div>
            </div>
            <BarChart3 className="text-muted-foreground h-6 w-6 [@media(min-width:1150px)]:h-8 [@media(min-width:1150px)]:w-8" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base [@media(min-width:1150px)]:text-lg">
            Monthly Expenses
          </CardTitle>
          <CardDescription>Current month expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-red-600 [@media(min-width:1150px)]:text-3xl">
                ₦{NairaFormat.format(data?.data?.expense.this_month as number)}
              </p>
              <div className="mt-1 flex items-center text-[11px] text-red-500 [@media(min-width:1150px)]:text-xs">
                <TrendingDown className="mr-1 h-3 w-3" />
                <span>{data?.data?.expense.increased ? '+' : data?.data?.expense.decreased ? '-' : ''}{data?.data?.expense.difference_percent}% from last month</span>
              </div>
            </div>
            <Receipt className="text-muted-foreground h-6 w-6 [@media(min-width:1150px)]:h-8 [@media(min-width:1150px)]:w-8" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
