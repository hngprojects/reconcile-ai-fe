'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FolderUp } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface AddLedgerEntryProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: LedgerEntryData) => void
}

interface LedgerEntryData {
  ledgerCategory: string
  transactionType: string
  transactionDate: string
  description: string
  amount: string
  paidStatus: string
  dueDate: string
  amountPaid: string
  bankAccount: string
  account: string
  reference?: string
  attachment?: File
}

export const AddLedgerEntryModal: React.FC<AddLedgerEntryProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [dragActive, setDragActive] = useState(false)
  const [formData, setFormData] = useState<LedgerEntryData>({
    ledgerCategory: 'General Ledger',
    transactionType: 'Expense',
    transactionDate: '',
    description: '',
    amount: '',
    paidStatus: 'Paid',
    dueDate: '',
    amountPaid: '',
    bankAccount: '',
    account: '',
    reference: '',
    attachment: undefined,
  })

  const handleChange = (field: keyof LedgerEntryData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, attachment: e.dataTransfer.files[0] })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, attachment: e.target.files[0] })
    }
  }

  const nextStep = () => setCurrentStep(currentStep + 1)
  const prevStep = () => setCurrentStep(currentStep - 1)

  const handleSave = () => {
    onSave(formData)
    onClose()
    setFormData({
      ledgerCategory: 'General Ledger',
      transactionType: 'Expense',
      transactionDate: '',
      description: '',
      amount: '',
      paidStatus: 'Paid',
      dueDate: '',
      amountPaid: '',
      bankAccount: '',
      account: '',
      reference: '',
      attachment: undefined,
    })
    setCurrentStep(1)
  }

  const handleClose = () => {
    onClose()
    setCurrentStep(1)
  }

  const steps = [
    { step: 1, title: 'Basic Info' },
    { step: 2, title: 'Payment Info' },
    { step: 3, title: 'Categorization' },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="gap-[0px] p-6 sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="font-inter text-left text-[20px] leading-[24px] font-medium tracking-normal">
            Add Ledger Entry
          </DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="mt-6 mb-4">
          <p className="font-inter mb-2 text-sm text-[14px] leading-[20px] font-medium tracking-normal">
            Step {currentStep} of 3:{' '}
            {steps.find((s) => s.step === currentStep)?.title}
          </p>
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[8px]">
                <label className="font-inter block text-sm text-[14px] leading-[20px] font-medium tracking-normal">
                  Ledger Category
                </label>
                <Select
                  value={formData.ledgerCategory}
                  onValueChange={(value) =>
                    handleChange('ledgerCategory', value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Ledger">
                      General Ledger
                    </SelectItem>
                    <SelectItem value="Accounts Receivable">
                      Accounts Receivable
                    </SelectItem>
                    <SelectItem value="Accounts Payable">
                      Accounts Payable
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="font-inter block text-sm text-[14px] leading-[20px] font-medium tracking-normal">
                  Transaction Type
                </label>
                <Select
                  value={formData.transactionType}
                  onValueChange={(value) =>
                    handleChange('transactionType', value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Expense">Expense</SelectItem>
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="Transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="font-inter block text-sm text-[14px] leading-[20px] font-medium tracking-normal">
                  Transaction Date
                </label>
                <Input
                  type="date"
                  className="w-full"
                  value={formData.transactionDate}
                  onChange={(e) =>
                    handleChange('transactionDate', e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="font-inter block text-sm text-[14px] leading-[20px] font-medium tracking-normal">
                  Description
                </label>
                <Input
                  placeholder="Short summary of transaction"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="font-inter block text-sm text-[14px] leading-[20px] font-medium tracking-normal">
                  Amount
                </label>
                <Input
                  type="text"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[8px]">
                <label className="font-inter block text-sm text-[14px] leading-[20px] font-medium tracking-normal">
                  Paid Status
                </label>
                <Select
                  value={formData.paidStatus}
                  onValueChange={(value) => handleChange('paidStatus', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                    <SelectItem value="Partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="font-inter block text-sm text-[14px] leading-[20px] font-medium tracking-normal">
                  Due Date
                </label>
                <Input
                  type="date"
                  className="w-full"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="font-inter block text-sm text-[14px] leading-[20px] font-medium tracking-normal">
                  Amount Paid
                </label>
                <Input
                  type="text"
                  placeholder="0.00"
                  value={formData.amountPaid}
                  onChange={(e) => handleChange('amountPaid', e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="font-inter block text-sm text-[14px] leading-[20px] font-medium tracking-normal">
                  Bank Account
                </label>
                <Select
                  value={formData.bankAccount}
                  onValueChange={(value) => handleChange('bankAccount', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select bank account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main Account">Main Account</SelectItem>
                    <SelectItem value="Business Account">
                      Business Account
                    </SelectItem>
                    <SelectItem value="Savings Account">
                      Savings Account
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[8px]">
                <label className="font-inter block text-sm text-[14px] leading-[20px] font-medium tracking-normal">
                  Account/Category
                </label>
                <Select
                  value={formData.account}
                  onValueChange={(value) => handleChange('account', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Office Supplies">
                      Office Supplies
                    </SelectItem>
                    <SelectItem value="Rent">Rent</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Salaries">Salaries</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="font-inter block text-sm text-[14px] leading-[20px] font-medium tracking-normal">
                  Reference (Optional)
                </label>
                <Input
                  placeholder="Reference number"
                  value={formData.reference}
                  onChange={(e) => handleChange('reference', e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="font-inter block text-sm text-[14px] leading-[20px] font-medium tracking-normal">
                  Attachment (Optional)
                </label>
                <div
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-8 ${dragActive ? 'border-green-600 bg-green-50' : 'border-gray-300'}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="flex flex-col items-center">
                    <FolderUp className="h-6 w-6 text-[#2E604A]" />
                    <p className="font-inter text-center text-sm text-[16px] leading-[140%] font-normal tracking-normal text-[#475569]">
                      Drag and Drop files here or{' '}
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer font-medium text-[#2E604A]"
                      >
                        Choose file
                      </label>
                    </p>
                    <p className="font-inter mt-2 text-[14px] leading-[140%] font-light tracking-normal text-[#333333]">
                      Supported format: CSV
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="flex w-full border-t border-gray-100 pt-4">
          <div className="flex w-full gap-2">
            <Button
              variant={'outline'}
              className="text-primary min-h-[48px] flex-1 cursor-pointer bg-white text-[16px] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
              size="lg"
              onClick={currentStep === 1 ? handleClose : prevStep}
            >
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 min-h-[48px] flex-1 cursor-pointer transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
              size="lg"
              onClick={currentStep === 3 ? handleSave : nextStep}
            >
              {currentStep === 3 ? 'Save Entry' : 'Next'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddLedgerEntryModal
