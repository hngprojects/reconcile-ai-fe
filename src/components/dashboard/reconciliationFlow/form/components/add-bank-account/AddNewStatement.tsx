// AddNewStatement.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DeleteIcon, FileUploadIcon } from '@/components/Icon/Icons'
import AccountType from './AccountType'
import DateRange from './DateRange'
import { Plus } from 'lucide-react'

export const AddNewStatementSchema = z.object({
  file: z.instanceof(File, { message: 'Please upload a statement' }).nullable(),
  bankAccount: z.string().min(1, 'Please select a bank account').default(''),
  period: z
    .object({
      from: z.string().min(1, 'Please select a Period').default(''),
      to: z.string().min(1, 'End date is required').default(''),
    })
    .refine(
      (data) => {
        if (!data.from || !data.to) return true // Let base validation handle empty fields
        return new Date(data.to) >= new Date(data.from)
      },
      {
        message: 'End date must be after start date',
        path: ['to'],
      }
    )
    .default({}),
})

export type FormValues = z.infer<typeof AddNewStatementSchema>

const MAX_FILE_SIZE = 2 // MB

interface AddNewStatementProps {
  onSubmit: (data: FormValues) => void
}

const AddNewStatement = ({ onSubmit }: AddNewStatementProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(AddNewStatementSchema),
    defaultValues: {
      bankAccount: '',
      period: { from: '', to: '' },
      file: undefined,
    },
  })

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form
  const file = watch('file')

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      if (!file.name.endsWith('.csv')) {
        toast.error('Only CSV files supported')
        return
      }

      if (file.size / (1024 * 1024) > MAX_FILE_SIZE) {
        toast.error(`File must be less than ${MAX_FILE_SIZE}MB`)
        return
      }

      setValue('file', file, { shouldValidate: true })
      toast.success(`Uploaded: ${file.name}`)
    },
    [setValue]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
  })

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data)
    setIsOpen(false)
    reset()
  }

  const handleCancel = () => {
    setIsOpen(false)
    reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex size-full min-h-[105px] cursor-pointer items-center justify-center rounded-xl bg-[#F9FAFB]/80 hover:bg-gray-100/70">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="rounded-full border border-black/15 bg-[#FEFEFE] p-2">
              <Plus className="size-4 text-black/30" />
            </div>
            <div className="text-sm text-black/30">Add Bank statement</div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Upload New Bank Statement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              {/* Bank Account Selection */}
              <div className="flex flex-col items-start gap-1.5">
                <label className="text-sm font-medium text-[#344054]">
                  Bank Account
                </label>
                <div className="w-full">
                  <AccountType form={form} />
                  {errors.bankAccount && (
                    <span className="text-sm text-red-500">
                      {errors.bankAccount.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Date Range Picker */}
              <div className="flex flex-col items-start gap-1.5">
                <label className="text-sm font-medium text-[#344054]">
                  Statement Period
                </label>
                <div className="w-full">
                  <DateRange form={form} />
                  {(errors.period?.from ||
                    errors.period?.to ||
                    errors.period?.message) && (
                    <span className="text-sm text-red-500">
                      {errors.period?.from?.message ||
                        errors.period?.to?.message ||
                        errors.period?.message}
                    </span>
                  )}
                </div>
              </div>

              {/* File Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#344054]">
                  Attachment (Optional)
                </label>
                {!file ? (
                  <div
                    {...getRootProps()}
                    className={cn(
                      'flex h-[224px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-dashed transition-all',
                      errors.file
                        ? 'border-[#C50700]'
                        : isDragActive
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
                      type="button"
                      onClick={() =>
                        setValue('file', null, {
                          shouldValidate: true,
                        })
                      }
                      className="absolute top-3 right-3 cursor-pointer rounded-full p-2 hover:bg-red-50"
                    >
                      <DeleteIcon className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                )}
                {errors.file && (
                  <span className="text-sm text-red-500">
                    {errors.file.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <Button
                size="lg"
                type="button"
                variant="outline"
                className="w-1/2 cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                size="lg"
                onClick={handleSubmit(handleFormSubmit)}
                className="w-1/2 cursor-pointer"
                type="button"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewStatement
