'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { StatsCards } from './stats/stats-cards'
import { QuickActions } from './actions/quick-actions'
import { UpcomingTasks } from './tasks/upcoming-tasks'

export function Dashboard() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2 dark:text-foreground">
            Welcome, {user?.name} 👋
          </h1>
          <p className="text-muted-foreground dark:text-muted-foreground/90">
            Here's how your business is doing.
          </p>
        </div>
        <Button>
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
