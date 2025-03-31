import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCardProps } from './types'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { FileUploadIcon } from '../../Icon/Icons'
import { FileItem } from './FileItem'

const MAX_FILE_SIZE = 2

const UploadCard = ({
  title,
  files,
  onFilesSelect,
  onFileDelete,
  existingFiles = [],
}: UploadCardProps) => {
  const [error, setError] = useState<string>('')
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
        setError('')
        onFilesSelect([...files, ...validFiles])
        toast.success(`Successfully uploaded ${validFiles.length} file(s)`)
      }

      if (currentError) {
        setError(currentError)
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
      setError('') // Clear any error message when a file is deleted
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
      <div className="relative h-[370px] rounded-[16px] border-[1.21px] border-[#33333333] lg:w-[500px] xl:w-[620px]">
        <div
          className={cn(
            'flex h-full flex-col gap-[12px] p-3 md:p-[23.5px_47px]'
          )}
        >
          <h2 className="text-base font-semibold sm:text-lg md:text-[19px] lg:text-2xl">
            {title}
          </h2>

          <div
            {...getRootProps()}
            className={cn(
              'h-[224.7px] w-full max-w-full rounded-[12px]',
              'flex flex-col items-center justify-center gap-[12px]',
              isDragging ? 'border-2 border-dashed' : 'cursor-pointer border',
              'border-[#33333380]',
              'mx-auto transition-all duration-200',
              error
                ? 'border-[#C50700]'
                : isDragging
                  ? 'border-[#2F855A] bg-[#2F855A]/5'
                  : 'hover:bg-gray-100'
            )}
          >
            <input {...getInputProps()} />
            <FileUploadIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
            <p className="px-4 text-center text-sm font-medium text-[#4A5568] sm:text-base md:text-lg">
              <span className="mr-2 hidden md:inline">
                Drag & Drop files here or
              </span>
              <span className="cursor-pointer font-semibold text-[#2F855A] underline">
                Choose file
              </span>
            </p>
          </div>

          <div className="mt-auto flex flex-col items-center justify-between gap-2 md:flex-row md:gap-0">
            <p className="text-xs font-light sm:text-sm md:text-base">
              Supported format: CSV
            </p>
            <p className="text-xs font-light sm:text-sm md:text-base">
              Maximum size: {MAX_FILE_SIZE}MB
            </p>
          </div>
        </div>

        {error && (
          <div className="absolute -bottom-6 left-0 text-xs text-[#C50700] sm:text-sm">
            {error}
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
