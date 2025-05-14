'use client'

import { useState, useEffect } from 'react'
import { CSVIcon } from '@/components/Icon/Icons'
import AddNewStatement, { FormValues } from './AddNewStatement'
import { useReconciliationStore } from '@/store/reconciliation-store'
import { Trash2 } from 'lucide-react'
import { useBankAccounts } from '@/hooks/useBankAccounts'
import { formatDate } from '@/lib/formatters'
import { BankStatementCSVMapper } from '../csv-mapper/BankStatementCSVMapper'

interface BankStatement {
  id: string
  file: string
  bankAccount: string
  bankName: string
  period: {
    from: string
    to: string
  }
}

const AddBankAccountForm = () => {
  const [bankStatements, setBankStatements] = useState<BankStatement[]>([])
  const [showMappingDialog, setShowMappingDialog] = useState(false)
  const [currentFile, setCurrentFile] = useState<File | null>(null)
  const [currentFormData, setCurrentFormData] = useState<FormValues | null>(
    null
  )
  const { data: bankAccountsResponse } = useBankAccounts()
  const { formState, addBankStatement, removeBankStatement } = useReconciliationStore()

  console.log(formState.bankStatements)

  // Initialize with bank statements from store
  useEffect(() => {
    if (formState.bankStatements.length > 0) {
      const statements = formState.bankStatements.map((statement, index) => {
        const bankAccount = bankAccountsResponse?.data?.find(
          (acc) => acc.id.toString() === statement.bankAccount
        )
        return {
          id: (index + 1).toString(),
          file: statement.file?.name || '',
          bankAccount: statement.bankAccount,
          bankName: bankAccount?.bank_name || 'Unknown Bank',
          period: statement.period,
        }
      })
      setBankStatements(statements)
    }
  }, [formState.bankStatements, bankAccountsResponse?.data])

  const handleSubmit = (data: FormValues) => {
    if (!data.file) return

    setCurrentFile(data.file)
    setCurrentFormData(data)
    setShowMappingDialog(true)
  }

  const handleMappingSuccess = (mappings: Record<string, string>) => {
    if (!currentFile || !currentFormData) return

    // Add to store with mappings
    addBankStatement({
      file: currentFile,
      bankAccount: currentFormData.bankAccount,
      period: currentFormData.period,
      mapper: mappings,
    })

    // Add to local state for UI
    const bankAccount = bankAccountsResponse?.data?.find(
      (acc) => acc.id.toString() === currentFormData.bankAccount
    )

    const newStatement: BankStatement = {
      id: Date.now().toString(),
      file: currentFile.name,
      bankAccount: currentFormData.bankAccount,
      bankName: bankAccount?.bank_name || 'Unknown Bank',
      period: currentFormData.period,
    }

    setBankStatements((prev) => [...prev, newStatement])
    setCurrentFile(null)
    setCurrentFormData(null)
    setShowMappingDialog(false)
  }

  const handleDelete = (id: string) => {
    removeBankStatement(Number(id));
    setBankStatements((prev) => prev.filter((statement) => statement.id !== id))
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="text-muted-foreground">
        <h5>Add a new bank account or continue to reconciliation</h5>
      </div>
      <div className="space-y-3">
        <h6 className="dark:text-foreground font-medium">Uploaded Statement</h6>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {bankStatements.map((data) => (
            <div
              key={data.id}
              className="group border-border bg-muted/50 dark:bg-background relative rounded-xl border px-6 py-5"
            >
              <button
                onClick={() => handleDelete(data.id)}
                className="text-destructive hover:bg-destructive/10 absolute top-3 right-3 hidden rounded-full p-1.5 group-hover:block"
              >
                <Trash2 className="size-4" />
              </button>
              <div className="flex gap-4">
                <div className="mb-3 flex size-8 items-center justify-center rounded-full border-4 border-[#C8FFE6] bg-[#B0F1D4] dark:border-emerald-950 dark:bg-emerald-900">
                  <CSVIcon className="size-4" />
                </div>
                <div>
                  <h5 className="dark:text-foreground font-medium">
                    {data.file}
                  </h5>
                  <p className="text-muted-foreground text-sm">
                    Bank: {data.bankName}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Period: {formatDate(data.period.from)} -{' '}
                    {formatDate(data.period.to)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div
            className={bankStatements.length % 2 === 0 ? 'md:col-span-2' : ''}
          >
            <AddNewStatement
              onSubmit={handleSubmit}
              bankStatements={bankStatements}
            />
          </div>
        </div>
      </div>

      <BankStatementCSVMapper
        isOpen={showMappingDialog}
        onClose={() => {
          setShowMappingDialog(false)
          setCurrentFile(null)
          setCurrentFormData(null)
        }}
        onSuccess={handleMappingSuccess}
        file={currentFile}
      />
    </div>
  )
}

export default AddBankAccountForm
