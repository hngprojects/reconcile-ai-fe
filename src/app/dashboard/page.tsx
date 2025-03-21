"use client";
import { useState } from "react";
import { useAuth } from "@/src/components/context/AuthContext";
import {
  LayoutDashboard,
  User,
  CreditCard,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import ProfileManagementSection from "@/src/components/Profile-management";
import ManagePlanSection from "@/src/components/manage-plans";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // Default to profile view
  const router = useRouter();
  const containerClasses = `flex h-screen flex-col md:flex-row ${darkMode ? "dark bg-gray-900" : "bg-white"}`;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={containerClasses}>
      {/* Sidebar Navigation */}
      <aside className="border-r w-16 md:w-60 shrink-0 overflow-y-auto h-screen bg-white dark:bg-gray-800 transition-all">

        {/* Navigation Links */}
        <nav className="py-4 space-y-1">
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
        <div className="absolute bottom-0 w-full border-t dark:border-gray-700">
          <button
            onClick={toggleDarkMode}
            className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="shrink-0">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </span>
            <span className="ml-3 hidden md:block">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>

          <button className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="shrink-0">
              <LogOut size={20} />
            </span>
            <span className="ml-3 hidden md:block">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-4 md:p-8 max-w-6xl mx-auto">
          {activeTab === "profile" && (
            <ProfileManagementSection
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          )}

          {activeTab === "subscription" && <ManagePlanSection />}

          {activeTab === "dashboard" && (
            <div
              className={`p-6 rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`}
            >
              <h1 className="text-2xl font-semibold mb-4">
                Welcome back, {(user?.name || "User").split(" ")[0]}
              </h1>
              <p className="mb-6">
                This is your ReconcileAI dashboard where you can manage your
                account and reconciliations.
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
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 rounded-md transition-colors
        ${
          active
            ? `${darkMode ? "bg-gray-700 text-white" : "bg-teal-50 text-teal-700"}`
            : `text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`
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
      className={`p-4 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}
    >
      <h3
        className={`font-medium mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}
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
          onClick={onAction}
          className="px-4 py-2 text-sm bg-[#2E604A] hover:bg-[#2E604A]/90 text-white rounded"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
