'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User } from '@/types/auth'
import { Save } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface ProfileManagementProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

export default function ProfileManagementSection({
  darkMode,
}: ProfileManagementProps) {
  const { data } = useSession()
  const user = data?.user
  const [formState, setFormState] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    surname: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    country: '',
    city: '',
  })

  const getUserInitials = (name?: string) => {
    return name && name.length > 0 ? name[0].toUpperCase() : ''
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save changes logic would go here
    console.log('Saving profile changes:', formState)
    // Show success message or handle errors
  }

  return (
    <div className="rounded-lg border border-[#2E604A]/30 p-6 dark:bg-[#2E604A]/20">
      <h1
        className={`text-2xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'} mb-6`}
      >
        Profile Management
      </h1>

      {/* Profile Avatar */}
      <div className="mb-8 flex justify-start">
        <div
          className={`flex items-center justify-center ${darkMode ? 'bg-[#2E604A]/30' : 'bg-gray-100'} size-10 rounded-full text-xl text-[#297B65]`}
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

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              First Name
            </label>
            <Input
              id="firstName"
              name="firstName"
              value={formState.firstName}
              onChange={handleInputChange}
              className={`h-12 min-h-[48px] ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'} border !text-base ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 focus:ring-[#2E604A]`}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="surname"
              className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Surname
            </label>
            <Input
              id="surname"
              name="surname"
              value={formState.surname}
              onChange={handleInputChange}
              className={`h-12 min-h-[48px] ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'} border !text-base ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 focus:ring-[#2E604A]`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleInputChange}
            className={`h-12 min-h-[48px] ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'} border !text-base ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 focus:ring-[#2E604A]`}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="country"
              className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Country
            </label>
            <Input
              id="country"
              name="country"
              value={formState.country}
              onChange={handleInputChange}
              className={`h-12 min-h-[48px] ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'} border !text-base ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 focus:ring-[#2E604A]`}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="city"
              className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              City
            </label>
            <Input
              id="city"
              name="city"
              value={formState.city}
              onChange={handleInputChange}
              className={`h-12 min-h-[48px] ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'} border !text-base ${darkMode ? 'border-gray-600' : 'border-gray-300'} focus:ring-2 focus:ring-[#2E604A]`}
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            className="font-inter h-[44px] cursor-pointer rounded-[8px] bg-[#2E604A] px-6 py-3 text-[14px] leading-[20px] font-semibold text-white hover:bg-[#2E604A]/90"
            aria-label="Save Changes"
          >
            <Save size={16} className="mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
