import { FormEvent } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { ArrowRightIcon } from '../Icon/Icons'
import { Button } from '../ui/button'
import { z } from 'zod'
interface FormData {
  businessName: string
  businessType: string
  reportingYear: string
  currency: string
  bankName: string
  accountName: string
  accountNumber: string
  openingCashBalance: string
  generalLedger: boolean
  vendorLedger: boolean
  customerLedger: boolean
}
interface BasicsStepProps {
  formData: FormData
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  handleNext: () => void
}
export const basicsSchema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(100),
  businessType: z.string().min(1, 'Business type is required'),
  reportingYear: z.string().min(1, 'Reporting year is required'),
  currency: z.string().min(1, 'Currency is required'),
})
export default function BasicsStep({
  formData,
  handleInputChange,
  handleNext,
}: BasicsStepProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    handleNext()
  }
  return (
    <form onSubmit={handleSubmit} className="mt-[53px] w-full">
      <div className="space-y-[31px]">
        <div>
          <Label
            className="flex items-center gap-1 text-base text-[#333333] md:text-[20px]"
            htmlFor="businessName"
          >
            <span>Business Name</span>
            <span className="text-[#F30707]">*</span>
          </Label>
          <Input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            required
            placeholder="Your Business Name"
            className="mt-3 h-12 w-full rounded-[6px] border border-[#D1D5DB] p-3 text-[#667085] shadow-sm"
          />
        </div>

        <div>
          <Label
            className="flex items-center gap-1 text-base text-[#333333] md:text-[20px]"
            htmlFor="businessType"
          >
            <span>Business Type</span>
            <span className="text-[#F30707]">*</span>
          </Label>
          <div className="relative">
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              required
              className="mt-3 h-12 w-full appearance-none rounded-[6px] border border-[#D1D5DB] p-3 text-[#667085] shadow-sm"
            >
              <option value="">Select business type</option>
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty</option>
              <option value="service">Service</option>
              <option value="retail">Retail</option>
              <option value="food_beverage">Food & Beverage</option>
              <option value="technology">Technology</option>
              <option value="other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <Label
            className="flex items-center gap-1 text-base text-[#333333] md:text-[20px]"
            htmlFor="reportingYear"
          >
            <span>Reporting Year</span>
            <span className="text-[#F30707]">*</span>
          </Label>
          <div className="relative">
            <select
              id="reportingYear"
              name="reportingYear"
              value={formData.reportingYear}
              onChange={handleInputChange}
              required
              className="mt-3 h-12 w-full appearance-none rounded-[6px] border border-[#D1D5DB] p-3 text-[#667085] shadow-sm"
            >
              <option value="jan-dec">January - December</option>
              <option value="apr_mar">April - March</option>
              <option value="jul_jun">July - June</option>
              <option value="oct_sep">October - September</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <Label
            className="flex items-center gap-1 text-base text-[#333333] md:text-[20px]"
            htmlFor="currency"
          >
            <span>Currency</span>
            <span className="text-[#F30707]">*</span>
          </Label>
          <div className="relative">
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              required
              className="mt-3 h-12 w-full appearance-none rounded-[6px] border border-[#D1D5DB] p-3 text-[#667085] shadow-sm"
            >
              <option value="naira">Nigeria Naira (₦)</option>
              <option value="usd">US Dollar ($)</option>
              <option value="eur">Euro (€)</option>
              <option value="gbp">British Pound (£)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
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
