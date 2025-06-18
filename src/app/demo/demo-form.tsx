'use client'

import { PhoneNumberInput } from '@/components/PhoneNumberInput'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { handleMarketingDemo } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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
  businessName: z
    .string()
    .min(1, 'Business name is required')
    .regex(
      /^(?=(?:[^A-Za-z]*[A-Za-z]){6})[A-Za-z\s']+$/,
      'Business name must contain at least 6 letters'
    ),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^\+?\d{10,15}$/,
      'Enter a valid phone number with 10 to 15 digits.'
    ),
})

export default function DemoForm({
  buttonText = 'Get Your Free Demo Now',
}: DemoFormProps) {
  const form = useForm<z.infer<typeof demoFormSchema>>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      fullName: '',
      businessName: '',
      email: '',
      phoneNumber: '+44',
    },
  })

  const onSubmit = async (data: z.infer<typeof demoFormSchema>) => {
    try {
      const formattedData = {
        full_name: data.fullName,
        business_name: data.businessName,
        email: data.email,
        phone_number: data.phoneNumber,
      }

      console.log({ formattedData })

      const result = await handleMarketingDemo(formattedData)

      if (result.success) {
        toast.success(
          "Demo request submitted successfully! We'll be in touch soon."
        )

        form.clearErrors()

        form.reset({
          fullName: '',
          businessName: '',
          email: '',
          phoneNumber: '+44',
        })
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
                <FormControl>
                  <PhoneNumberInput
                    key={`${form.formState.submitCount}-${field.value}`}
                    field={field}
                    error={fieldState?.error}
                    name={field.name}
                  />
                </FormControl>
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
