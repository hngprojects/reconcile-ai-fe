"use client";
import { useState } from "react";
import { useAuth } from "@/src/components/context/AuthContext";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";
import {
  LayoutDashboard,
  User,
  CreditCard,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import ProfileManagementSection from "@/src/components/Profile-management";
import ManagePlanSection from "@/src/components/manage-plans";
import { useRouter } from "next/navigation";
import SettingsPage from "./settings/page";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();
  const containerClasses = `flex ${darkMode ? "dark bg-[#1c3a2e]" : "bg-white"}`;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`${containerClasses} max-w-[1440px] mx-auto min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-82px)]`}
    >
      {/* Sidebar Navigation */}
      <aside className="pb-3 border-r w-16 md:w-60 min-h-[calc(100vh-72px)] bg-white dark:bg-[#1c3a2e] transition-all fixed md:relative z-10 flex flex-col justify-between md:pb-4 md:min-h-[calc(100vh-82px)] md:pr-4">
        {/* Navigation Links */}
        <nav className="py-4 space-y-1 max-md:px-2">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            darkMode={darkMode}
          />
          <NavItem
            icon={<User size={20} />}
            label="Profile"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
            darkMode={darkMode}
          />
          <NavItem
            icon={<CreditCard size={20} />}
            label="Subscription"
            active={activeTab === "subscription"}
            onClick={() => setActiveTab("subscription")}
            darkMode={darkMode}
          />
        </nav>

        {/* Bottom Controls */}
        <div className="flex flex-col justify-center items-center w-full border-t dark:border-[#2E604A]">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-[#eaf5f1] dark:hover:bg-[#2E604A]/20 md:justify-start"
          >
            <span className="shrink-0">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </span>
            <span className="ml-3 hidden md:block">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>

          <NavItem
            icon={<Settings size={20} />}
            label="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
            darkMode={darkMode}
          />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pl-16 md:pl-0">
        <main className="p-4 md:p-8 max-w-6xl mx-auto">
          {activeTab === "profile" && (
            <ProfileManagementSection
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          )}

          {activeTab === "subscription" && (
            <ManagePlanSection darkMode={darkMode} />
          )}

          {activeTab === "settings" && (
            <SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} />
          )}

          {activeTab === "dashboard" && (
            <div
              className={`p-6 rounded-lg border ${
                darkMode
                  ? "bg-[#2E604A]/10 border-[#2E604A]/30 text-white"
                  : "bg-white border-gray-200"
              }`}
            >
              <h1 className="text-2xl font-semibold mb-4">
                Welcome back, {(user?.name || "User").split(" ")[0]}
              </h1>
              <p className="mb-6">
                This is your ReconXi dashboard where you can manage your account
                and reconciliations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DashboardCard
                  title="Reconciliation Magic"
                  content="Quickly reconcile your records."
                  actionText="Start Reconciliation"
                  onAction={() => router.push("/file-upload")}
                  darkMode={darkMode}
                />
                <DashboardCard
                  title="Current Plan"
                  content={`You are currently on the ${user?.payment_plan?.plan || "Basic"} plan.`}
                  actionText="Upgrade Plan"
                  onAction={() => setActiveTab("subscription")}
                  darkMode={darkMode}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Navigation Item Component
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  darkMode: boolean;
}

function NavItem({ icon, label, active, onClick, darkMode }: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center w-full px-4 py-3 rounded-md transition-colors cursor-pointer md:justify-start
        ${
          active
            ? `${darkMode ? "bg-[#2E604A] text-white" : "bg-[#eaf5f1] text-[#2E604A]"}`
            : `text-gray-700 dark:text-gray-300 hover:bg-[#eaf5f1] dark:hover:bg-[#2E604A]/20`
        }`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="ml-3 hidden md:block font-medium">{label}</span>
    </button>
  );
}

// Dashboard Card Component
interface DashboardCardProps {
  title: string;
  content: string;
  actionText?: string;
  onAction?: () => void;
  darkMode: boolean;
}

function DashboardCard({
  title,
  content,
  actionText,
  onAction,
  darkMode,
}: DashboardCardProps) {
  return (
    <div
      className={`p-4 rounded-lg border ${darkMode ? "bg-[#2E604A]/20 border-[#2E604A]/30" : "bg-gray-50 border-gray-200"}`}
    >
      <h3
        className={`font-medium mb-2 ${darkMode ? "text-gray-100" : "text-gray-800"}`}
      >
        {title}
      </h3>
      <p
        className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
      >
        {content}
      </p>

      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="px-4 py-2 text-sm bg-[#2E604A] hover:bg-[#2E604A]/90 text-white rounded"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
