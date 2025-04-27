'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, InfoIcon, AlertCircle } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

interface UploadBankStatementCSVDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  bankStatement: File
}

const parseCSVHeaders = async (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const result = event.target?.result
        if (typeof result !== 'string') {
          reject(new Error('Failed to read file as text'))
          return
        }
        const lines = result.split('\n')
        if (lines.length > 0) {
          const headers = lines[0]
            .split(',')
            .map((header: string) => header.trim())
          resolve(headers)
        } else {
          reject(new Error('CSV file appears to be empty'))
        }
      } catch (error: unknown) {
        reject(
          error instanceof Error ? error : new Error('Failed to parse CSV file')
        )
      }
    }
    reader.onerror = () => {
      reject(new Error('Error reading the file'))
    }
    reader.readAsText(file)
  })
}

const UploadBankStatementCSVDialog = ({
  isOpen,
  onClose,
  onSuccess,
  bankStatement,
}: UploadBankStatementCSVDialogProps) => {
  const [mappings, setMappings] = useState<Record<string, string>>({})
  const [csvHeaders, setCsvHeaders] = useState<string[]>([])
  const [error, setError] = useState<string | undefined>(undefined)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const { theme } = useTheme()
  const router = useRouter()

  const steps = [
    { step: 1, title: 'Review Bank Statement' },
    { step: 2, title: 'Map Columns' },
  ]

  useEffect(() => {
    if (bankStatement) {
      parseCSVHeaders(bankStatement)
        .then((headers) => {
          setCsvHeaders(headers)
          const initialMappings: Record<string, string> = {}
          headers.forEach((header) => {
            const lowerHeader = header.toLowerCase()
            if (lowerHeader.includes('date')) {
              initialMappings[header] = 'Transaction Date'
            } else if (
              lowerHeader.includes('desc') ||
              lowerHeader.includes('narr')
            ) {
              initialMappings[header] = 'Description'
            } else if (
              lowerHeader.includes('debit') ||
              lowerHeader.includes('withdrawal')
            ) {
              initialMappings[header] = 'Debit'
            } else if (
              lowerHeader.includes('credit') ||
              lowerHeader.includes('deposit')
            ) {
              initialMappings[header] = 'Credit'
            } else if (lowerHeader.includes('balance')) {
              initialMappings[header] = 'Balance'
            } else {
              initialMappings[header] = ''
            }
          })
          setMappings(initialMappings)
          setError(undefined)
        })
        .catch((error) => {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to parse CSV file'
          toast.error(errorMessage)
          setError(errorMessage)
        })
    }
  }, [bankStatement])

  const handleClose = () => {
    setMappings({})
    setCsvHeaders([])
    setError(undefined)
    setCurrentStep(1)
    setUploadProgress(0)
    onClose()
  }

  const validateStep = (step: number): boolean => {
    if (step === 2) {
      const mappedColumns = Object.values(mappings).filter(
        (value) => value !== '' && value !== 'none'
      )
      const requiredColumns = [
        'Transaction Date',
        'Description',
        'Debit',
        'Credit',
        'Balance',
      ]
      const missingColumns = requiredColumns.filter(
        (col) => !mappedColumns.includes(col)
      )
      if (missingColumns.length > 0) {
        setError(
          `Please map the following required fields: ${missingColumns.join(', ')}`
        )
        return false
      }
      setError(undefined)
      return true
    }
    return true
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleUpload = async () => {
    if (!validateStep(currentStep)) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 20) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        setUploadProgress(i)
      }

      toast.success('Bank statement mapped successfully')

      if (onSuccess) {
        onSuccess()
      }

      // Redirect to recon-processing page
      router.push('/dashboard/recon-processing')
      handleClose()
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to process bank statement'
      toast.error(errorMessage)
      setError(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  const handleMappingChange = (
    csvColumn: string,
    bankStatementColumn: string
  ) => {
    setMappings((prev) => ({
      ...prev,
      [csvColumn]: bankStatementColumn === 'none' ? '' : bankStatementColumn,
    }))
  }

  const bankStatementColumns = [
    'Transaction Date',
    'Description',
    'Debit',
    'Credit',
    'Balance',
  ]

  const isDarkTheme = theme === 'dark'

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`rounded-lg p-6 sm:max-w-[550px] ${isDarkTheme ? 'bg-[#1F1F1F] text-white' : 'bg-white'}`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-left text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}
          >
            Map Bank Statement Columns
          </DialogTitle>
        </DialogHeader>

        <div className="my-4">
          <p
            className={`mb-2 text-sm ${isDarkTheme ? 'text-gray-300' : 'text-[#344054]'}`}
          >
            Step {currentStep} of 2:{' '}
            {steps.find((s) => s.step === currentStep)?.title}
          </p>
          <div
            className={`h-2 w-full rounded-full ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`}
          >
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {currentStep === 2 && (
            <div className="flex flex-col gap-4">
              <p
                className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-[#344054]'}`}
              >
                Map your bank statement columns to the required fields below.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <div
                    className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-[#344054]'}`}
                  >
                    Your CSV Data Columns
                  </div>
                  {!bankStatement || csvHeaders.length === 0 ? (
                    <div
                      className={`flex h-10 items-center justify-center rounded-md border ${isDarkTheme ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'} px-3 py-2`}
                    >
                      <span
                        className={`text-[14px] ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        No CSV found
                      </span>
                    </div>
                  ) : (
                    bankStatementColumns.map((bankStatementColumn) => (
                      <div
                        key={bankStatementColumn}
                        className="flex h-[40px] items-center gap-2"
                      >
                        <Select
                          value={
                            Object.entries(mappings).find(
                              ([, value]) => value === bankStatementColumn
                            )?.[0] || 'none'
                          }
                          onValueChange={(csvColumn) =>
                            handleMappingChange(csvColumn, bankStatementColumn)
                          }
                        >
                          <SelectTrigger
                            className={`h-10 w-full rounded-md ${isDarkTheme ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 text-[#344054]'}`}
                          >
                            <SelectValue placeholder="Select CSV column" />
                          </SelectTrigger>
                          <SelectContent
                            className={
                              isDarkTheme ? 'bg-gray-800 text-white' : ''
                            }
                          >
                            <SelectItem value="none">None</SelectItem>
                            {csvHeaders.map((header) => (
                              <SelectItem key={header} value={header}>
                                {header}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <ArrowRight
                          className={
                            isDarkTheme ? 'text-gray-400' : 'text-[#667085]/80'
                          }
                          size={20}
                        />
                      </div>
                    ))
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <div
                    className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-[#344054]'}`}
                  >
                    Required Fields
                  </div>
                  {bankStatementColumns.map((column) => (
                    <div
                      key={column}
                      className={`flex h-10 items-center justify-between rounded-md border px-3 py-2 ${
                        isDarkTheme
                          ? 'border-gray-600 bg-gray-800 text-white'
                          : 'border-gray-300 bg-gray-100 text-[#667085]'
                      }`}
                    >
                      <span className="font-inter text-[14px] font-normal">
                        {column}
                      </span>
                      <InfoIcon
                        className={
                          isDarkTheme ? 'text-gray-400' : 'text-[#667085]/50'
                        }
                        size={16}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div
                  className={`flex items-center gap-2 rounded-md p-3 text-sm ${
                    isDarkTheme
                      ? 'bg-red-900/50 text-red-300'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  <AlertCircle
                    size={16}
                    className={isDarkTheme ? 'text-red-300' : 'text-red-500'}
                  />
                  <span>{error}</span>
                </div>
              )}
            </div>
          )}

          {isUploading && uploadProgress > 0 && (
            <div className="mt-4">
              <p
                className={`mb-2 text-sm ${isDarkTheme ? 'text-gray-300' : 'text-[#344054]'}`}
              >
                Processing: {uploadProgress}%
              </p>
              <Progress value={uploadProgress} className="h-2 w-full" />
            </div>
          )}
        </div>

        <DialogFooter
          className={`flex w-full border-t ${isDarkTheme ? 'border-gray-700' : 'border-gray-100'} pt-4`}
        >
          <div className="flex w-full gap-2">
            <Button
              variant={isDarkTheme ? 'outline' : 'secondary'}
              className={`flex-1 text-base ${isDarkTheme ? 'border-gray-600 bg-transparent text-white hover:bg-gray-800' : ''}`}
              size="lg"
              onClick={currentStep === 1 ? handleClose : prevStep}
              disabled={isUploading}
            >
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button
              className={`flex-1 text-base ${isDarkTheme ? 'bg-blue-600 hover:bg-blue-700' : 'bg-primary hover:bg-primary/90'}`}
              size="lg"
              onClick={currentStep === 2 ? handleUpload : nextStep}
              disabled={isUploading}
            >
              {currentStep === 2
                ? isUploading
                  ? `Processing... ${uploadProgress}%`
                  : 'Process Statement'
                : 'Next'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UploadBankStatementCSVDialog
