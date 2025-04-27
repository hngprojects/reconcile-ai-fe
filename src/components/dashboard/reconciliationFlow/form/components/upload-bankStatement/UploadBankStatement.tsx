// UploadBankStatement.tsx
'use client'

import * as React from 'react'
import { z } from 'zod'
import { useFormContext } from 'react-hook-form'
import UploadCard from './UploadCard'
import { CircleAlert } from 'lucide-react'

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

export type UploadBankStatementValues = z.infer<
  typeof UploadBankStatementSchema
>

const UploadBankStatement = () => {
  const { setValue, watch } = useFormContext<UploadBankStatementValues>()

  const file = watch('file')

  const handleFileSelect = (newFile: File) => {
    setValue('file', newFile, { shouldValidate: true })
  }

  const handleFileDelete = () => {
    setValue('file', null as unknown as File, { shouldValidate: true })
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
            AI Powered Matchmaking
          </h5>
          <p className="dark:text-muted-foreground text-[#475467]">
            We will scan your bank statement and automatically suggest matches
            with your ledger entries. Our AI will analyze transaction patterns
            to provide the must accurate matches
          </p>
        </div>
      </div>
    </div>
  )
}

export default UploadBankStatement
