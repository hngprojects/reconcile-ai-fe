import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCardProps } from '@/types/uploadLedger'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { FileUploadIcon } from '@/components/Icon/Icons'
import { FileItem } from './FileItem'
import DateRange from './DateRange'

const MAX_FILE_SIZE = 2

const UploadCard = ({
  title,
  files,
  error,
  onFilesSelect,
  onFileDelete,
  existingFiles = [],
}: UploadCardProps) => {
  const [internalError, setInternalError] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = useCallback(
    (newFiles: File[]) => {
      const validFiles: File[] = []
      let currentError = ''

      for (const file of newFiles) {
        // Basic validations
        if (!file.name.endsWith('.csv')) {
          currentError = 'Only CSV files are supported'
          continue
        }

        const fileSizeInMB = file.size / (1024 * 1024)
        if (fileSizeInMB > MAX_FILE_SIZE) {
          currentError = `File size must be less than ${MAX_FILE_SIZE}MB`
          continue
        }

        // Check for duplicate file in the same card
        if (files.some((existingFile) => existingFile.name === file.name)) {
          currentError = 'Duplicate files detected'
          continue
        }

        // Check for duplicate file in the other card
        if (existingFiles.includes(file.name)) {
          currentError = 'Some files are already used in the other section'
          continue
        }

        validFiles.push(file)
      }

      if (validFiles.length > 0) {
        setInternalError('')
        onFilesSelect([...files, ...validFiles])
        toast.success(`Successfully uploaded ${validFiles.length} file(s)`)
      }

      if (currentError) {
        setInternalError(currentError)
      }
    },
    [existingFiles, files, onFilesSelect]
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragging(false)
      handleFiles(acceptedFiles)
    },
    [handleFiles]
  )

  // remove error when file is removed
  const handleFileDelete = useCallback(
    (fileName: string) => {
      setInternalError('') // Clear any error message when a file is deleted
      onFileDelete(fileName)
    },
    [onFileDelete]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-fit w-full">
        <div className={cn('mt-2 flex h-full flex-col gap-5')}>
          <div className="flex items-center justify-between">
            <h5 className="text-[#475467]">{title}</h5>
            <DateRange />
          </div>

          <div
            {...getRootProps()}
            className={cn(
              'flex h-[224px] w-full max-w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-[#33333350] transition-all duration-200 hover:bg-gray-100',
              error || internalError
                ? 'border-[#C50700]'
                : isDragging
                  ? 'border-[#2F855A] bg-[#2F855A]/5'
                  : 'hover:bg-gray-100'
            )}
          >
            <input {...getInputProps()} />
            <FileUploadIcon className="h-8 w-8 text-[#678E82] sm:h-10 sm:w-10" />
            <p className="px-4 text-center text-[#475569]">
              <span className="mr-2 hidden md:inline">
                Drag & Drop files here or
              </span>
              <span className="text-primary cursor-pointer font-semibold underline">
                Choose file
              </span>
            </p>
            <p className="text-sm font-light text-[#333]">
              Supported format: CSV
            </p>
          </div>
        </div>

        {(error || internalError) && (
          <div className="text-xs text-[#C50700] sm:text-sm">
            {error || internalError}
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-8 flex flex-col gap-4">
          {files.map((file) => (
            <FileItem key={file.name} file={file} onDelete={handleFileDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default UploadCard
