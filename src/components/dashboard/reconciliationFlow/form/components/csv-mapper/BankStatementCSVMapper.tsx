'use client'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowRight, HelpCircle } from 'lucide-react'
import { toast } from 'sonner'
import { parseCSVHeaders } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface BankStatementCSVMapperProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (mappings: Record<string, string>) => void
  file: File | null
}

export const BankStatementCSVMapper = ({
  isOpen,
  onClose,
  onSuccess,
  file,
}: BankStatementCSVMapperProps) => {
  const [csvHeaders, setCsvHeaders] = useState<string[]>([])
  const [mappings, setMappings] = useState<Record<string, string>>({})
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (file) {
      parseCSVHeaders(file)
        .then((headers: string[]) => {
          setCsvHeaders(headers)
          const initialMappings: Record<string, string> = {}
          let dateMapped = false
          let descMapped = false
          let amountMapped = false

          headers.forEach((header: string) => {
            const lowerHeader = header.toLowerCase()
            if (lowerHeader.includes('date') && !dateMapped) {
              initialMappings['date'] = header
              dateMapped = true
            } else if (lowerHeader.includes('desc') && !descMapped) {
              initialMappings['description'] = header
              descMapped = true
            } else if (
              (lowerHeader.includes('amount') ||
                lowerHeader.includes('sum') ||
                lowerHeader.includes('total')) &&
              !amountMapped
            ) {
              initialMappings['amount'] = header
              amountMapped = true
            }
          })
          setMappings(initialMappings)
          setError(undefined)
        })
        .catch((error: unknown) => {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to parse CSV file'
          toast.error(errorMessage)
          setError(errorMessage)
        })
    }
  }, [file])

  const handleClose = () => {
    setCsvHeaders([])
    setMappings({})
    setError(undefined)
    onClose()
  }

  const handleMappingChange = (csvColumn: string, reconxiColumn: string) => {
    setMappings((prev) => ({
      ...prev,
      [reconxiColumn]: csvColumn === 'none' ? '' : csvColumn,
    }))
  }

  const handleSubmit = async () => {
    try {
      // Validate required fields are mapped
      const requiredFields = ['date', 'description', 'amount']
      const mappedFields = Object.keys(mappings).filter(
        (value) => mappings[value] !== '' && mappings[value] !== 'none'
      )
      const missingFields = requiredFields.filter(
        (field) => !mappedFields.includes(field)
      )

      if (missingFields.length > 0) {
        throw new Error(
          `The following required fields are not mapped: ${missingFields.join(', ')}`
        )
      }

      onSuccess(mappings)
      handleClose()
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to process CSV mappings'
      toast.error(errorMessage)
      setError(errorMessage)
    }
  }

  const getTooltipText = (field: string) => {
    switch (field) {
      case 'date':
        return 'The transaction date from your bank statement'
      case 'description':
        return 'The transaction description or reference'
      case 'amount':
        return 'The transaction amount (positive for credits, negative for debits)'
      default:
        return ''
    }
  }

  const reconxiColumns = ['date', 'description', 'amount']

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="dark:bg-background dark:border-border rounded-lg p-6 sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="dark:text-foreground text-left text-xl font-semibold">
            Map Bank Statement CSV
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <p className="dark:text-muted-foreground text-sm text-[#344054]">
            Map your CSV columns to match the required fields below.
          </p>

          {file && csvHeaders.length > 0 && (
            <div className="col-span-1 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/50 dark:text-blue-100">
              <p className="font-medium">CSV File Details:</p>
              <p className="mt-1">
                Found {csvHeaders.length} columns: {csvHeaders.join(', ')}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <div className="dark:text-foreground text-sm font-medium">
                Your CSV Data Columns
              </div>
              {!file || csvHeaders.length === 0 ? (
                <div className="dark:bg-background dark:border-border flex h-10 items-center justify-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
                  <span className="dark:text-muted-foreground text-[14px] text-gray-500">
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
                        Object.values(mappings).find(
                          (value) => mappings[reconxiColumn] === value
                        ) || 'none'
                      }
                      onValueChange={(csvColumn) =>
                        handleMappingChange(csvColumn, reconxiColumn)
                      }
                    >
                      <SelectTrigger className="dark:bg-background dark:border-border dark:text-foreground h-10 w-full rounded-md text-[#344054]">
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
                    <ArrowRight
                      className="dark:text-muted-foreground text-[#667085]/80"
                      size={20}
                    />
                  </div>
                ))
              )}
            </div>

            <div className="flex flex-col gap-3">
              <div className="dark:text-foreground text-sm font-medium">
                Required Fields
              </div>
              {reconxiColumns.map((column) => (
                <div
                  key={column}
                  className="dark:bg-background dark:border-border dark:text-foreground flex h-[40px] items-center justify-between rounded-md border border-gray-300 px-3"
                >
                  <span className="text-sm">{column}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="dark:text-muted-foreground h-4 w-4 cursor-help text-[#667085]" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{getTooltipText(column)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="dark:border-border dark:text-foreground border-[#D0D5DD] px-4 py-2 text-[#344054]"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            className="px-4 py-2"
            onClick={handleSubmit}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
