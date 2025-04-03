import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  ledgerType: z.string().min(1, 'Ledger type is required'),
  entryCategory: z.string().min(1, 'Entry category is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.string().min(1, 'Amount is required'),
  account: z.string().min(1, 'Account is required'),
})

interface AddLedgerFormProps {
  onClose: () => void
}

export function AddLedgerForm({ onClose }: AddLedgerFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ledgerType: '',
      entryCategory: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      account: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    onClose()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
      <div className="space-y-2">
        <label htmlFor="ledger-type" className="text-sm font-medium">
          Ledger Type
        </label>
        <select
          {...form.register('ledgerType')}
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="general">General Ledger</option>
          <option value="vendor">Vendor Ledger</option>
          <option value="customer">Customer Ledger</option>
        </select>
        {form.formState.errors.ledgerType && (
          <p className="text-destructive text-sm">
            {form.formState.errors.ledgerType.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="entry-category" className="text-sm font-medium">
          Entry Category
        </label>
        <select
          {...form.register('entryCategory')}
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="expense">Expense</option>
          <option value="revenue">Revenue</option>
          <option value="asset">Asset</option>
          <option value="liability">Liability</option>
          <option value="equity">Equity</option>
        </select>
        {form.formState.errors.entryCategory && (
          <p className="text-destructive text-sm">
            {form.formState.errors.entryCategory.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="entry-date" className="text-sm font-medium">
          Date
        </label>
        <input
          {...form.register('date')}
          type="date"
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm"
        />
        {form.formState.errors.date && (
          <p className="text-destructive text-sm">
            {form.formState.errors.date.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="entry-description" className="text-sm font-medium">
          Description
        </label>
        <input
          {...form.register('description')}
          placeholder="Enter description"
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm"
        />
        {form.formState.errors.description && (
          <p className="text-destructive text-sm">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="entry-amount" className="text-sm font-medium">
          Amount
        </label>
        <div className="relative">
          <span className="absolute top-1/2 left-3 -translate-y-1/2">₦</span>
          <input
            {...form.register('amount')}
            placeholder="0.00"
            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 pl-8 text-sm"
          />
        </div>
        {form.formState.errors.amount && (
          <p className="text-destructive text-sm">
            {form.formState.errors.amount.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="entry-account" className="text-sm font-medium">
          Account
        </label>
        <select
          {...form.register('account')}
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="cash">Cash</option>
          <option value="bank">Bank</option>
          <option value="accounts-receivable">Accounts Receivable</option>
          <option value="accounts-payable">Accounts Payable</option>
          <option value="sales">Sales Revenue</option>
          <option value="rent">Rent Expense</option>
          <option value="utilities">Utilities Expense</option>
          <option value="salary">Salary Expense</option>
        </select>
        {form.formState.errors.account && (
          <p className="text-destructive text-sm">
            {form.formState.errors.account.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Entry</Button>
      </div>
    </form>
  )
}
