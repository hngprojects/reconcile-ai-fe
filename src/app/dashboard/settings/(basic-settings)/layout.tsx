import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CreditCard } from 'lucide-react'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your profile, business and accounting preferences.
          </p>
        </div>
      </div>

      {children}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="flex flex-col justify-between shadow-none">
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>
              Configure additional accounting settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-between gap-4 rounded-md border p-4 min-[375px]:flex-row min-[375px]:items-center">
              <div className="xl:w-1/2">
                <h3 className="font-medium">Charts of Accounts</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Manage your charts of accounts and account categories
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/settings/chart-of-accounts">Manage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Plans & Billing
            </CardTitle>
            <CardDescription>
              Manage your subscription and payment details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col justify-between gap-4 rounded-md border p-4 min-[375px]:flex-row min-[375px]:items-center">
                <div>
                  <h3 className="font-medium">Current Plan: Starter</h3>
                  <p className="mt-1 text-sm">Renews on April 30, 2025</p>
                  <span className="text-muted-foreground text-sm">
                    ₦15,000/month
                  </span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="#">Manage</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
