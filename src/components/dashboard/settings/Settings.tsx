'use client'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  availableCurrencies,
  businessTypes,
  fiscalYear,
} from '@/data/dashboardConfig'
import { BarChart3Icon, Building2, User } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { ProfileImage } from './ProfileImage'
import { Button } from '@/components/ui/button'

export function Settings() {
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState<string>('profile')
  const profileTabRef = useRef<HTMLButtonElement>(null)
  const businessTabRef = useRef<HTMLButtonElement>(null)
  const accountTabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const getActiveTabRef = () => {
      switch (activeTab) {
        case 'profile':
          return profileTabRef
        case 'business':
          return businessTabRef
        case 'account':
          return accountTabRef
        default:
          return profileTabRef
      }
    }

    const activeTabRef = getActiveTabRef()
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [activeTab])

  console.log({ photoFile })

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={setActiveTab}
      className="max-w-full"
    >
      <TabsList className="hide-scrollbar grid min-h-fit w-full justify-normal overflow-x-scroll !rounded-[8px] border-4 border-[#F5F5F5] bg-[#F5F5F5] !p-0 dark:border-[#1A1A1A] dark:bg-[#1A1A1A]">
        <div className="flex min-w-md gap-1 p-0.5">
          <TabsTrigger
            ref={profileTabRef}
            value="profile"
            className={`min-h-[36px] gap-[10px] rounded-[4px] px-3 pt-[4px] pb-[4px] text-[14px] leading-[20px] font-semibold tracking-[0.1%] !text-[#262626] dark:!text-white ${
              activeTab === 'profile'
                ? 'bg-white shadow-md dark:!bg-[#000000]'
                : ''
            } `}
          >
            <div className="flex items-center leading-none font-semibold tracking-tight">
              <User className="mr-2 h-5 w-5" />
              Profile Information
            </div>
          </TabsTrigger>

          <TabsTrigger
            ref={businessTabRef}
            value="business"
            className={`min-h-[36px] gap-[10px] rounded-[4px] px-3 pt-[4px] pb-[4px] text-[14px] leading-[20px] font-semibold tracking-[0.1%] !text-[#262626] dark:!text-white ${
              activeTab === 'business'
                ? 'bg-white shadow-md dark:!bg-[#000000]'
                : ''
            } `}
          >
            <div className="flex items-center leading-none font-semibold tracking-tight">
              <Building2 className="mr-2 h-5 w-5" />
              Business Information
            </div>
          </TabsTrigger>

          <TabsTrigger
            ref={accountTabRef}
            value="account"
            className={`min-h-[36px] gap-[10px] rounded-[4px] px-3 pt-[4px] pb-[4px] text-[14px] leading-[20px] font-semibold tracking-[0.1%] !text-[#262626] dark:!text-white ${
              activeTab === 'account'
                ? 'bg-white shadow-md dark:!bg-[#000000]'
                : ''
            } `}
          >
            <div className="flex items-center leading-none font-semibold tracking-tight">
              <BarChart3Icon className="mr-2 h-5 w-5" />
              Account Settings
            </div>
          </TabsTrigger>
        </div>
      </TabsList>

      {activeTab === 'profile' && (
        <TabsContent value="profile" className="mt-1">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information
              </CardDescription>
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

          <div className="mt-6 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              className="text-primary hover:text-primary"
            >
              Reset
            </Button>

            <Button className="font-normal">Save Changes</Button>
          </div>
        </TabsContent>
      )}

      {activeTab === 'business' && (
        <TabsContent value="business" className="mt-1">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
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

          <div className="mt-6 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              className="text-primary hover:text-primary"
            >
              Reset
            </Button>

            <Button className="font-normal">Save Changes</Button>
          </div>
        </TabsContent>
      )}

      {activeTab === 'account' && (
        <TabsContent value="account" className="mt-1">
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

          <div className="mt-6 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              className="text-primary hover:text-primary"
            >
              Reset
            </Button>

            <Button className="font-normal">Save Changes</Button>
          </div>
        </TabsContent>
      )}
    </Tabs>
  )
}
