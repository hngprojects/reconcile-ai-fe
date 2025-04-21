'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building2, BarChart3Icon, User } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { ProfileTab } from './ProfileTab'
import { BusinessTab } from './BusinessTab'
import { AccountTab } from './AccountTab'

export function Settings() {
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

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={setActiveTab}
      className="max-w-full"
    >
      <TabsList className="hide-scrollbar grid min-h-fit w-full snap-x snap-mandatory justify-normal overflow-x-scroll !rounded-[8px] border-4 border-[#F5F5F5] bg-[#F5F5F5] !p-0 dark:border-[#1A1A1A] dark:bg-[#1A1A1A]">
        <div className="flex min-w-full gap-1 p-0.5">
          <TabsTrigger
            ref={profileTabRef}
            value="profile"
            className={`min-h-[36px] snap-center gap-[10px] rounded-[4px] px-3 pt-[4px] pb-[4px] text-[14px] leading-[20px] font-semibold tracking-[0.1%] !text-[#262626] dark:!text-white ${
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
            className={`min-h-[36px] snap-center gap-[10px] rounded-[4px] px-3 pt-[4px] pb-[4px] text-[14px] leading-[20px] font-semibold tracking-[0.1%] !text-[#262626] dark:!text-white ${
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
            className={`min-h-[36px] snap-center gap-[10px] rounded-[4px] px-3 pt-[4px] pb-[4px] text-[14px] leading-[20px] font-semibold tracking-[0.1%] !text-[#262626] dark:!text-white ${
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

      <TabsContent value="profile" className="mt-1">
        <ProfileTab />
      </TabsContent>

      <TabsContent value="business" className="mt-1">
        <BusinessTab />
      </TabsContent>

      <TabsContent value="account" className="mt-1">
        <AccountTab />
      </TabsContent>
    </Tabs>
  )
}
