'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="bg-card dark:bg-card/90">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-4 w-[120px] dark:bg-muted/20" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[80px] dark:bg-muted/20" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}