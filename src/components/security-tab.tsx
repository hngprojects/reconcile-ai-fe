"use client";

import { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Switch } from "@/src/components/ui/switch";

export default function SecuritySettings() {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  return (
    <div className="max-w mx-auto">
      {/* Two-Factor Authentication */}
      <Card className="mb-4 dark:bg-gray-800">
        <CardContent className="p-4 flex justify-between items-center dark:text-gray-100">
          <span className="text-lg font-medium">Two - Factor Authentication</span>
          <Switch
            checked={isTwoFactorEnabled}
            onCheckedChange={setIsTwoFactorEnabled}
          />
        </CardContent>
      </Card>
      
      <Card className="mb-4 dark:bg-gray-800">
        <CardContent className="p-4 flex justify-between items-center dark:text-gray-100">
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
          <div className="max-w-sm mt-6 flex gap-2">
            <button
              type="button"
              className="!w-full !bg-[#2E604A] !text-white font-medium rounded-md   max-w-[280px] h-[44px] bg-white dark:bg-gray-700 dark:text-gray-100 rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:scale-105 transition-all duration-300 cursor-pointer"
              aria-label="Deactivate Account"
            >
              Deactivate Account
            </button>
            <button
              type="button"
              className="w-full border border-grey-200 max-w-[280px] h-[44px] bg-white dark:bg-gray-700 dark:text-gray-100 rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:scale-105 transition-all duration-300 cursor-pointer"
              aria-label="Delete Account"
            >
              Delete Account
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
