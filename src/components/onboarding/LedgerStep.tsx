import { FormEvent } from 'react'
import { Button } from '../ui/button'
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

interface LedgerStepProps {
  formData: FormData
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  handleNext: () => void
  handleBack: () => void
}
export default function LedgerStep({
  formData,
  handleInputChange,
  handleNext,
  handleBack,
}: LedgerStepProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    handleNext()
  }
  return (
    <form className="mt-5 w-full" onSubmit={handleSubmit}>
      <div className="flex w-full items-center justify-between border-b border-[#D3D3D3] pb-5">
        <div>
          <div className="mb-5">
            <h3 className="font-semibold text-[#333333]">Active Ledger</h3>
            <p className="text-sm text-[#646464]">
              Select which ledger you want to use in your accounting system
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[#333333]">General Ledger</h3>
            <p className="text-sm text-[#646464]">
              Main accounting ledger for all transaction
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              name="generalLedger"
              checked={formData.generalLedger}
            />
            <div className="peer h-6 w-11 rounded-full bg-[#ABABAB] peer-checked:bg-[#ABABAB] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
      </div>
      <div className="flex w-full items-center justify-between border-b border-[#D3D3D3] py-5">
        <div>
          <h3 className="font-semibold text-[#333333]">Vendor Ledger</h3>
          <p className="text-sm text-[#646464]">
            Track account payable and vendor transaction
          </p>
        </div>
        <div className="flex items-center">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              name="vendorLedger"
              checked={formData.vendorLedger}
              onChange={handleInputChange}
            />
            <div className="peer h-6 w-11 rounded-full bg-[#ABABAB] peer-checked:bg-[#2E604A] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
      </div>
      <div className="flex w-full items-center justify-between border-b border-[#D3D3D3] py-5">
        <div>
          <h3 className="font-semibold text-[#333333]">Customer Ledger</h3>
          <p className="text-sm text-[#646464]">
            Track account receivable and customer transaction
          </p>
        </div>
        <div className="flex items-center">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              name="customerLedger"
              checked={formData.customerLedger}
              onChange={handleInputChange}
            />
            <div className="peer h-6 w-11 rounded-full bg-[#ABABAB] peer-checked:bg-[#2E604A] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          className="w-[137px] border border-[#C0C0C0] bg-white p-3 text-[#333333]"
          onClick={handleBack}
        >
          Back
        </Button>

        <Button type="submit" className="w-[137px] p-3">
          Continue
        </Button>
      </div>
    </form>
  )
}
