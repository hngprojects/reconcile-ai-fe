import * as React from 'react'
import { z } from 'zod'
import { useFormContext } from 'react-hook-form'
import UploadCard from './UploadCard'
import { CircleAlert } from 'lucide-react'

export const UploadBankStatementSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .min(1, 'Please upload at least one statement')
    .default([]),
})

type UploadBankStatementValues = z.infer<typeof UploadBankStatementSchema>

const UploadBankStatement = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<UploadBankStatementValues>()

  const files = watch('files') || []

  const handleFilesSelect = (newFiles: File[]) => {
    setValue('files', [...files, ...newFiles], { shouldValidate: true })
  }

  const handleFileDelete = (fileName: string) => {
    setValue(
      'files',
      files.filter((file) => file.name !== fileName),
      { shouldValidate: true }
    )
  }

  return (
    <div className="flex flex-col gap-6 text-start">
      {/* File Upload Section */}
      <UploadCard
        type="bank"
        title="Upload your bank statement to start the reconciliation process."
        files={files}
        error={errors.files?.message}
        onFilesSelect={handleFilesSelect}
        onFileDelete={handleFileDelete}
      />

      <div className="flex items-center justify-center gap-3 rounded-xl border border-black/15 bg-[#F9FAFB] p-4">
        <div className="h-fit w-fit shrink-0 rounded-full border border-black/15 p-2.5">
          <CircleAlert className="size-5 rotate-180" />
        </div>
        <div className="space-y-1 text-sm">
          <h5 className="font-semibold">AI Powered Matchmaking</h5>
          <p className="text-[#475467]">
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
