"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
// import { toast } from "sonner"

export default function DemoForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phoneNumber: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    try {
    //   await new Promise((resolve) => setTimeout(resolve, 1000))
    //   toast(message: "Success", data: "")
    //   setFormData({
    //     fullName: "",
    //     businessName: "",
    //     email: "",
    //     phoneNumber: "",
    //   })
    } catch  {
    //   toast({
    //     title: "Error",
    //     description: "There was a problem submitting your request. Please try again.",
    //     variant: "destructive",
    //   })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-[650px] bg-white border border-gray-200 rounded-md p-6"
      aria-labelledby="form-heading"
    >
      <h2 id="form-heading" className="sr-only">
        Request a Demo Form
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
            aria-required="true"
            className="w-full h-16 placeholder-[#B8B8B8] placeholder:text[20px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            name="businessName"
            type="text"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter business name"
            required
            aria-required="true"
            className="w-full h-16 placeholder-[#B8B8B8] placeholder:text[20px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
            aria-required="true"
            className="w-full h-16 placeholder-[#B8B8B8] placeholder:text[20px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
            aria-required="true"
            className="w-full h-16 placeholder-[#B8B8B8] placeholder:text[20px]"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#2E604A] hover:bg-[#2E604A]/90 text-white py-6 cursor-pointer"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Get Your Free Demo Now"}
        </Button>
      </div>
    </form>
  )
}

