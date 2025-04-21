// UploadCard.tsx
'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { DeleteIcon, FileUploadIcon } from '@/components/Icon/Icons'
import DateRange from './DateRange'
import AccountType from './AccountType'
import { FieldError, useFormContext } from 'react-hook-form'
import { UploadBankStatementValues } from './UploadBankStatement'

const MAX_FILE_SIZE = 2

type FormErrors = {
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
    <div className="flex flex-col gap-4">
      <div className="relative h-fit w-full">
        <div className="mt-2 flex h-full flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <h5 className="mt-2 text-[#475467]">Upload bank statement</h5>
            <div className="flex items-start gap-3">
              <div className="flex flex-col">
                <AccountType />
                {typedErrors.bankAccount?.message && (
                  <span className="mt-1 text-xs text-red-600">
                    {typedErrors.bankAccount.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <DateRange />
                {typedErrors.period && (
                  <span className="mt-1 text-xs text-red-600">
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
                  ? 'border-[#C50700]'
                  : isDragging
                    ? 'border-[#2F855A] bg-[#2F855A]/5'
                    : 'border-[#33333350] hover:bg-gray-100'
              )}
            >
              <input {...getInputProps()} />
              <FileUploadIcon className="h-10 w-10 text-[#678E82]" />
              <p className="text-center text-[#475569]">
                Drag & drop file or{' '}
                <span className="text-primary font-semibold underline">
                  choose file
                </span>
              </p>
              <p className="text-sm font-light text-[#333]">
                Supported format: CSV
              </p>
            </div>
          ) : (
            <div className="relative flex h-[224px] items-center justify-center rounded-[10px] border border-[#33333350] bg-white p-4">
              <div className="flex flex-col items-center gap-2">
                <FileUploadIcon className="h-10 w-10 text-[#678E82]" />
                <span className="font-medium">{file.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onFileDelete()
                }}
                className="absolute top-3 right-3 cursor-pointer rounded-full p-2 hover:bg-red-50"
              >
                <DeleteIcon className="h-5 w-5 text-red-600" />
              </button>
            </div>
          )}
        </div>
        {(errors.file?.message || internalError) && (
          <span className="text-sm text-red-600">
            {(errors.file?.message as string) || internalError}
          </span>
        )}
      </div>
    </div>
  )
}

export default UploadCard
