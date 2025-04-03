'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  TrendingUp,
  TrendingDown,
  CreditCard,
  BarChart3,
  Receipt,
} from 'lucide-react'
import { useState, useEffect } from 'react'

export function StatsCards() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

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
    <div className="grid gap-4 md:grid-cols-3">
      {/* Key Financial Metrics */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Cash Position</CardTitle>
          <CardDescription>Current cash and bank balances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">₦2,350,000</p>
              <div className="mt-1 flex items-center text-xs text-green-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+5.3% from last month</span>
              </div>
            </div>
            <CreditCard className="text-muted-foreground h-8 w-8" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Monthly Revenue</CardTitle>
          <CardDescription>Current month sales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-green-600">₦1,245,000</p>
              <div className="mt-1 flex items-center text-xs text-green-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+12.5% from last month</span>
              </div>
            </div>
            <BarChart3 className="text-muted-foreground h-8 w-8" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Monthly Expenses</CardTitle>
          <CardDescription>Current month expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-red-600">₦780,500</p>
              <div className="mt-1 flex items-center text-xs text-red-500">
                <TrendingDown className="mr-1 h-3 w-3" />
                <span>+8.2% from last month</span>
              </div>
            </div>
            <Receipt className="text-muted-foreground h-8 w-8" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
