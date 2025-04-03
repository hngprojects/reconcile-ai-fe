'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Calendar, FolderUp } from 'lucide-react'
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
  // Step 1
  ledgerCategory: string
  transactionType: string
  transactionDate: string
  description: string
  amount: string
  // Step 2
  paidStatus: string
  dueDate: string
  amountPaid: string
  bankAccount: string
  // Step 3
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

  // Form state
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

  // Handle form field changes
  const handleChange = (field: keyof LedgerEntryData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  // Handle file upload
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

  // Handle navigation between steps
  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSave = () => {
    onSave(formData)
    onClose()
    // Reset form after saving
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
    // Reset form and step on close
    setCurrentStep(1)
  }

  // Step titles
  const steps = [
    { step: 1, title: 'Basic Info' },
    { step: 2, title: 'Payment Info' },
    { step: 3, title: 'Categorization' },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between pb-2">
          <DialogTitle className="text-lg font-medium">
            Add Ledger Entry
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleClose}
          >
            <span className="sr-only">Close</span>
            {/* <X className="h-4 w-4" /> */}
          </Button>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="mb-4">
          <p className="mb-2 text-sm">
            Step {currentStep} of 3:{' '}
            {steps.find((s) => s.step === currentStep)?.title}
          </p>
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-green-700"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Ledger Category
              </label>
              <Select
                value={formData.ledgerCategory}
                onValueChange={(value) => handleChange('ledgerCategory', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Ledger">General Ledger</SelectItem>
                  <SelectItem value="Accounts Receivable">
                    Accounts Receivable
                  </SelectItem>
                  <SelectItem value="Accounts Payable">
                    Accounts Payable
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
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

            <div>
              <label className="mb-1 block text-sm font-medium">
                Transaction Date
              </label>
              <div className="relative">
                <Input
                  type="date"
                  className="pl-10"
                  placeholder="Select date"
                  value={formData.transactionDate}
                  onChange={(e) =>
                    handleChange('transactionDate', e.target.value)
                  }
                />
                <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Description
              </label>
              <Input
                placeholder="Short summary of transaction"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Amount</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="0.00"
                  className="pl-8"
                  value={formData.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                />
                <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-500">
                  ₦
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Payment Info */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
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

            <div>
              <label className="mb-1 block text-sm font-medium">Due Date</label>
              <div className="relative">
                <Input
                  type="date"
                  className="pl-10"
                  placeholder="Select date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                />
                <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Amount Paid
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="0.00"
                  className="pl-8"
                  value={formData.amountPaid}
                  onChange={(e) => handleChange('amountPaid', e.target.value)}
                />
                <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-500">
                  ₦
                </span>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Bank Paid From/Into
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

        {/* Step 3: Categorization */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
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

            <div>
              <label className="mb-1 block text-sm font-medium">
                Reference (Optional)
              </label>
              <Input
                placeholder="Reference number"
                value={formData.reference}
                onChange={(e) => handleChange('reference', e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
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
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center">
                  <FolderUp className="mb-2 h-6 w-6 text-green-600" />
                  <p className="text-center text-sm">
                    Drag and Drop files here or{' '}
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer font-medium text-green-600"
                    >
                      Choose file
                    </label>
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    Supported format: CSV
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 flex w-full gap-4 border-t border-gray-100 pt-4">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? handleClose : prevStep}
            className="flex-1"
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            onClick={currentStep === 3 ? handleSave : nextStep}
            className="flex-1 bg-green-700 text-white hover:bg-green-800"
          >
            {currentStep === 3 ? 'Save Entry' : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddLedgerEntryModal
