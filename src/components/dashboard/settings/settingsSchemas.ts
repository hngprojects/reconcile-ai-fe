import * as z from 'zod'

export const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phoneNumber: z
    .string()
    .regex(
      /^\+[1-9][0-9]{10,15}$/,
      'Please enter a valid international phone number with country code and 10 to 15 digits (e.g., +1234567890)'
    )
    .optional(),
  country: z.string().optional(),
  city: z.string().optional(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

export const businessFormSchema = z.object({
  businessName: z.string().min(1, {
    message: 'Business name is required',
  }),
  businessType: z
    .string({
      required_error: 'Please select a business type.',
    })
    .min(1, {
      message: 'Please select a business Type',
    }),
})

export type BusinessFormValues = z.infer<typeof businessFormSchema>

export const accountFormSchema = z.object({
  fiscalYear: z
    .string({
      required_error: 'Please select a fiscal year.',
    })
    .min(1, {
      message: 'Please select a fiscal year.',
    }),
  currency: z
    .string({
      required_error: 'Please select a currency.',
    })
    .min(1, {
      message: 'Please select a currency.',
    }),
})

export type AccountFormValues = z.infer<typeof accountFormSchema>
