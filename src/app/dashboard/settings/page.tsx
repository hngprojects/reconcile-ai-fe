"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { Switch } from "@/src/components/ui/switch";
import { AlertTriangle } from "lucide-react";

interface SettingsPageProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function SettingsPage({
  darkMode,
  setDarkMode,
}: SettingsPageProps) {
  return (
    <div className="p-6 space-y-6">
      <h1
        className={`text-2xl font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"}`}
      >
        Settings
      </h1>

      <div className="max-w-3xl space-y-6">
        <Card className="dark:bg-[#2E604A]/20 border-[#2E604A]/30">
          <CardContent className="p-4 flex justify-between items-center">
            <span
              className={`text-lg font-medium ${darkMode ? "text-gray-100" : "text-gray-800"}`}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </CardContent>
        </Card>

        <Card className="dark:bg-[#2E604A]/20 border-[#2E604A]/30">
          <CardContent className="p-4">
            <h3
              className={`text-lg font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"}`}
            >
              Delete My Account
            </h3>
            <p
              className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"} mb-4`}
            >
              Deleting your account is permanent and cannot be reversed.
            </p>

            <div className="p-3 bg-red-50/10 border border-red-200/20 rounded-md flex items-start space-x-3 mb-4">
              <AlertTriangle className="text-red-500 h-5 w-5 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-400 text-sm">
                  Warning: This action cannot be undone
                </h4>
                <p className="text-red-300 text-xs mt-1">
                  All your data and history will be permanently removed.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-all duration-300 cursor-pointer"
            >
              Delete Account
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
