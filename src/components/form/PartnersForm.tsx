'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { handlePartnerSubmission } from '@/lib/api'
import type { PartnerResponse } from '@/lib/api'
import { fetchCountryCodes } from '@/lib/constants'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'

const fullNameRegex = /^[A-Za-z\s]+$/
const phoneRegex = /^[0-9]{10,15}$/

interface Country {
  code: string
  name: string
  flag: string
}

export default function PartnerForm() {
  const [countries, setCountries] = useState<Country[]>([])
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    countryCode: '+234',
    phoneNumber: '',
    serviceInterested: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadCountries = async () => {
      const countryData = await fetchCountryCodes()
      setCountries(countryData as Country[])
    }
    loadCountries()
  }, [])

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('Full name is required')
      return false
    }
    if (!fullNameRegex.test(formData.fullName)) {
      toast.error('Full name should only contain alphabets and spaces')
      return false
    }
    if (!formData.businessName.trim()) {
      toast.error('Business name is required')
      return false
    }
    if (!formData.email.trim()) {
      toast.error('Email is required')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email address')
      return false
    }
    if (!formData.phoneNumber.trim()) {
      toast.error('Phone number is required')
      return false
    }
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error('Enter a valid phone number with 10 to 15 digits')
      return false
    }
    if (!formData.serviceInterested) {
      toast.error("Please select a service you're interested in")
      return false
    }
    return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCountryCodeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, countryCode: value }))
  }

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceInterested: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const submissionData = {
        full_name: formData.fullName,
        business_name: formData.businessName,
        email: formData.email,
        phone_number: `${formData.countryCode}${formData.phoneNumber}`,
        service_interested: formData.serviceInterested,
      }

      const response: PartnerResponse =
        await handlePartnerSubmission(submissionData)

      if (response.success) {
        toast.success(
          response.message || 'Partnership request submitted successfully!'
        )
        setFormData({
          fullName: '',
          businessName: '',
          email: '',
          countryCode: '+234',
          phoneNumber: '',
          serviceInterested: '',
        })
      } else {
        if (response.errors) {
          Object.entries(response.errors).forEach((entry) => {
            const errors = entry[1]
            toast.error(errors[0])
          })
        } else {
          throw new Error(
            response.message || 'Failed to submit partnership request'
          )
        }
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to submit partnership request. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-md border border-gray-200 bg-white p-6 md:w-[650px]"
      aria-labelledby="form-heading"
    >
      <h2 id="form-heading" className="sr-only">
        Partner with us Form
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm text-black">
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
            aria-required="true"
            className="h-12 bg-white !text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessName" className="text-sm text-black">
            Business Name
          </Label>
          <Input
            id="businessName"
            name="businessName"
            type="text"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter business name"
            required
            aria-required="true"
            className="h-12 bg-white !text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-black">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
            aria-required="true"
            className="h-12 bg-white !text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="service-interest" className="text-sm text-black">
            What are you interested in?
          </Label>
          <Select
            value={formData.serviceInterested}
            onValueChange={handleServiceChange}
          >
            <SelectTrigger
              id="service-interest"
              className="h-16 w-full cursor-pointer bg-white p-4 !text-base"
              aria-label="Select service interest"
            >
              <SelectValue placeholder="Select Interest" />
            </SelectTrigger>
            <SelectContent>
              <div role="listbox" id="service-options">
                <SelectItem value="Reseller Partner">
                  Reseller Partners
                </SelectItem>
                <SelectItem value="Referral Partner">
                  Referral Partners
                </SelectItem>
              </div>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone-input" className="text-sm text-black">
            Phone Number
          </Label>
          <div className="flex gap-2">
            <Select
              value={formData.countryCode}
              onValueChange={handleCountryCodeChange}
            >
              <SelectTrigger
                id="country-code"
                className="border-input h-12 min-h-[48px] w-[120px] cursor-pointer border bg-white"
                aria-label="Select country code"
              >
                <SelectValue placeholder="+234" />
              </SelectTrigger>
              <SelectContent>
                <div role="listbox" id="country-codes">
                  {countries.map((country: Country) => (
                    <SelectItem
                      key={`${country.code}-${country.name}`}
                      value={country.code}
                      className="flex h-12 cursor-pointer items-center gap-2 px-3 py-2"
                    >
                      <Image
                        src={country.flag}
                        alt={country.name}
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                      <span>{country.code}</span>
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
            <Input
              id="phone-input"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              aria-required="true"
              className="h-12 min-h-[48px] flex-1 bg-white !text-base"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full cursor-pointer bg-[#2E604A] py-6 text-[18px] font-semibold text-white"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}
