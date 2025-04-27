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
import DateRange from './DateRange'
import { Plus } from 'lucide-react'
import BankAccountSelect from './BankAccountSelect'
import { BankStatementCSVMapper } from '../csv-mapper/BankStatementCSVMapper'

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
        if (!data.from || !data.to) return true
        return new Date(data.to) >= new Date(data.from)
      },
      {
        message: 'End date must be after start date',
        path: ['to'],
      }
    )
    .default({}),
  mapper: z.record(z.string()).optional(),
})

export type FormValues = z.infer<typeof AddNewStatementSchema>

const MAX_FILE_SIZE = 2 // MB

interface AddNewStatementProps {
  onSubmit: (data: FormValues) => void
  bankStatements: Array<{ bankAccount: string }>
}

const AddNewStatement = ({
  onSubmit,
  bankStatements,
}: AddNewStatementProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showMapper, setShowMapper] = useState(false)
  const [formData, setFormData] = useState<FormValues | null>(null)

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
    // Check if bank account is already added
    if (bankStatements.some((stmt) => stmt.bankAccount === data.bankAccount)) {
      toast.error('This bank account has already been added')
      return
    }

    setFormData(data)
    setShowMapper(true)
  }

  const handleMapperSuccess = (mappings: Record<string, string>) => {
    if (formData) {
      onSubmit({
        ...formData,
        mapper: mappings,
      })
      setIsOpen(false)
      setShowMapper(false)
      setFormData(null)
      form.reset()
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
    setShowMapper(false)
    setFormData(null)
    reset()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="bg-muted/50 hover:bg-muted/70 dark:bg-background dark:hover:bg-accent/50 flex size-full min-h-[105px] cursor-pointer items-center justify-center rounded-xl">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="border-border bg-background dark:bg-muted rounded-full border p-2">
                <Plus className="text-muted-foreground size-4" />
              </div>
              <div className="text-muted-foreground text-sm">
                Add Bank statement
              </div>
            </div>
          </button>
        </DialogTrigger>

        <DialogContent className="dark:bg-background sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="dark:text-foreground">
              Upload New Bank Statement
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                {/* Bank Account Selection */}
                <div className="flex flex-col items-start gap-1.5">
                  <label className="dark:text-foreground text-sm font-medium">
                    Bank Account
                  </label>
                  <div className="w-full">
                    <BankAccountSelect form={form} />
                    {errors.bankAccount && (
                      <span className="text-destructive text-sm">
                        {errors.bankAccount.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Date Range Picker */}
                <div className="flex flex-col items-start gap-1.5">
                  <label className="dark:text-foreground text-sm font-medium">
                    Statement Period
                  </label>
                  <div className="w-full">
                    <DateRange form={form} />
                    {(errors.period?.from ||
                      errors.period?.to ||
                      errors.period?.message) && (
                      <span className="text-destructive text-sm">
                        {errors.period?.from?.message ||
                          errors.period?.to?.message ||
                          errors.period?.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* File Upload */}
                <div className="flex flex-col gap-2">
                  <label className="dark:text-foreground text-sm font-medium">
                    Upload Statement (CSV)
                  </label>
                  {!file ? (
                    <div
                      {...getRootProps()}
                      className={cn(
                        'dark:bg-background flex h-[224px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-dashed transition-all',
                        errors.file
                          ? 'border-destructive'
                          : isDragActive
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:bg-accent/50'
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
                    <div className="border-border bg-background relative flex h-[224px] items-center justify-center rounded-[10px] border p-4">
                      <div className="flex flex-col items-center gap-2">
                        <FileUploadIcon className="text-primary h-10 w-10" />
                        <span className="dark:text-foreground font-medium">
                          {file.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setValue('file', null, {
                            shouldValidate: true,
                          })
                        }
                        className="hover:bg-destructive/10 absolute top-3 right-3 cursor-pointer rounded-full p-2"
                      >
                        <DeleteIcon className="text-destructive h-5 w-5" />
                      </button>
                    </div>
                  )}
                  {errors.file && (
                    <span className="text-destructive text-sm">
                      {errors.file.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="dark:border-border w-1/2 cursor-pointer"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button className="w-1/2 cursor-pointer" type="submit">
                  Save
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <BankStatementCSVMapper
        isOpen={showMapper}
        onClose={() => {
          setShowMapper(false)
          setFormData(null)
        }}
        onSuccess={handleMapperSuccess}
        file={formData?.file || null}
      />
    </>
  )
}

export default AddNewStatement
