// "use client";
// import { useState } from "react";
// import { useAuth } from "@/src/components/context/AuthContext";
// import {
//   LayoutDashboard,
//   User,
//   CreditCard,
//   Settings,
//   Moon,
//   Sun,
// } from "lucide-react";
// import ProfileManagementSection from "@/src/components/Profile-management";
// import ManagePlanSection from "@/src/components/manage-plans";
// import { useRouter } from "next/navigation";
// import SettingsPage from "./settings/page";

// export default function DashboardPage() {
//   return <Dashboard />;
// }

// function Dashboard() {
//   const { user } = useAuth();
//   const [darkMode, setDarkMode] = useState(false);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const router = useRouter();

//   const containerClasses = `flex min-h-screen ${darkMode ? "dark bg-[#1c3a2e]" : "bg-white"} w-full`;

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <div className={containerClasses}>
//       <div className="w-full max-w-[1440px] mx-auto flex relative">
//         {/* Sidebar Navigation */}
//         <aside className="border-r w-16 lg:w-60 h-screen bg-white dark:bg-[#1c3a2e] transition-all fixed md:relative z-10">
//           <nav className="py-4 space-y-1">
//             <NavItem
//               icon={<LayoutDashboard size={20} />}
//               label="Dashboard"
//               active={activeTab === "dashboard"}
//               onClick={() => setActiveTab("dashboard")}
//               darkMode={darkMode}
//             />
//             <NavItem
//               icon={<User size={20} />}
//               label="Profile"
//               active={activeTab === "profile"}
//               onClick={() => setActiveTab("profile")}
//               darkMode={darkMode}
//             />
//             <NavItem
//               icon={<CreditCard size={20} />}
//               label="Subscription"
//               active={activeTab === "subscription"}
//               onClick={() => setActiveTab("subscription")}
//               darkMode={darkMode}
//             />
//           </nav>

//           {/* Bottom Controls */}
//           <div className="absolute bottom-0 w-full border-t dark:border-[#2E2E2E]">
//             <button
//               onClick={toggleDarkMode}
//               className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-[#EAEAEA] hover:bg-[#eaf5f1] dark:hover:bg-[#2E2E2E] cursor-pointer"
//             >
//               <span className="shrink-0">
//                 {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//               </span>
//               <span className="ml-3 hidden md:block">
//                 {darkMode ? "Light Mode" : "Dark Mode"}
//               </span>
//             </button>

//             <NavItem
//               icon={<Settings size={20} />}
//               label="Settings"
//               active={activeTab === "settings"}
//               onClick={() => setActiveTab("settings")}
//               darkMode={darkMode}
//             />
//           </div>
//         </aside>

//         {/* Main Content Area */}
//         <div className="flex-1 pl-16 lg:pl-0">
//           <main className="p-4 lg:p-8 w-full max-w-[1200px] mx-auto">
//             {activeTab === "profile" && (
//               <ProfileManagementSection
//                 darkMode={darkMode}
//                 setDarkMode={setDarkMode}
//               />
//             )}

//             {activeTab === "subscription" && (
//               <ManagePlanSection darkMode={darkMode} />
//             )}

//             {activeTab === "settings" && (
//               <SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} />
//             )}

//             {activeTab === "dashboard" && (
//               <div
//                 className={`p-6 rounded-lg border transition-colors ${
//                   darkMode
//                     ? "bg-[#222222] border-[#2E2E2E] text-[#EAEAEA]"
//                     : "bg-white border-gray-200 text-gray-800"
//                 }`}
//               >
//                 <h1 className="text-2xl font-semibold mb-4">
//                   Welcome back, {(user?.name || "User").split(" ")[0]}
//                 </h1>
//                 <p className="mb-6">
//                   This is your ReconXi dashboard where you can manage your
//                   account and reconciliations.
//                 </p>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <DashboardCard
//                     title="Reconciliation Magic"
//                     content="Quickly reconcile your records."
//                     actionText="Start Reconciliation"
//                     onAction={() => router.push("/file-upload")}
//                     darkMode={darkMode}
//                   />
//                   <DashboardCard
//                     title="Current Plan"
//                     content={`You are currently on the ${user?.payment_plan?.plan || "Basic"} plan.`}
//                     actionText="Upgrade Plan"
//                     onAction={() => setActiveTab("subscription")}
//                     darkMode={darkMode}
//                   />
//                 </div>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Navigation Item Component
// function NavItem({ icon, label, active, onClick, darkMode }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center w-full px-4 py-3 rounded-md transition-colors cursor-pointer
//         ${
//           active
//             ? darkMode
//               ? "bg-[#2E2E2E] text-white"
//               : "bg-[#eaf5f1] text-[#2E604A]"
//             : "text-gray-700 dark:text-gray-300 hover:bg-[#eaf5f1] dark:hover:bg-[#292929]"
//         }`}
//     >
//       <span className="shrink-0">{icon}</span>
//       <span className="ml-3 hidden md:block font-medium">{label}</span>
//     </button>
//   );
// }

// // Dashboard Card Component
// function DashboardCard({ title, content, actionText, onAction, darkMode }) {
//   return (
//     <div
//       className={`p-4 rounded-lg border transition-colors ${
//         darkMode
//           ? "bg-[#222222] border-[#2E2E2E]"
//           : "bg-gray-50 border-gray-200"
//       }`}
//     >
//       <h3
//         className={`font-medium mb-2 ${darkMode ? "text-[#EAEAEA]" : "text-gray-800"}`}
//       >
//         {title}
//       </h3>
//       <p
//         className={`text-sm mb-4 ${darkMode ? "text-[#B0B0B0]" : "text-gray-600"}`}
//       >
//         {content}
//       </p>

//       {actionText && onAction && (
//         <button
//           onClick={onAction}
//           className="px-4 py-2 text-sm bg-[#4CAF50] hover:bg-[#388E3C] text-white rounded"
//         >
//           <span className="cursor-pointer">{actionText}</span>{" "}
//           {/* Added cursor-pointer */}
//         </button>
//       )}
//     </div>
//   );
// }
