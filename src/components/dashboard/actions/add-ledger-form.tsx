import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { getSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { submitLedgerEntry } from '@/lib/api'
import { BOOKKEEPING_LEDGER_API_URL } from '@/lib/apiEndpoints'

const formSchema = z.object({
  ledgerType: z.string().min(1, 'Ledger type is required'),
  transactionType: z.string().min(1, 'Transaction type is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.string().min(1, 'Amount is required'),
  bankAccount: z.string().min(1, 'Bank account is required'),
  account: z.string().min(1, 'Account is required'),
})

interface Ledger {
  id: string
  name: string
  description: string
}

interface BankAccount {
  id: number
  bank_name: string
  account_name: string
}

interface TransactionType {
  id: string
  title: string
}

interface AccountCategory {
  id: string
  title: string
  account_name: string
}

interface AddLedgerFormProps {
  onClose: () => void
}

export function AddLedgerForm({ onClose }: AddLedgerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ledgers, setLedgers] = useState<Ledger[]>([])
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>(
    []
  )
  const [accountCategories, setAccountCategories] = useState<AccountCategory[]>(
    []
  )
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ledgerType: '',
      transactionType: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      bankAccount: '',
      account: '',
    },
  })

  // Watch transaction type changes
  const watchedTransactionType = form.watch('transactionType')

  // Fetch initial data (ledgers, bank accounts, transaction types)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const session = await getSession()
        if (!session?.user?.access_token) {
          throw new Error('User not authenticated')
        }

        const headers = {
          Authorization: `Bearer ${session.user.access_token}`,
          Accept: 'application/json',
        }

        // Fetch ledgers, bank accounts, and transaction types
        const [ledgerResponse, bankAccountResponse, transactionTypeResponse] =
          await Promise.all([
            fetch(BOOKKEEPING_LEDGER_API_URL, { headers }),
            fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/bank-accounts`, {
              headers,
            }),
            fetch(
              `${process.env.NEXT_PUBLIC_BASE_API_URL}/me/chart-account-categories`,
              { headers }
            ),
          ])

        const [ledgerData, bankAccountData, transactionTypeData] =
          await Promise.all([
            ledgerResponse.json(),
            bankAccountResponse.json(),
            transactionTypeResponse.json(),
          ])

        if (ledgerResponse.ok && ledgerData.data) {
          setLedgers(ledgerData.data)
        }
        if (bankAccountResponse.ok && bankAccountData.data) {
          setBankAccounts(bankAccountData.data)
        }
        if (transactionTypeResponse.ok && transactionTypeData.data) {
          setTransactionTypes(transactionTypeData.data)
        }
      } catch (error) {
        console.error('Error fetching form data:', error)
        toast.error('Failed to load form data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Fetch account categories when transaction type changes
  useEffect(() => {
    const fetchAccountCategories = async () => {
      if (!watchedTransactionType) {
        setAccountCategories([])
        return
      }

      try {
        const session = await getSession()
        if (!session?.user?.access_token) {
          throw new Error('User not authenticated')
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/chart-accounts?category_type=${watchedTransactionType}`,
          {
            headers: {
              Authorization: `Bearer ${session.user.access_token}`,
              Accept: 'application/json',
            },
          }
        )

        const data = await response.json()
        if (response.ok && data.data) {
          setAccountCategories(data.data)
        } else {
          console.error('Failed to fetch account categories:', data.message)
          setAccountCategories([])
        }
      } catch (error) {
        console.error('Error fetching account categories:', error)
        setAccountCategories([])
      }
    }

    fetchAccountCategories()
  }, [watchedTransactionType])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true)

      // Map the form values to the API expected format
      const ledgerEntryData = {
        ledgerCategory: values.ledgerType, // This should be a ledger ID
        transactionType: values.transactionType, // This should be a transaction type ID
        transactionDate: values.date,
        description: values.description,
        amount: values.amount,
        paidStatus: 'paid', // Default to paid for quick entry
        dueDate: values.date, // Use same date as transaction date for quick entry
        amountPaid: values.amount, // Same as amount for quick entry
        bankAccount: values.bankAccount, // This should be a bank account ID
        account: values.account, // This should be an account category ID
        reference: `Quick Entry - ${new Date().toISOString()}`, // Generate reference
      }

      await submitLedgerEntry(ledgerEntryData)
      toast.success('Ledger entry added successfully!')
      onClose()
    } catch (error) {
      console.error('Error submitting ledger entry:', error)
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to add ledger entry. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-sm text-gray-500">Loading form data...</div>
      </div>
    )
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
          disabled={isSubmitting}
        >
          <option value="">Select ledger type</option>
          {ledgers.map((ledger) => (
            <option key={ledger.id} value={ledger.id}>
              {ledger.name}
            </option>
          ))}
        </select>
        {form.formState.errors.ledgerType && (
          <p className="text-destructive text-sm">
            {form.formState.errors.ledgerType.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="transaction-type" className="text-sm font-medium">
          Transaction Type
        </label>
        <select
          {...form.register('transactionType')}
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm"
          disabled={isSubmitting}
        >
          <option value="">Select transaction type</option>
          {transactionTypes.map((type) => (
            <option key={type.id} value={type.title}>
              {type.title}
            </option>
          ))}
        </select>
        {form.formState.errors.transactionType && (
          <p className="text-destructive text-sm">
            {form.formState.errors.transactionType.message}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
            placeholder="0"
            type="number"
            step="0.01"
            min="0"
            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 pl-8 text-sm"
            disabled={isSubmitting}
          />
        </div>
        {form.formState.errors.amount && (
          <p className="text-destructive text-sm">
            {form.formState.errors.amount.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="bank-account" className="text-sm font-medium">
          Bank Account
        </label>
        <select
          {...form.register('bankAccount')}
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm"
          disabled={isSubmitting}
        >
          <option value="">Select bank account</option>
          {bankAccounts.map((account) => (
            <option key={account.id} value={account.id.toString()}>
              {account.bank_name} - {account.account_name}
            </option>
          ))}
        </select>
        {form.formState.errors.bankAccount && (
          <p className="text-destructive text-sm">
            {form.formState.errors.bankAccount.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="entry-account" className="text-sm font-medium">
          Account Category
        </label>
        <select
          {...form.register('account')}
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm"
          disabled={isSubmitting || !watchedTransactionType}
        >
          <option value="">
            {!watchedTransactionType
              ? 'Select transaction type first'
              : accountCategories.length === 0
                ? 'Loading accounts...'
                : 'Select account category'}
          </option>
          {accountCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title} - {category.account_name}
            </option>
          ))}
        </select>
        {form.formState.errors.account && (
          <p className="text-destructive text-sm">
            {form.formState.errors.account.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Entry...' : 'Add Entry'}
        </Button>
      </div>
    </form>
  )
}
