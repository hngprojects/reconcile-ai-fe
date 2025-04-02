'use client'

import { Card, CardContent } from "@/components/ui/card"

export function QuickActions() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 dark:text-foreground">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:bg-accent dark:hover:bg-accent/80">
          <CardContent className="p-6">
            <h3 className="font-medium dark:text-foreground">Add Transaction</h3>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-accent dark:hover:bg-accent/80">
          <CardContent className="p-6">
            <h3 className="font-medium dark:text-foreground">Add Ledger</h3>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-accent dark:hover:bg-accent/80">
          <CardContent className="p-6">
            <h3 className="font-medium dark:text-foreground">Reconcile</h3>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}