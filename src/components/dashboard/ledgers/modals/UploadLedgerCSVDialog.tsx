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
// import { X } from 'lucide-react'

interface UploadLedgerCSVProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File) => void
}

export const UploadLedgerCSVDialog: React.FC<UploadLedgerCSVProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [ledgerCategory, setLedgerCategory] = useState<string>('General Ledger')
  const [transactionType, setTransactionType] = useState<string>('Expense')

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
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="gap-[0px] p-6 sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="font-inter text-left text-[20px] leading-[24px] font-medium tracking-normal">
            Upload Ledger CSV
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 flex flex-col gap-[48px]">
          <div className="">
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[8px]">
                <label className="font-inter mb-1 block text-sm text-[14px] leading-[20px] font-medium tracking-normal">
                  Ledger Category
                </label>
                <Select
                  value={ledgerCategory}
                  onValueChange={setLedgerCategory}
                >
                  <SelectTrigger className="text-grey-500 font-inter w-full text-[14px] leading-[20px] font-normal tracking-normal">
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
                  value={transactionType}
                  onValueChange={setTransactionType}
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
              <div className="flex flex-col gap-[8px] text-sm font-medium">
                <h3 className="font-inter text-[18px] leading-none font-semibold tracking-normal">
                  Upload files
                </h3>
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
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                      <FolderUp className="h-6 w-6 text-[#2E604A]" />
                    </div>
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

            <div className="mt-4 text-sm">
              <span className="font-inter text-[14px] leading-[20px] font-medium tracking-normal">
                Need a template?{' '}
              </span>
              <a href="#" className="text-[#2E604A] hover:underline">
                Download CSV Template
              </a>
            </div>
          </div>
          <DialogFooter className="flex w-full border-t border-gray-100">
            <div className="flex w-full gap-2">
              <Button
                variant={'outline'}
                className="text-primary min-h-[48px] flex-1 cursor-pointer bg-white text-[16px] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                size="lg"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 min-h-[48px] flex-1 cursor-pointer transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                size="lg"
                onClick={handleUpload}
                disabled={!selectedFile}
              >
                Upload Ledger
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UploadLedgerCSVDialog
