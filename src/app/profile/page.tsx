"use client";
import { useState, useEffect, useRef } from "react";
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
import { Card, CardContent } from "@/src/components/ui/card";
import { Save, AlertTriangle, Upload } from "lucide-react";
import { toast } from "sonner";
import { updateProfile } from "@/src/lib/api";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";

interface ProfileManagementSectionProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function ProfileManagementSection({
  darkMode,
}: ProfileManagementSectionProps) {
  const { user, setUser, deleteUserDetails } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);  // eslint-disable-line @typescript-eslint/no-unused-vars
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    country: user?.country || "",
    city: user?.city || "",
    file: null as File | null
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        country: user.country || "",
        city: user.city || "",
      }));
    }
  }, [user]);

  const getUserInitials = (name?: string) => {
    return name && name.length > 0 ? name[0].toUpperCase() : "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsFormChanged(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload a JPEG, PNG, or GIF.");
        return;
      }

      if (file.size > maxSize) {
        toast.error("File is too large. Maximum size is 5MB.");
        return;
      }

      setSelectedFile(file);
      setFormData((prev) => ({ ...prev, file }));
      setIsFormChanged(true);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const formDataToSend = new FormData();
  
      // Only append city and country if they are changed
      if (formData.country !== user?.country) {
        formDataToSend.append("country", formData.country);
      }
  
      if (formData.city !== user?.city) {
        formDataToSend.append("city", formData.city);
      }
  
      // Only append avatar if a new file is selected
      if (formData.file) {
        formDataToSend.append("avatar", formData.file);
      }
  
      // Make the API request with the selected fields
      const result = await updateProfile(formDataToSend);
  
      if (result.success) {
        // Update the user context with the updated data if it's available
        if (result.data?.user) {
          setUser(prevUser => ({
            ...prevUser!,
            country: result.data.user.country,
            city: result.data.user.city,
            avatar: result.data.user.avatar
          }));
        }
  
        toast.success("Profile details updated successfully!");
        setIsFormChanged(false);
      } else if (result.error) {
        toast.error("Error submitting: " + result.error);
      }
    } catch (error) {
      console.error("Exception when submitting profile:", error);
      toast.error("An error occurred while submitting profile details");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteAccount = async () => {
    try {
      await deleteUserDetails(); 
      toast.success("Your account has been deleted successfully.");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account.");
    }
  };
  return (
    <ProtectedRoute>
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
            <div className="flex flex-col items-left mb-8 space-y-4">
              <div
                className={`relative flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-gray-100"} text-[#297B65] size-24 text-xl rounded-full`}
              >
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name || "User"}
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <p>{getUserInitials(user?.name)}</p>
                )}
                <button
                  type="button"
                  onClick={handleClick}
                  className="absolute bottom-0 right-0 bg-teal-600 text-white rounded-full p-2 hover:bg-teal-700 transition-colors"
                  aria-label="Upload Profile Picture"
                >
                  <Upload size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-500">Click to update profile picture</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/jpeg,image/png,image/gif"
                style={{ display: 'none' }} 
              />

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
                    value={user?.name?.split(" ")[0] || ""}
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
                    value={user?.name?.split(" ")[1] || ""}
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
                  value={user?.email || ""}
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
                    value={formData.country}
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
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`h-12 min-h-[48px] ${darkMode ? "bg-gray-700 text-gray-100" : "bg-white"} !text-base`}
                  />
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={!isFormChanged || isSubmitting}
                  className={`h-[44px] px-6 py-3 bg-[#2E604A] text-white rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/90 ${!isFormChanged ? "opacity-50" : "cursor-pointer"}`}
                  aria-label="Save Changes"
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
    </ProtectedRoute>
  );
}
