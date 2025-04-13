'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  availableCurrencies,
  businessTypes,
  fiscalYear,
} from '@/data/dashboardConfig'
import { Building2, CreditCard, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ProfileImage } from './ProfileImage'

export function Settings() {
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  console.log({ photoFile })

  return (
    <div>
      <div className="mb-6 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your profile, business and accounting preferences.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-start gap-6">
              <ProfileImage onUpload={(file) => setPhotoFile(file)} />

              <div className="w-full flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="font-normal">
                      First Name
                    </Label>
                    <Input
                      id="first-name"
                      placeholder="Enter First Name"
                      className="h-11 placeholder:text-sm md:h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="font-normal">
                      Last Name
                    </Label>
                    <Input
                      id="last-name"
                      placeholder="Enter Last Name"
                      className="h-11 placeholder:text-sm md:h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-normal">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter Email Address"
                    className="h-11 placeholder:text-sm md:h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-normal">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Enter Phone Number"
                    className="h-11 placeholder:text-sm md:h-12"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-5 w-5" />
              Business Information
            </CardTitle>
            <CardDescription>Manage your business details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business-name" className="font-normal">
                  Business Name
                </Label>
                <Input
                  id="business-name"
                  placeholder="Enter Business Name"
                  className="h-11 placeholder:text-sm md:h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-type" className="font-normal">
                  Business Type
                </Label>
                <Select>
                  <SelectTrigger className="!h-11 w-full md:!h-12">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((business, index) => (
                      <SelectItem key={index} value={business.value}>
                        {business.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Accounting Settings</CardTitle>
            <CardDescription>
              Configure your accounting preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fiscal-year" className="font-normal">
                  Fiscal Year
                </Label>
                <Select>
                  <SelectTrigger className="!h-11 w-full md:!h-12">
                    <SelectValue placeholder="Select fiscal year" />
                  </SelectTrigger>
                  <SelectContent>
                    {fiscalYear.map((range, index) => (
                      <SelectItem key={index} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency" className="font-normal">
                  Default Currency
                </Label>
                <Select>
                  <SelectTrigger className="!h-11 w-full md:!h-12">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCurrencies.map((currency, index) => (
                      <SelectItem key={index} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-2 p-6 pt-0">
          <Button variant="outline" className="text-primary hover:text-primary">
            Reset
          </Button>

          <Button className="font-normal">Save Changes</Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="flex flex-col justify-between shadow-none">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure additional accounting settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-4 rounded-md border p-4">
                <div className="xl:w-1/2">
                  <h3 className="font-medium">Charts of Accounts</h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Manage your charts of accounts and account categories
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="#">Manage</Link>
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
                <div className="flex items-center justify-between gap-4 rounded-md border p-4">
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
    </div>
  )
}
