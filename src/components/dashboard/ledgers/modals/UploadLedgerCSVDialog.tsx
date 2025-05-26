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
import FileUpload from '../FileUpload'
import {
  BOOKKEEPING_LEDGER_API_URL,
  LEDGER_ENTRY_API_URL,
} from '@/lib/apiEndpoints'
import { getSession } from 'next-auth/react'
import { ArrowRight, InfoIcon, AlertCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface Ledger {
  id: string
  name: string
  description: string
}

interface UploadLedgerCSVDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
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

const UploadLedgerCSVDialog = ({
  isOpen,
  onClose,
  onSuccess,
}: UploadLedgerCSVDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const [ledgerCategory, setLedgerCategory] = useState<string>('')
  const [transactionType, setTransactionType] = useState('Expense')
  const [mappings, setMappings] = useState<Record<string, string>>({})
  const [csvHeaders, setCsvHeaders] = useState<string[]>([])
  const [error, setError] = useState<string | undefined>(undefined)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [ledgers, setLedgers] = useState<Ledger[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState<number>(1)

  const steps = [
    { step: 1, title: 'Upload & Details' },
    { step: 2, title: 'Map Columns' },
  ]

  useEffect(() => {
    const fetchLedgers = async () => {
      try {
        const session = await getSession()
        if (!session?.user?.access_token) {
          throw new Error('Authentication required')
        }

        const response = await fetch(BOOKKEEPING_LEDGER_API_URL, {
          headers: {
            Authorization: `Bearer ${session.user.access_token}`,
            Accept: 'application/json',
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to fetch ledgers')
        }

        const data = await response.json()
        setLedgers(data.data)
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load ledgers'
        toast.error(errorMessage)
        console.error('Error fetching ledgers:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (isOpen) {
      fetchLedgers()
    }
  }, [isOpen])

  useEffect(() => {
    if (selectedFile) {
      // Validate file size
      const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError('File size exceeds the 10MB limit')
        return
      }

      // Check file type
      if (
        !selectedFile.type.includes('csv') &&
        !selectedFile.name.endsWith('.csv')
      ) {
        setError('Only CSV files are accepted')
        return
      }

      parseCSVHeaders(selectedFile)
        .then((headers) => {
          setCsvHeaders(headers)
          const initialMappings: Record<string, string> = {}
          let dateMapped = false
          let descMapped = false
          let amountMapped = false

          headers.forEach((header) => {
            const lowerHeader = header.toLowerCase()
            if (lowerHeader.includes('date') && !dateMapped) {
              initialMappings[header] = 'Date'
              dateMapped = true
            } else if (lowerHeader.includes('desc') && !descMapped) {
              initialMappings[header] = 'Description'
              descMapped = true
            } else if (
              (lowerHeader.includes('amount') ||
                lowerHeader.includes('sum') ||
                lowerHeader.includes('total')) &&
              !amountMapped
            ) {
              initialMappings[header] = 'Amount'
              amountMapped = true
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
    } else {
      setCsvHeaders([])
      setMappings({})
    }
  }, [selectedFile])

  const handleClose = () => {
    setSelectedFile(undefined)
    setLedgerCategory('')
    setTransactionType('Expense')
    setMappings({})
    setCsvHeaders([])
    setError(undefined)
    setCurrentStep(1)
    setUploadProgress(0)
    onClose()
  }

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!selectedFile) {
        setError('Please select a file')
        return false
      }
      if (!ledgerCategory) {
        setError('Please select a ledger category')
        return false
      }
      setError(undefined)
      return true
    } else if (step === 2) {
      const mappedColumns = Object.values(mappings).filter(
        (value) => value !== '' && value !== 'none'
      )
      const requiredColumns = ['Date', 'Description', 'Amount']
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
    const toastId = toast.loading('Preparing to upload ledger CSV...')

    try {
      // Use XHR for progress tracking
      const uploadWithProgress = async () => {
        const session = await getSession()
        if (!session?.user?.access_token) {
          throw new Error('Authentication required. Please log in again.')
        }

        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()

          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const percentComplete = Math.round(
                (event.loaded / event.total) * 100
              )
              setUploadProgress(percentComplete)
              if (percentComplete > 0) {
                toast.loading(`Uploading: ${percentComplete}%`, { id: toastId })
              }
            }
          })

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.responseText))
            } else {
              try {
                const errorData = JSON.parse(xhr.responseText)
                reject(
                  new Error(
                    errorData.message ||
                      `Upload failed with status: ${xhr.status}`
                  )
                )
              } catch {
                reject(new Error(`Upload failed with status: ${xhr.status}`))
              }
            }
          }

          xhr.onerror = () => reject(new Error('Network error during upload'))
          xhr.ontimeout = () => reject(new Error('Upload timed out'))

          xhr.open('POST', `${LEDGER_ENTRY_API_URL}/upload`)
          xhr.setRequestHeader(
            'Authorization',
            `Bearer ${session.user.access_token}`
          )
          xhr.setRequestHeader('Accept', 'application/json')
          xhr.timeout = 60000 // 1 minute timeout

          const formData = new FormData()
          formData.append('ledger', ledgerCategory)
          formData.append('ledger_file', selectedFile!)
          formData.append('transaction_type', transactionType)

          // Process mappings
          Object.entries(mappings).forEach(([csvColumn, reconxiField]) => {
            if (
              reconxiField &&
              reconxiField !== '' &&
              reconxiField !== 'none'
            ) {
              formData.append(
                `mapper[${reconxiField.toLowerCase()}]`,
                csvColumn
              )
            }
          })

          xhr.send(formData)
        })
      }

      await uploadWithProgress()
      toast.success('Ledger CSV uploaded successfully', { id: toastId })

      if (onSuccess) {
        onSuccess()
      }

      handleClose()
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to upload ledger CSV'

      toast.error(errorMessage, { id: toastId })
      setError(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  const handleMappingChange = (csvColumn: string, reconxiColumn: string) => {
    setMappings((prev) => ({
      ...prev,
      [csvColumn]: reconxiColumn === 'none' ? '' : reconxiColumn,
    }))
  }

  const reconxiColumns = ['Date', 'Description', 'Amount']

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="rounded-lg p-6 sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-left text-xl font-semibold text-gray-800">
            Upload Ledger CSV
          </DialogTitle>
        </DialogHeader>

        <div className="my-4">
          <p className="mb-2 text-sm text-[#344054]">
            Step {currentStep} of 2:{' '}
            {steps.find((s) => s.step === currentStep)?.title}
          </p>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {currentStep === 1 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="ledgerCategory"
                  className="font-inter text-sm font-medium text-[#344054]"
                >
                  Ledger Category
                </label>
                <Select
                  value={ledgerCategory}
                  onValueChange={(value: string) => setLedgerCategory(value)}
                  disabled={isLoading || ledgers.length === 0}
                >
                  <SelectTrigger
                    id="ledgerCategory"
                    className="font-inter w-full rounded-md border-gray-300 text-sm text-[#344054]"
                  >
                    <SelectValue placeholder="Select a ledger" />
                  </SelectTrigger>
                  <SelectContent>
                    {ledgers.length === 0 && isLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading ledgers...
                      </SelectItem>
                    ) : ledgers.length === 0 ? (
                      <SelectItem value="none" disabled>
                        No ledgers available
                      </SelectItem>
                    ) : (
                      ledgers.map((ledger) => (
                        <SelectItem key={ledger.id} value={ledger.id}>
                          {ledger.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="transactionType"
                  className="font-inter text-sm font-medium text-[#344054]"
                >
                  Transaction Type
                </label>
                <Select
                  value={transactionType}
                  onValueChange={setTransactionType}
                >
                  <SelectTrigger
                    id="transactionType"
                    className="font-inter w-full rounded-md border-gray-300 text-sm text-[#344054]"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Expense">Expense</SelectItem>
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="Transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FileUpload
                file={selectedFile}
                onFileSelect={(file) => setSelectedFile(file)}
                onFileDelete={() => setSelectedFile(undefined)}
                error={error}
                accept=".csv"
                maxSize={10} // 10MB
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-[#344054]">
                Map your CSV columns to Reconxi fields. Select a CSV column for
                each Reconxi field below.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {/* Left Column: CSV Header Dropdowns */}
                <div className="flex flex-col gap-3">
                  <div className="text-sm font-medium text-[#344054]">
                    Your CSV Data Columns
                  </div>
                  {!selectedFile || csvHeaders.length === 0 ? (
                    <div className="flex h-10 items-center justify-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
                      <span className="text-[14px] text-gray-500">
                        No CSV found
                      </span>
                    </div>
                  ) : (
                    reconxiColumns.map((reconxiColumn) => (
                      <div
                        key={reconxiColumn}
                        className="flex h-[40px] items-center gap-2"
                      >
                        <Select
                          value={
                            Object.entries(mappings).find(
                              ([, value]) => value === reconxiColumn
                            )?.[0] || 'none'
                          }
                          onValueChange={(csvColumn) =>
                            handleMappingChange(csvColumn, reconxiColumn)
                          }
                        >
                          <SelectTrigger className="h-10 w-full rounded-md border-gray-300 text-[#344054]">
                            <SelectValue placeholder="Select CSV column" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {csvHeaders.map((header) => (
                              <SelectItem key={header} value={header}>
                                {header}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <ArrowRight className="text-[#667085]/80" size={20} />
                      </div>
                    ))
                  )}
                </div>

                {/* Right Column: Fixed Reconxi Fields */}
                <div className="flex flex-col gap-3">
                  <div className="text-sm font-medium text-[#344054]">
                    Reconxi Data Columns
                  </div>
                  {reconxiColumns.map((reconxiColumn) => (
                    <div
                      key={reconxiColumn}
                      className="flex h-10 items-center justify-between rounded-md border border-gray-300 bg-gray-100 px-3 py-2"
                    >
                      <span className="font-inter text-[14px] font-normal text-[#667085]">
                        {reconxiColumn}
                      </span>
                      <InfoIcon className="text-[#667085]/50" size={16} />
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle size={16} className="text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              {selectedFile && csvHeaders.length > 0 && (
                <div className="mt-2 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
                  <p className="font-medium">CSV File Details:</p>
                  <p className="mt-1">
                    Found {csvHeaders.length} columns: {csvHeaders.join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}

          {isUploading && uploadProgress > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-sm text-[#344054]">
                Upload Progress: {uploadProgress}%
              </p>
              <Progress value={uploadProgress} className="h-2 w-full" />
            </div>
          )}
        </div>

        <DialogFooter className="flex w-full border-t border-gray-100 pt-4">
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              className="text-primary flex-1 bg-white text-base dark:bg-gray-800"
              size="lg"
              onClick={currentStep === 1 ? handleClose : prevStep}
              disabled={isUploading}
            >
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 flex-1 text-base"
              size="lg"
              onClick={currentStep === 2 ? handleUpload : nextStep}
              disabled={
                isUploading ||
                (currentStep === 1 &&
                  (!selectedFile || !ledgerCategory || isLoading))
              }
            >
              {currentStep === 2
                ? isUploading
                  ? `Uploading... ${uploadProgress}%`
                  : 'Upload Ledger'
                : 'Next'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UploadLedgerCSVDialog
