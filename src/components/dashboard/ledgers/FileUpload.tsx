import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { FileUploadIcon, DeleteIcon, CSVIcon } from '@/components/Icon/Icons'

interface FileUploadProps {
  file?: File
  onFileSelect: (file: File) => void
  onFileDelete: () => void
  children?: React.ReactNode
  accept?: string
  maxSize?: number
  error?: string
}

const FileUpload: React.FC<FileUploadProps> = ({
  file,
  onFileSelect,
  onFileDelete,
  children,
  accept = '.csv',
  maxSize = 2,
  error,
}) => {
  const [internalError, setInternalError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = useCallback(
    (newFile: File) => {
      let currentError: string | null = null

      if (!newFile.name.toLowerCase().endsWith('.csv')) {
        currentError = 'Only CSV files are supported'
      } else if (newFile.size / (1024 * 1024) > maxSize) {
        currentError = `File size must be less than ${maxSize}MB`
      }

      if (!currentError) {
        setInternalError(null)
        onFileSelect(newFile)
        toast.success(`Uploaded: ${newFile.name}`)
      } else {
        setInternalError(currentError)
      }
    },
    [onFileSelect, maxSize]
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
    accept: {
      [accept.startsWith('.') ? `text/${accept.slice(1)}` : accept]: [accept],
    },
    multiple: false,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  })

  return (
    <div className="flex flex-col gap-4">
      {children}
      <div className="relative h-fit w-full">
        {!file ? (
          <div
            {...getRootProps()}
            className={cn(
              'flex h-[224px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-dashed transition-all',
              error || internalError
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
              Supported format: CSV (max {maxSize}MB)
            </p>
          </div>
        ) : (
          <div className="relative flex h-[224px] items-center justify-center rounded-[10px] border border-[#33333350] bg-white p-4">
            <div className="flex flex-col items-center gap-2">
              <CSVIcon className="h-10 w-10 text-[#678E82]" />
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
      {(error || internalError) && (
        <span className="text-sm text-red-600">{error || internalError}</span>
      )}
    </div>
  )
}

export default FileUpload
