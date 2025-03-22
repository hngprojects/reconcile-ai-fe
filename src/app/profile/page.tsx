"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/components/context/AuthContext";
import { Input } from "@/src/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { User } from "@/src/types/auth";
import { Card, CardContent } from "@/src/components/ui/card";
import { Save, AlertTriangle } from "lucide-react";
import { toast } from "sonner"; // Replace useToast with sonner

interface ProfileManagementSectionProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function ProfileManagementSection({
  darkMode,
}: ProfileManagementSectionProps) {
  const { user } = useAuth();
  // Remove useToast hook
  const [formState, setFormState] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    surname: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    country: "",
    city: "",
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  // Update form state when user data is available
  useEffect(() => {
    if (user) {
      const names = user.name?.split(" ") || ["", ""];
      setFormState({
        firstName: names[0] || "",
        surname: names[1] || "",
        email: user.email || "",
        country: formState.country, // Preserve existing values
        city: formState.city, // Preserve existing values
      });
    }
  }, [user, formState.country, formState.city]);

  const getUserInitials = (name?: string) => {
    return name && name.length > 0 ? name[0].toUpperCase() : "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Only check changes for country and city
    if (name === "country" || name === "city") {
      const hasChanges = value.trim() !== "";
      setIsFormChanged(hasChanges);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Coming Soon!", {
      description: "This feature will be available soon. Stay tuned!",
      duration: 3000,
    });
  };

  const handleDeleteAccount = () => {
    toast.warning("Coming Soon!", {
      description:
        "Account deletion feature will be available soon. Stay tuned!",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1
        className={`text-xl sm:text-2xl font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"} mb-6`}
      >
        Profile Management
      </h1>

      <Tabs defaultValue="personal" className="w-full mb-8">
        <TabsList
          className={`flex flex-row flex-wrap w-full border-b ${darkMode ? "dark:border-gray-700" : "border-gray-200"} rounded-sm p-2 gap-2 h-auto mb-8`}
        >
          <TabsTrigger
            value="personal"
            className={`data-[state=active]:border-b-2 data-[state=active]:border-b-teal-600 cursor-pointer data-[state=active]:text-teal-600 data-[state=active]:shadow-none data-[state=active]:${darkMode ? "bg-gray-800" : "bg-gray-100"} hover:bg-white h-12 rounded-sm`}
          >
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className={`data-[state=active]:border-b-2 data-[state=active]:border-b-teal-600 cursor-pointer data-[state=active]:text-teal-600 data-[state=active]:shadow-none data-[state=active]:${darkMode ? "bg-gray-800" : "bg-gray-100"} hover:bg-white h-12 rounded-sm`}
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="pt-0 mt-0">
          <div className="flex justify-start mb-8">
            <div
              className={`flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-gray-100"} text-[#297B65] size-10 text-xl rounded-full`}
            >
              {(user as User)?.avatar ? (
                <Image
                  src={(user as User).avatar}
                  alt={(user as User).name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <p>{getUserInitials((user as User)?.name)}</p>
              )}
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleInputChange}
                  className={`h-12 min-h-[48px] ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white"} !text-base cursor-not-allowed opacity-70`}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="surname"
                  className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Surname
                </label>
                <Input
                  id="surname"
                  name="surname"
                  value={formState.surname}
                  onChange={handleInputChange}
                  className={`h-12 min-h-[48px] ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white"} !text-base cursor-not-allowed opacity-70`}
                  readOnly
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleInputChange}
                className={`h-12 min-h-[48px] ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white"} !text-base cursor-not-allowed opacity-70`}
                readOnly
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="country"
                  className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Country
                </label>
                <Input
                  id="country"
                  name="country"
                  value={formState.country}
                  onChange={handleInputChange}
                  className={`h-12 min-h-[48px] ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white"} !text-base`}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="city"
                  className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  City
                </label>
                <Input
                  id="city"
                  name="city"
                  value={formState.city}
                  onChange={handleInputChange}
                  className={`h-12 min-h-[48px] ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white"} !text-base`}
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                className={`h-[44px] px-6 py-3 bg-[#2E604A] text-white rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/90 ${!isFormChanged ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                aria-label="Save Changes"
                disabled={!isFormChanged}
              >
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="security">
          <div className="max-w mx-auto">
            {/* <Card className="mb-4 dark:bg-gray-800">
              <CardContent className="p-4 flex justify-between items-center dark:text-gray-100">
                <span className="text-lg font-medium">
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </span>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </CardContent>
            </Card> */}

            <Card className="dark:bg-gray-800">
              <CardContent className="p-4 dark:text-gray-100">
                <h3 className="text-lg font-semibold">Delete My Account</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Deleting your account is permanent and cannot be reversed.
                </p>

                <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start space-x-3 mb-4">
                  <AlertTriangle className="text-red-500 h-5 w-5 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800 text-sm">
                      Warning: This action cannot be undone
                    </h4>
                    <p className="text-red-700 text-xs mt-1">
                      All your data and history will be permanently removed.
                    </p>
                  </div>
                </div>

                <div className="max-w-sm mt-6 flex gap-2">
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="!w-full !bg-red-600 !text-white font-medium rounded-md max-w-[280px] h-[44px] hover:bg-red-700 transition-all duration-300 cursor-pointer"
                    aria-label="Delete Account"
                  >
                    Delete Account
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
