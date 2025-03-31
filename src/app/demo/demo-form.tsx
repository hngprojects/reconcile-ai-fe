'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { handleMarketingDemo } from '@/lib/api'
import { toast } from 'sonner'
import { fetchCountryCodes } from '@/lib/constants'
import Image from 'next/image'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Country {
  code: string
  name: string
  flag: string
}

interface DemoFormProps {
  buttonText?: string
}

const demoFormSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .regex(
      /^[A-Za-z\s]+$/,
      'Full name should only contain alphabets and spaces'
    ),
  businessName: z.string().min(1, 'Business name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  country_code: z.string().min(1, 'Country code is required'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^[0-9]{10,15}$/,
      'Enter a valid phone number with 10 to 15 digits.'
    ),
})

export default function DemoForm({
  buttonText = 'Get Your Free Demo Now',
}: DemoFormProps) {
  const [countries, setCountries] = useState<Country[]>([])

  useEffect(() => {
    const loadCountries = async () => {
      const countryData = await fetchCountryCodes()
      setCountries(countryData as Country[])
    }
    loadCountries()
  }, [])

  const form = useForm<z.infer<typeof demoFormSchema>>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      fullName: '',
      businessName: '',
      email: '',
      country_code: '+234',
      phoneNumber: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof demoFormSchema>) => {
    try {
      const formattedData = {
        full_name: data.fullName,
        business_name: data.businessName,
        email: data.email,
        phone_number: `${data.country_code}${data.phoneNumber}`,
      }

      const result = await handleMarketingDemo(formattedData)

      if (result.success) {
        toast.success(
          "Demo request submitted successfully! We'll be in touch soon."
        )
        form.reset()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to submit demo request. Please try again.'
      )
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full rounded-md border border-gray-200 bg-white p-6 md:max-w-[650px]"
        aria-labelledby="form-heading"
      >
        <h2 id="form-heading" className="sr-only">
          Request a Demo Form
        </h2>

        <div className="space-y-6">
          {/* Full Name Field */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field, fieldState }) => (
              <FormItem>
                <Label htmlFor="fullName" className="text-sm text-[#717171]">
                  Full Name
                </Label>
                <FormControl>
                  <Input
                    id="fullName"
                    placeholder="Enter full name"
                    {...field}
                    className="h-12 bg-white !text-base"
                    aria-invalid={!!fieldState?.error}
                    aria-describedby={
                      fieldState?.error ? `fullName-error` : undefined
                    }
                  />
                </FormControl>
                {fieldState?.error && (
                  <FormMessage className="text-left" id="fullName-error" />
                )}
              </FormItem>
            )}
          />

          {/* Business Name Field */}
          <FormField
            control={form.control}
            name="businessName"
            render={({ field, fieldState }) => (
              <FormItem>
                <Label
                  htmlFor="businessName"
                  className="text-sm text-[#717171]"
                >
                  Business Name
                </Label>
                <FormControl>
                  <Input
                    id="businessName"
                    placeholder="Enter business name"
                    {...field}
                    className="h-12 bg-white !text-base"
                    aria-invalid={!!fieldState?.error}
                    aria-describedby={
                      fieldState?.error ? `businessName-error` : undefined
                    }
                  />
                </FormControl>
                {fieldState?.error && (
                  <FormMessage className="text-left" id="businessName-error" />
                )}
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <Label htmlFor="email" className="text-sm text-[#717171]">
                  Email
                </Label>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    {...field}
                    className="h-12 bg-white !text-base"
                    aria-invalid={!!fieldState?.error}
                    aria-describedby={
                      fieldState?.error ? `email-error` : undefined
                    }
                  />
                </FormControl>
                {fieldState?.error && (
                  <FormMessage className="text-left" id="email-error" />
                )}
              </FormItem>
            )}
          />

          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <FormItem>
                <Label htmlFor="phoneNumber" className="text-sm text-[#717171]">
                  Phone Number
                </Label>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="country_code"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className="border-input h-12 min-h-[48px] w-[120px] cursor-pointer border bg-white"
                          id="country-code-select"
                          aria-label="Select country code"
                        >
                          <SelectValue placeholder="+234" />
                        </SelectTrigger>
                        <SelectContent>
                          <div role="listbox" id="country-code-list">
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
                    )}
                  />
                  <FormControl>
                    <Input
                      id="phoneNumber"
                      placeholder="Enter phone number"
                      {...field}
                      className="h-12 min-h-[48px] flex-1 bg-white !text-base"
                      aria-invalid={!!fieldState?.error}
                      aria-describedby={
                        fieldState?.error ? `phoneNumber-error` : undefined
                      }
                    />
                  </FormControl>
                </div>
                {fieldState?.error && (
                  <FormMessage className="text-left" id="phoneNumber-error" />
                )}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#2E604A] py-6 text-[18px] font-semibold text-white"
            disabled={form.formState.isSubmitting}
            aria-busy={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Processing...' : buttonText}
          </Button>
        </div>
      </form>
    </Form>
  )
}
