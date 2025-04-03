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
      <DialogContent className="mt-[24px] sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between pb-2">
          <DialogTitle className="mt-[-64px] text-lg font-medium">
            Upload Ledger CSV
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            {/* <X className="h-4 w-4" /> */}
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="mb-2">
              <label className="mb-1 block text-sm font-medium">
                Ledger Category
              </label>
              <Select value={ledgerCategory} onValueChange={setLedgerCategory}>
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

            <div className="mb-2">
              <label className="mb-1 block text-sm font-medium">
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
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium">Upload files</h3>
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
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                  <FolderUp className="h-6 w-6 text-green-600" />
                </div>
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

          <div className="text-sm">
            <span className="text-gray-500">Need a template? </span>
            <a href="#" className="text-green-600 hover:underline">
              Download CSV Template
            </a>
          </div>
        </div>

        <DialogFooter className="mt-4 flex w-full gap-4 border-t border-gray-100 px-0 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Upload Ledger
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UploadLedgerCSVDialog
