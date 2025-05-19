// UploadBankStatement.tsx
'use client'

import * as React from 'react'
import { z } from 'zod'
import { useFormContext } from 'react-hook-form'
import UploadCard from './UploadCard'
import { CircleAlert } from 'lucide-react'
import { BankStatementCSVMapper } from '../csv-mapper/BankStatementCSVMapper'
import { useState } from 'react'
import { toast } from 'sonner'

export const UploadBankStatementSchema = z.object({
  file: z.instanceof(File, { message: 'Please upload a statement' }),
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
  mapper: z.object({
    date: z.string(),
    description: z.string(),
    amount: z.string()
  })
})

export type UploadBankStatementValues = z.infer<
  typeof UploadBankStatementSchema
>

const UploadBankStatement = () => {
  const { setValue, watch } = useFormContext<UploadBankStatementValues>()
  const [showMappingDialog, setShowMappingDialog] = useState(false)

  const file = watch('file')

  const handleFileSelect = (newFile: File) => {
    setValue('file', newFile, { shouldValidate: true })
    setShowMappingDialog(true)
  }

  const handleFileDelete = () => {
    setValue('file', null as unknown as File, { shouldValidate: true })
  }

  const handleMappingSuccess = (mappings: { date: string, description: string, amount: string }) => {
    toast.success("Values successfully mapped!");
    setValue('mapper', mappings, { shouldValidate: true })
  }

  return (
    <div className="flex flex-col gap-6 text-start">
      <UploadCard
        file={file}
        onFileSelect={handleFileSelect}
        onFileDelete={handleFileDelete}
      />

      <div className="dark:border-border dark:bg-accent flex items-center justify-center gap-3 rounded-xl border border-black/15 bg-[#F9FAFB] p-4">
        <div className="dark:border-border h-fit w-fit shrink-0 rounded-full border border-black/15 p-2.5">
          <CircleAlert className="dark:text-foreground size-5 rotate-180" />
        </div>
        <div className="space-y-1 text-sm">
          <h5 className="dark:text-foreground font-semibold">
            Single Bank Statement Upload
          </h5>
          <p className="dark:text-muted-foreground text-[#475467]">
            Upload your bank statement here. You can add additional bank
            statements in the next step. Once all statements are uploaded,
            you&apos; ll be able to map their columns for reconciliation.
          </p>
        </div>
      </div>

      <BankStatementCSVMapper
        isOpen={showMappingDialog}
        onClose={() => setShowMappingDialog(false)}
        onSuccess={handleMappingSuccess}
        file={file}
      />
    </div>
  )
}

export default UploadBankStatement
