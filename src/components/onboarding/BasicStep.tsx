'use client'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { ArrowRightIcon } from '../Icon/Icons'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useOnBoardingStore } from '@/store/onboarding-store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Form } from '../ui/form'

export const basicInfoSchema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(100),
  businessType: z.string().min(1, 'Business type is required'),
  reportingYear: z.string().min(1, 'Reporting year is required'),
  currency: z.string().min(1, 'Currency is required'),
})

export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>

export default function BasicsStep() {
  const { basicInfo, updateBasicInfo, handleNext } = useOnBoardingStore()

  const form = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      businessName: basicInfo.businessName,
      businessType: basicInfo.businessType,
      reportingYear: basicInfo.reportingYear,
      currency: basicInfo.currency, // Fixed: was using reportingYear here
    },
  })

  const onSubmit = (data: BasicInfoFormValues) => {
    updateBasicInfo(data)
    handleNext()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-[53px] w-full">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <Label
                  className="flex items-center gap-1 text-base text-[#333333]"
                  htmlFor="businessName"
                >
                  <span>Business Name</span>
                  <span className="text-[#F30707]">*</span>
                </Label>
                <FormControl>
                  <Input
                    {...field}
                    id="businessName"
                    placeholder="Your Business Name"
                    className="!h-12 w-full placeholder:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <Label
                  className="flex items-center gap-1 text-base text-[#333333]"
                  htmlFor="businessType"
                >
                  <span>Business Type</span>
                  <span className="text-[#F30707]">*</span>
                </Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="!h-12 w-full" id="businessType">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reportingYear"
            render={({ field }) => (
              <FormItem>
                <Label
                  className="flex items-center gap-1 text-base text-[#333333]"
                  htmlFor="reportingYear"
                >
                  <span>Reporting Year</span>
                  <span className="text-[#F30707]">*</span>
                </Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="!h-12 w-full" id="reportingYear">
                      <SelectValue placeholder="Select reporting year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="January - December">
                      January - December
                    </SelectItem>
                    <SelectItem value="April - March">April - March</SelectItem>
                    <SelectItem value="July - June">July - June</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <Label
                  className="flex items-center gap-1 text-base text-[#333333]"
                  htmlFor="currency"
                >
                  <span>Default Currency</span>
                  <span className="text-[#F30707]">*</span>
                </Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="!h-12 w-full" id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-[31px]">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            Create Account
            <span>
              <ArrowRightIcon className="text-white" />
            </span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
