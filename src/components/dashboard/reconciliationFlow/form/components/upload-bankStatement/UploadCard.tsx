// UploadCard.tsx
'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { DeleteIcon, FileUploadIcon } from '@/components/Icon/Icons'
import DateRange from './DateRange'
import BankAccountSelect from './BankAccountSelect'
import { FieldError, useFormContext } from 'react-hook-form'
import { UploadBankStatementValues } from './UploadBankStatement'

const MAX_FILE_SIZE = 2

export type FormErrors = {
  bankAccount?: FieldError
  period?: {
    from?: FieldError
    to?: FieldError
  } & FieldError
  file?: FieldError
}

const UploadCard = ({
  file,
  onFileSelect,
  onFileDelete,
}: {
  file?: File
  onFileSelect: (file: File) => void
  onFileDelete: () => void
}) => {
  const [internalError, setInternalError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const {
    formState: { errors },
  } = useFormContext<UploadBankStatementValues>()
  const typedErrors = errors as FormErrors

  const handleFile = useCallback(
    (newFile: File) => {
      let currentError = ''

      if (!newFile.name.endsWith('.csv')) {
        currentError = 'Only CSV files supported'
      } else if (newFile.size / (1024 * 1024) > MAX_FILE_SIZE) {
        currentError = `File must be < ${MAX_FILE_SIZE}MB`
      }

      if (!currentError) {
        setInternalError('')
        onFileSelect(newFile)
        toast.success(`Uploaded: ${newFile.name}`)
      } else {
        setInternalError(currentError)
      }
    },
    [onFileSelect]
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragging(false)
      if (acceptedFiles[0]) handleFile(acceptedFiles[0])
    },
    [handleFile]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  })

  return (
    <div className="dark:bg-background flex flex-col gap-4">
      <div className="relative h-fit w-full">
        <div className="mt-2 flex h-full flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <h5 className="dark:text-foreground mt-2 text-[#475467]">
              Upload bank statement
            </h5>
            <div className="flex items-start gap-3">
              <div className="flex flex-col">
                <BankAccountSelect />
                {typedErrors.bankAccount?.message && (
                  <span className="text-destructive dark:text-destructive-foreground mt-1 text-xs">
                    {typedErrors.bankAccount.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <DateRange />
                {typedErrors.period && (
                  <span className="text-destructive dark:text-destructive-foreground mt-1 text-xs">
                    {typedErrors.period.from?.message ||
                      typedErrors.period.to?.message ||
                      typedErrors.period.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {!file ? (
            <div
              {...getRootProps()}
              className={cn(
                'flex h-[224px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-dashed transition-all',
                errors.file || internalError
                  ? 'border-destructive dark:border-destructive'
                  : isDragging
                    ? 'border-primary bg-primary/5 dark:border-primary dark:bg-primary/5'
                    : 'hover:bg-accent dark:border-border dark:hover:bg-accent border-[#33333350]'
              )}
            >
              <input {...getInputProps()} />
              <FileUploadIcon className="dark:text-foreground/60 h-10 w-10 text-[#678E82]" />
              <div className="text-center">
                <p className="dark:text-foreground text-base font-semibold">
                  Upload bank account statement
                </p>
                <p className="dark:text-muted-foreground text-sm text-[#475467]">
                  Drop your file here or{' '}
                  <span className="text-primary font-semibold underline">
                    browse
                  </span>
                </p>
                <p className="dark:text-muted-foreground text-sm text-[#475467]">
                  CSV only (max 2mb)
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-background dark:border-border dark:bg-background relative flex h-[224px] items-center justify-center rounded-[10px] border border-[#33333350] p-4">
              <div className="flex flex-col items-center gap-2">
                <FileUploadIcon className="dark:text-foreground/60 h-10 w-10 text-[#678E82]" />
                <span className="dark:text-foreground font-medium">
                  {file.name}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onFileDelete()
                }}
                className="dark:hover:bg-destructive/10 absolute top-3 right-3 cursor-pointer rounded-full p-2 hover:bg-red-50"
              >
                <DeleteIcon className="text-destructive dark:text-destructive-foreground h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {(errors.file?.message || internalError) && (
          <span className="text-destructive dark:text-destructive-foreground text-sm">
            {(errors.file?.message as string) || internalError}
          </span>
        )}
      </div>
    </div>
  )
}

export default UploadCard
