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

export const basicInfoSchema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(100),
  businessType: z.string().min(1, 'Business type is required'),
  reportingYear: z.string().min(1, 'Reporting year is required'),
  currency: z.string().min(1, 'Currency is required'),
})

export default function BasicsStep() {
  const { basicInfo, updateBasicInfo, handleNext } = useOnBoardingStore()

  const form = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      businessName: basicInfo.businessName,
      businessType: basicInfo.businessType,
      reportingYear: basicInfo.reportingYear,
      currency: basicInfo.reportingYear,
    },
  })

  const onSubmit = (data: z.infer<typeof basicInfoSchema>) => {
    const result = basicInfoSchema.safeParse(data)

    if (!result.success) return null

    updateBasicInfo({
      businessName: data.businessName,
      businessType: data.businessType,
      reportingYear: data.reportingYear,
      currency: data.currency,
    })

    handleNext()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-[53px] w-full">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label
            className="flex items-center gap-1 text-base text-[#333333]"
            htmlFor="businessName"
          >
            <span>Business Name</span>
            <span className="text-[#F30707]">*</span>
          </Label>
          <Input
            type="text"
            id="businessName"
            name="businessName"
            placeholder="Your Business Name"
            className="!h-12 w-full placeholder:text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label
            className="flex items-center gap-1 text-base text-[#333333]"
            htmlFor="businessType"
          >
            <span>Business Type</span>
            <span className="text-[#F30707]">*</span>
          </Label>
          <Select
          // value={} onValueChange={}
          >
            <SelectTrigger className="!h-12 w-full">
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
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
        </div>

        <div className="space-y-2">
          <Label
            className="flex items-center gap-1 text-base text-[#333333]"
            htmlFor="reportingYear"
          >
            <span>Reporting Year</span>
            <span className="text-[#F30707]">*</span>
          </Label>
          <Select
          // value={} onValueChange={}
          >
            <SelectTrigger className="!h-12 w-full">
              <SelectValue placeholder="Select reporting year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="January - December">
                January - December
              </SelectItem>
              <SelectItem value="April - March">April - March</SelectItem>
              <SelectItem value="July - June">July - June</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Default Currency</Label>
          <Select
          // value={} onValueChange={}
          >
            <SelectTrigger className="!h-12 w-full">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
              <SelectItem value="USD">US Dollar ($)</SelectItem>
              <SelectItem value="EUR">Euro (€)</SelectItem>
              <SelectItem value="GBP">British Pound (£)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-[31px]">
        <Button className="w-full">
          Create Account
          <span>
            <ArrowRightIcon className="text-white" />
          </span>
        </Button>
      </div>
    </form>
  )
}
