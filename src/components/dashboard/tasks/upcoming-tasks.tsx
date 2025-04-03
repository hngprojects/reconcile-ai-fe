'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ClipboardList } from 'lucide-react' // Import the icon

export function UpcomingTasks() {
  return (
    <section>
      <h2 className="dark:text-foreground mb-4 text-xl font-semibold">
        Upcoming Tasks
      </h2>
      <Card className="dark:bg-card/90">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <ClipboardList className="text-muted-foreground/50 mb-4 h-12 w-12" />
          <p className="text-muted-foreground dark:text-muted-foreground/90 font-medium">
            No upcoming tasks
          </p>
          <p className="text-muted-foreground/60 mt-1 text-sm">
            Tasks and reminders will appear here
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
