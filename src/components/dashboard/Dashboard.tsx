'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { StatsCards } from './stats/stats-cards'
import { QuickActions } from './actions/quick-actions'
import { UpcomingTasks } from './tasks/upcoming-tasks'
import { useRouter } from 'next/navigation'

export function Dashboard() {
  const { data: session } = useSession()
  const user = session?.user
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="dark:text-foreground flex items-center gap-2 text-xl font-semibold sm:text-2xl">
            Welcome, {user?.name} 👋
          </h1>
          <p className="text-muted-foreground dark:text-muted-foreground/90 text-sm sm:text-base">
            Here&apos;s how your business is doing.
          </p>
        </div>
        <Button
          onClick={() => router.push('/reconciliation')}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 size-4" />
          Start Reconciliation
        </Button>
      </div>

      <StatsCards />
      <QuickActions />
      <UpcomingTasks />
    </div>
  )
}
