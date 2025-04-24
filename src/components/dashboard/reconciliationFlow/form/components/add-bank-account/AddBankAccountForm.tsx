import { useState } from 'react'
import { CSVIcon } from '@/components/Icon/Icons'
import AddNewStatement, { FormValues } from './AddNewStatement'

interface BankStatement {
  id: string
  file: string
  bankAccount: string
  period: {
    from: string
    to: string
  }
}

const AddBankAccountForm = () => {
  const [dummyBankStatement, setDummyBankStatement] = useState<BankStatement[]>(
    [
      {
        id: '1',
        file: 'GTB-Bank Statement.csv',
        bankAccount: 'Main Business Account (GTB)',
        period: {
          from: 'Jan 6, 2025',
          to: 'Feb 6, 2025',
        },
      },
    ]
  )

  const handleSubmit = (data: FormValues) => {
    const newStatement: BankStatement = {
      id: Date.now().toString(),
      file: data.file?.name ?? '',
      bankAccount: data.bankAccount,
      period: {
        from: new Date(data.period.from).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        to: new Date(data.period.to).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      },
    }

    // Update state with new statement
    setDummyBankStatement((prev) => [...prev, newStatement])
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="text-[#475467]">
        <h5>Add a new bank account or continue to reconciliation</h5>
      </div>
      <div className="space-y-3">
        <h6 className="font-medium text-black">Uploaded Statement</h6>
        <div className="grid grid-cols-2 gap-4">
          {dummyBankStatement.map((data) => (
            <div
              key={data.id}
              className="rounded-xl border border-black/15 bg-[#F9FAFB] px-6 py-5"
            >
              <div className="flex gap-4">
                <div className="mb-3 flex size-8 items-center justify-center rounded-full border-4 border-[#C8FFE6] bg-[#B0F1D4]">
                  <CSVIcon className="size-4" />
                </div>
                <div>
                  <h5 className="font-medium text-black">{data.file}</h5>
                  <p className="text-sm text-[#475467]">
                    Bank: {data.bankAccount}
                  </p>
                  <p className="text-sm text-[#475467]">
                    Period: {data.period.from} - {data.period.to}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div
            className={dummyBankStatement.length % 2 === 0 ? 'col-span-2' : ''}
          >
            <AddNewStatement onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBankAccountForm
