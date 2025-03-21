"use client"
import Image from "next/image"
import { Button } from "@/src/components/ui/button"
import { useAuth } from "@/src/components/context/AuthContext";
import { Input } from "@/src/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import SidebarNav from "@/src/components/sidebar-nav"
import { User } from "@/src/types/auth";


export default function ProfileManagement() {
    const { user } = useAuth();
    const getUserInitials = (name?: string) => {
        return name && name.length > 0 ? name[0].toUpperCase() : "";
    };


    return (
        <div className="flex  h-screen flex-col md:flex-row bg-gray-50">
            {/* Sidebar */}
            <SidebarNav />

            {/* Main Content */}
            <div className="flex-1 ">

                {/* Content */}
                <main className="p-4 md:p-8 max-w-6xl mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Profile Management</h1>

                    {/* Tabs */}
                    <Tabs defaultValue="personal" className="w-full mb-8">
                        <TabsList className="flex flex-row flex-wrap w-full border-b rounded-sm p-2  gap-2 h-auto mb-8">
                            <TabsTrigger
                                value="personal"
                                className="data-[state=active]:border-b-2 data-[state=active]:border-b-teal-600 data-[state=active]:text-teal-600 data-[state=active]:shadow-none data-[state=active]:bg-gray-100 h-12 data-[state=active]:rounded-none rounded-sm "
                            >
                                Personal Information
                            </TabsTrigger>
                            <TabsTrigger
                                value="emails"
                                className="data-[state=active]:border-b-2 data-[state=active]:border-b-teal-600 data-[state=active]:text-teal-600 data-[state=active]:shadow-none data-[state=active]:bg-gray-100 h-12 data-[state=active]:rounded-none rounded-sm "
                            >
                                Emails & Passwords
                            </TabsTrigger>
                            <TabsTrigger
                                value="notifications"
                                className="data-[state=active]:border-b-2 data-[state=active]:border-b-teal-600 data-[state=active]:text-teal-600 data-[state=active]:shadow-none data-[state=active]:bg-gray-100 h-12 data-[state=active]:rounded-none rounded-sm "
                            >
                                Notifications
                            </TabsTrigger>

                        </TabsList>

                        <TabsContent value="personal" className="pt-0 mt-0">
                            {/* Profile Photo */}
                            <div className="flex justify-start mb-8">
                                <div className="flex items-center justify-center bg-gray-100 text-[#297B65] size-10 text-xl rounded-full">
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

                            {/* Form */}
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                            First Name
                                        </label>
                                        <div className="relative">
                                            <Input id="firstName" name="firstName" defaultValue="Mark" className="h-12 min-h-[48px] bg-white !text-base" />

                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                                            Surname
                                        </label>
                                        <Input id="surname" name="surname" defaultValue="Essien"
                                            className="h-12 min-h-[48px] bg-white !text-base"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <Input id="email" name="email" type="email" 
                                        className="h-12 min-h-[48px] bg-white !text-base"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                            Country
                                        </label>
                                        <Input id="country" name="country" defaultValue="Nigeria"
                                            className="h-12 min-h-[48px] bg-white !text-base"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            City
                                        </label>
                                        <Input id="city" name="city" defaultValue="Lagos" className="h-12 min-h-[48px] bg-white !text-base" />
                                    </div>
                                </div>

                                <div className="flex justify-center pt-4">
                                    <Button className="h-[44px] px-6 py-3 bg-[#2E604A] text-white rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/90 cursor-pointer"
                                        aria-label="Open signup modal">
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </TabsContent>

                        <TabsContent value="emails">
                            <div className="text-center py-12 text-gray-500">Emails & Passwords settings will be shown here</div>
                        </TabsContent>

                        <TabsContent value="notifications">
                            <div className="text-center py-12 text-gray-500">Notifications settings will be shown here</div>
                        </TabsContent>

                        <TabsContent value="preference">
                            <div className="text-center py-12 text-gray-500">Preference settings will be shown here</div>
                        </TabsContent>

                        <TabsContent value="integrations">
                            <div className="text-center py-12 text-gray-500">Integrations settings will be shown here</div>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}

