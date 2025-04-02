'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form className="mx-auto w-full max-w-[620px] rounded-md border bg-white p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="block text-sm font-semibold text-[#333333]"
          >
            Full Name
          </label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
            className="h-12 w-full rounded border border-gray-300 p-3 text-sm placeholder-[#B8B8B8] lg:text-[20px]"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-[#333333]"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@address.com"
            required
            className="h-12 w-full rounded border border-gray-300 p-3 text-sm placeholder-[#B8B8B8] lg:text-[20px]"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-semibold text-[#333333]"
          >
            Phone Number
          </label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
            className="h-12 w-full rounded border border-gray-300 p-3 text-sm placeholder-[#B8B8B8] lg:text-[20px]"
          />
        </div>

        <Button
          type="submit"
          className="w-full rounded-[12px] px-4 py-6 font-semibold text-white"
        >
          Start your free trial Now
        </Button>
      </div>
    </form>
  )
}
