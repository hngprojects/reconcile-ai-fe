'use client'

import { Card, CardContent } from "@/components/ui/card"

export function UpcomingTasks() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 dark:text-foreground">Upcoming Tasks</h2>
      <Card className="dark:bg-card/90">
        <CardContent className="p-6">
          <p className="text-muted-foreground dark:text-muted-foreground/90">
            No upcoming tasks
          </p>
        </CardContent>
      </Card>
    </section>
  )
}