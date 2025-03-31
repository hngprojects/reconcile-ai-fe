'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

export default function SecuritySettings() {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false)

  return (
    <div className="max-w mx-auto">
      {/* Two-Factor Authentication */}
      <Card className="mb-4 dark:bg-gray-800">
        <CardContent className="flex items-center justify-between p-4 dark:text-gray-100">
          <span className="text-lg font-medium">
            Two - Factor Authentication
          </span>
          <Switch
            checked={isTwoFactorEnabled}
            onCheckedChange={setIsTwoFactorEnabled}
          />
        </CardContent>
      </Card>

      <Card className="mb-4 dark:bg-gray-800">
        <CardContent className="flex items-center justify-between p-4 dark:text-gray-100">
          <span className="text-lg font-medium">Enable Dark mode</span>
          <Switch
            checked={isTwoFactorEnabled}
            onCheckedChange={setIsTwoFactorEnabled}
          />
        </CardContent>
      </Card>
      {/* Delete Account Section */}
      <Card className="dark:bg-gray-800">
        <CardContent className="p-4 dark:text-gray-100">
          <h3 className="text-lg font-semibold">Delete My Account</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Deleting your account is permanent and cannot be reversed.
          </p>
          <div className="mt-6 flex max-w-sm gap-2">
            <button
              type="button"
              className="font-inter h-[44px] !w-full max-w-[280px] cursor-pointer rounded-[8px] rounded-md !bg-[#2E604A] bg-white text-[14px] leading-[20px] font-medium font-semibold !text-white transition-all duration-300 hover:scale-105 dark:bg-gray-700 dark:text-gray-100"
              aria-label="Deactivate Account"
            >
              Deactivate Account
            </button>
            <button
              type="button"
              className="border-grey-200 font-inter h-[44px] w-full max-w-[280px] cursor-pointer rounded-[8px] border bg-white text-[14px] leading-[20px] font-semibold transition-all duration-300 hover:scale-105 dark:bg-gray-700 dark:text-gray-100"
              aria-label="Delete Account"
            >
              Delete Account
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
