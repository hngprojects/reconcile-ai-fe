'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export const DashboardInfoCards = () => {
  const { data } = useSession()
  const router = useRouter()

  const getUserPlan = (plan: string | undefined) => {
    switch (plan) {
      case 'Starter':
        return 'starter'
      case 'Business':
        return 'business'
      default:
        return 'basic'
    }
  }

  const userPlan = getUserPlan(data?.plan?.plan.plan)
  const getReconciliationProgress = () => {
    const used = data?.plan?.reconciliations_used || 0
    const limit = data?.plan?.plan?.reconciliations_per_month || 5
    if (limit === -1) return { used, limit: '∞', progress: 0 }
    const progress = Math.min((used / limit) * 100, 100)
    return { used, limit, progress }
  }

  const { used, limit, progress } = getReconciliationProgress()

  const formatDate = (date: string | null | undefined) => {
    if (!date) return 'Not available'
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const handleUpgrade = () => {
    router.push('/manage-plan')
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
      <Card className="shadow-sm">
        <CardContent className="flex h-40 flex-col items-start justify-between p-5 md:p-6">
          <h2 className="mb-2 text-xl font-medium">
            Current Plan -{' '}
            <span className="text-primary capitalize">{userPlan}</span>
          </h2>
          <Button
            className="bg-primary hover:bg-primary/90 cursor-pointer transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
            size="lg"
            disabled={userPlan === 'business'}
            onClick={handleUpgrade}
          >
            Upgrade plan
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="flex h-40 flex-col justify-between p-5 md:p-6">
          <h2 className="mb-2 font-medium">Reconciliations this month</h2>
          <div>
            <p className="mb-1 text-xl font-bold">
              {used} {typeof limit === 'string' ? '/ ∞' : `/ ${limit}`}
            </p>
            <Progress
              value={progress}
              className="h-2 bg-gray-200"
              color={progress > 80 ? 'destructive' : 'primary'}
            />
          </div>
          {typeof limit !== 'string' && (
            <p className="mt-1 text-sm text-gray-500">
              {limit - used} reconciliations remaining
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="flex h-auto flex-col justify-center gap-4 p-5 md:p-6">
          <h2 className="mb-2 font-medium">
            {userPlan === 'basic' ? 'Usage reset' : 'Next billing date'}
          </h2>
          <p className="text-xl font-bold">
            {formatDate(data?.plan?.expire_date)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
