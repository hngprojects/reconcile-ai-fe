'use client'
import React, { useReducer, useCallback, useState, useEffect } from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import { BOOKKEEPING_LEDGER_API_URL } from '@/lib/apiEndpoints'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import FileUpload from '../FileUpload'
import { getSession } from 'next-auth/react'
import { submitLedgerEntry } from '@/lib/api'
import { useReconciliationStore } from '@/store/reconciliation-store'
import { get_reconcilation_results_by_id } from '@/actions/reconcilation-server'

// Zod schema for form validation
const ledgerEntrySchema = z.object({
  ledgerCategory: z.string().min(1, 'Ledger category is required'),
  transactionType: z.string().min(1, 'Transaction type is required'),
  transactionDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Transaction date is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Amount must be a valid number (e.g., 100.00)'),
  paidStatus: z.string().min(1, 'Paid status is required'),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Due date is required'),
  amountPaid: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      'Amount paid must be a valid number (e.g., 100.00)'
    ),
  bankAccount: z.string().min(1, 'Bank account is required'),
  account: z.string().min(1, 'Account category is required'),
  reference: z.string().optional(),
  attachment: z.instanceof(File).optional(),
})

// Interfaces for data structures
interface Ledger {
  id: string
  name: string
  description: string
}

interface BankAccount {
  id: number
  bank_name: string
}

interface AccountCategory {
  id: string
  title: string
  account_name: string
}

interface TransactionType {
  id: string
  title: string
}

interface LedgerEntryData {
  ledgerCategory: string
  transactionType: string
  transactionDate: string
  description: string
  amount: string
  paidStatus: string
  dueDate: string
  amountPaid: string
  bankAccount: string
  account: string
  reference?: string
  attachment?: File
}

interface AddLedgerEntryProps {
  isOpen: boolean
  onClose: () => void
  statementId?: string
}

// Form reducer actions
type FormAction =
  | {
      type: 'UPDATE_FIELD'
      field: keyof LedgerEntryData
      value: string | File | undefined
    }
  | { type: 'RESET' }

// Initial form state
const initialState: LedgerEntryData = {
  ledgerCategory: '',
  transactionType: '',
  transactionDate: '',
  description: '',
  amount: '',
  paidStatus: 'paid',
  dueDate: '',
  amountPaid: '',
  bankAccount: '',
  account: '',
  reference: '',
  attachment: undefined,
}

// Form reducer
const formReducer = (
  state: LedgerEntryData,
  action: FormAction
): LedgerEntryData => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export const AddLedgerEntryModal: React.FC<AddLedgerEntryProps> = ({
  isOpen,
  onClose,
  statementId,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [errors, setErrors] = useState<
    Partial<Record<keyof LedgerEntryData, string>>
  >({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ledgers, setLedgers] = useState<Ledger[]>([])
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
  const [accountCategories, setAccountCategories] = useState<AccountCategory[]>(
    []
  )
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>(
    []
  )
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<string>('')
  const [isLoading, setIsLoading] = useState({
    ledgers: false,
    bankAccounts: false,
    transactionTypes: false,
    accountCategories: false,
  })
  const { formState, updateFormState } = useReconciliationStore()

  const steps = [
    { step: 1, title: 'Basic Info' },
    { step: 2, title: 'Payment Info' },
    { step: 3, title: 'Categorization' },
  ]

  // Fetch initial data (ledgers, bank accounts, transaction types)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const session = await getSession()
        if (!session?.user.access_token) {
          throw new Error('User not authenticated')
        }

        const headers = {
          Authorization: `Bearer ${session.user.access_token}`,
          Accept: 'application/json',
        }

        setIsLoading((prev) => ({
          ...prev,
          ledgers: true,
          bankAccounts: true,
          transactionTypes: true,
        }))

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

        if (!ledgerResponse.ok) {
          throw new Error(ledgerData.message || 'Failed to fetch ledgers')
        }
        if (!bankAccountResponse.ok) {
          throw new Error(
            bankAccountData.message || 'Failed to fetch bank accounts'
          )
        }
        if (!transactionTypeResponse.ok) {
          throw new Error(
            transactionTypeData.message || 'Failed to fetch transaction types'
          )
        }

        setLedgers(ledgerData.data)
        setBankAccounts(bankAccountData.data)
        setTransactionTypes(transactionTypeData.data)
      } catch (err) {
        toast.error('Failed to load initial data. Please try again.')
        console.error('Error fetching initial data:', err)
      } finally {
        setIsLoading((prev) => ({
          ...prev,
          ledgers: false,
          bankAccounts: false,
          transactionTypes: false,
        }))
      }
    }

    if (isOpen) {
      fetchInitialData()
    }
  }, [isOpen])

  // Fetch account categories when transaction type changes
  useEffect(() => {
    const fetchAccountCategories = async () => {
      if (!selectedTransactionType) return

      try {
        const session = await getSession()
        if (!session?.user.access_token) {
          throw new Error('User not authenticated')
        }

        setIsLoading((prev) => ({ ...prev, accountCategories: true }))

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/chart-accounts?category_type=${selectedTransactionType}`,
          {
            headers: {
              Authorization: `Bearer ${session.user.access_token}`,
              Accept: 'application/json',
            },
          }
        )

        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch account categories')
        }

        setAccountCategories(data.data)
      } catch (err) {
        toast.error('Failed to load account categories.')
        console.error('Error fetching account categories:', err)
      } finally {
        setIsLoading((prev) => ({ ...prev, accountCategories: false }))
      }
    }

    fetchAccountCategories()
  }, [selectedTransactionType])

  // Validate form step
  const validateStep = (step: number): boolean => {
    const fieldsToValidate: (keyof LedgerEntryData)[] =
      step === 1
        ? [
            'ledgerCategory',
            'transactionType',
            'transactionDate',
            'description',
            'amount',
          ]
        : step === 2
          ? ['paidStatus', 'dueDate', 'amountPaid', 'bankAccount']
          : ['account', 'reference', 'attachment']

    const stepData = Object.fromEntries(
      fieldsToValidate.map((field) => [field, state[field]])
    )

    try {
      ledgerEntrySchema.partial().parse(stepData)
      setErrors((prev) => {
        const newErrors = { ...prev }
        fieldsToValidate.forEach((field) => delete newErrors[field])
        return newErrors
      })
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce(
          (acc, err) => ({ ...acc, [err.path[0]]: err.message }),
          {}
        )
        setErrors((prev) => ({ ...prev, ...newErrors }))
        toast.error('Please fix the errors before proceeding.')
      }
      return false
    }
  }

  // Handle form field changes
  const handleChange = useCallback(
    (field: keyof LedgerEntryData, value: string | File | undefined) => {
      dispatch({ type: 'UPDATE_FIELD', field, value })
      if (field === 'transactionType') {
        setSelectedTransactionType(value as string)
      }
    },
    []
  )

  // Navigate to next step
  const nextStep = () => {
    if (validateStep(currentStep)) setCurrentStep(currentStep + 1)
  }

  // Navigate to previous step
  const prevStep = () => setCurrentStep(currentStep - 1)

  // Handle form submission
  const handleSave = async () => {
    if (!validateStep(currentStep)) return

    try {
      setIsSubmitting(true)
      const dataToSubmit = {
        ...state,
        reference: state.reference || '',
        ...(statementId ? { id: statementId } : {}),
      }

      await submitLedgerEntry(dataToSubmit)

      // If this is part of reconciliation flow, fetch updated results
      if (formState.reconciliation_id) {
        const response = await get_reconcilation_results_by_id(
          formState.reconciliation_id
        )
        if (response.success && response.data) {
          updateFormState({
            results: response.data,
            summary: response.data.summary,
          })
        }
      }

      toast.success('Ledger entry saved successfully!')
      handleClose()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce(
          (acc, err) => ({ ...acc, [err.path[0]]: err.message }),
          {}
        )
        setErrors(newErrors)
        toast.error('Please fix all errors before saving.')
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Failed to save ledger entry.'
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle modal close
  const handleClose = () => {
    dispatch({ type: 'RESET' })
    setCurrentStep(1)
    setErrors({})
    setSelectedTransactionType('')
    setAccountCategories([])
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="custom-scrollbar dark:border-primary/40 max-h-[85vh] overflow-y-auto rounded-lg p-6 sm:max-w-[550px] dark:bg-[#1A1A1A] dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-left text-xl font-semibold text-gray-800 dark:text-white">
            Add Ledger Entry
          </DialogTitle>
        </DialogHeader>

        <div className="my-4">
          <p className="mb-2 text-sm text-[#344054] dark:text-gray-300">
            Step {currentStep} of 3:{' '}
            {steps.find((s) => s.step === currentStep)?.title}
          </p>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-[#262626]">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 dark:bg-white"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {currentStep === 1 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#344054] dark:text-white">
                  Ledger Category
                </Label>
                <Select
                  value={state.ledgerCategory}
                  onValueChange={(value) =>
                    handleChange('ledgerCategory', value)
                  }
                  disabled={isLoading.ledgers}
                >
                  <SelectTrigger className="dark:border-primary/40 w-full rounded-md border-gray-300 text-[#344054] dark:bg-[#1A1A1A] dark:text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="dark:border-primary/40 dark:bg-[#1A1A1A]">
                    {ledgers.length > 0 ? (
                      ledgers.map((ledger) => (
                        <SelectItem key={ledger.id} value={ledger.id}>
                          {ledger.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No ledgers found</div>
                    )}
                  </SelectContent>
                </Select>
                {errors.ledgerCategory && (
                  <span className="text-sm text-red-500 dark:text-red-300">
                    {errors.ledgerCategory}
                  </span>
                )}
              </div>

              {/* Transaction Type */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#344054] dark:text-white">
                  Transaction Type
                </Label>
                <Select
                  value={state.transactionType}
                  onValueChange={(value) =>
                    handleChange('transactionType', value)
                  }
                  disabled={isLoading.transactionTypes}
                >
                  <SelectTrigger className="dark:border-primary/40 w-full rounded-md border-gray-300 text-[#344054] dark:bg-[#1A1A1A] dark:text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="dark:border-primary/40 dark:bg-[#1A1A1A]">
                    {transactionTypes.length > 0 ? (
                      transactionTypes.map((transactionType) => (
                        <SelectItem
                          key={transactionType.id}
                          value={transactionType.title}
                        >
                          {transactionType.title}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">
                        No transaction types found
                      </div>
                    )}
                  </SelectContent>
                </Select>
                {errors.transactionType && (
                  <span className="text-sm text-red-500 dark:text-red-300">
                    {errors.transactionType}
                  </span>
                )}
              </div>

              {/* Transaction Date */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#344054] dark:text-white">
                  Transaction Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'dark:border-primary/40 w-full justify-start rounded-md border-gray-300 text-left font-normal text-[#344054] dark:bg-[#1A1A1A] dark:text-gray-300',
                        !state.transactionDate &&
                          'text-gray-400 dark:text-gray-500'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#344054] dark:text-gray-400" />
                      {state.transactionDate
                        ? format(new Date(state.transactionDate), 'PPP')
                        : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="dark:border-primary/40 w-auto p-0 dark:bg-[#1A1A1A] dark:text-white">
                    <Calendar
                      mode="single"
                      selected={
                        state.transactionDate
                          ? new Date(state.transactionDate)
                          : undefined
                      }
                      onSelect={(date) =>
                        handleChange(
                          'transactionDate',
                          date ? format(date, 'yyyy-MM-dd') : ''
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.transactionDate && (
                  <span className="text-sm text-red-500 dark:text-red-400">
                    {errors.transactionDate}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#344054] dark:text-white">
                  Description
                </Label>
                <Input
                  placeholder="Short summary of transaction"
                  value={state.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="dark:border-primary/40 rounded-md border-gray-300 text-[#344054] dark:bg-[#1A1A1A] dark:text-white dark:placeholder-gray-400"
                />
                {errors.description && (
                  <span className="text-sm text-red-500 dark:text-red-400">
                    {errors.description}
                  </span>
                )}
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#344054] dark:text-white">
                  Amount
                </Label>
                <Input
                  placeholder="₦ 0.00"
                  value={state.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                  className="dark:border-primary/40 rounded-md border-gray-300 text-[#344054] dark:bg-[#1A1A1A] dark:text-white dark:placeholder-gray-400"
                />
                {errors.amount && (
                  <span className="text-sm text-red-500 dark:text-red-400">
                    {errors.amount}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#344054] dark:text-white">
                  Paid Status
                </Label>
                <Select
                  value={state.paidStatus}
                  onValueChange={(value) => handleChange('paidStatus', value)}
                >
                  <SelectTrigger className="dark:border-primary/40 w-full rounded-md border-gray-300 text-[#344054] dark:bg-[#1A1A1A] dark:text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="dark:border-primary/40 dark:bg-[#1A1A1A]">
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
                {errors.paidStatus && (
                  <span className="text-sm text-red-500 dark:text-red-400">
                    {errors.paidStatus}
                  </span>
                )}
              </div>

              {/* Due Date */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#344054] dark:text-white">
                  Due Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'dark:border-primary/40 w-full justify-start rounded-md border-gray-300 text-left font-normal text-[#344054] dark:bg-gray-800 dark:text-gray-300',
                        !state.dueDate && 'text-gray-400 dark:text-gray-500'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#344054] dark:text-gray-400" />
                      {state.dueDate
                        ? format(new Date(state.dueDate), 'PPP')
                        : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="dark:border-primary/40 w-auto p-0 dark:bg-[#1A1A1A] dark:text-white">
                    <Calendar
                      mode="single"
                      selected={
                        state.dueDate ? new Date(state.dueDate) : undefined
                      }
                      onSelect={(date) =>
                        handleChange(
                          'dueDate',
                          date ? format(date, 'yyyy-MM-dd') : ''
                        )
                      }
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.dueDate && (
                  <span className="text-sm text-red-500 dark:text-red-400">
                    {errors.dueDate}
                  </span>
                )}
              </div>

              {/* Amount Paid */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#344054] dark:text-white">
                  Amount Paid
                </Label>
                <Input
                  placeholder="₦ 0.00"
                  value={state.amountPaid}
                  onChange={(e) => handleChange('amountPaid', e.target.value)}
                  className="dark:border-primary/40 rounded-md border-gray-300 text-[#344054] dark:bg-[#1A1A1A] dark:text-white dark:placeholder-gray-400"
                />
                {errors.amountPaid && (
                  <span className="text-sm text-red-500 dark:text-red-400">
                    {errors.amountPaid}
                  </span>
                )}
              </div>

              {/* Bank Account */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#344054] dark:text-white">
                  Bank Account
                </Label>
                <Select
                  value={state.bankAccount}
                  onValueChange={(value) => handleChange('bankAccount', value)}
                  disabled={isLoading.bankAccounts}
                >
                  <SelectTrigger className="dark:border-primary/40 w-full rounded-md border-gray-300 text-[#344054] dark:bg-[#1A1A1A] dark:text-white">
                    <SelectValue placeholder="Select bank account" />
                  </SelectTrigger>
                  <SelectContent className="dark:border-primary/40 dark:bg-[#1A1A1A]">
                    {bankAccounts.length > 0 ? (
                      bankAccounts.map((account) => (
                        <SelectItem
                          key={account.id}
                          value={account.id.toString()}
                        >
                          {account.bank_name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">
                        No bank accounts found
                      </div>
                    )}
                  </SelectContent>
                </Select>
                {errors.bankAccount && (
                  <span className="text-sm text-red-500 dark:text-red-400">
                    {errors.bankAccount}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#344054] dark:text-white">
                  Account/Category
                </Label>
                <Select
                  value={state.account}
                  onValueChange={(value) => handleChange('account', value)}
                  disabled={isLoading.accountCategories}
                >
                  <SelectTrigger className="dark:border-primary/40 w-full rounded-md border-gray-300 text-[#344054] dark:bg-[#1A1A1A] dark:text-white">
                    <SelectValue placeholder="Select Account" />
                  </SelectTrigger>
                  <SelectContent className="dark:border-primary/40 dark:bg-[#1A1A1A]">
                    {accountCategories.length > 0 ? (
                      accountCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.account_name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500 dark:text-gray-400">
                        No accounts found
                      </div>
                    )}
                  </SelectContent>
                </Select>
                {errors.account && (
                  <span className="text-sm text-red-500 dark:text-red-400">
                    {errors.account}
                  </span>
                )}
              </div>

              {/* Reference */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#344054] dark:text-white">
                  Reference (Optional)
                </Label>
                <Input
                  placeholder="Reference number"
                  value={state.reference || ''}
                  onChange={(e) => handleChange('reference', e.target.value)}
                  className="dark:border-primary/40 rounded-md border-gray-300 text-[#344054] dark:bg-[#1A1A1A] dark:text-white dark:placeholder-gray-400"
                />
              </div>

              {/* Attachment */}
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-[#344054] dark:text-white">
                  Attachment (Optional)
                </Label>
                <FileUpload
                  file={state.attachment}
                  onFileSelect={(file) => handleChange('attachment', file)}
                  onFileDelete={() => handleChange('attachment', undefined)}
                  error={errors.attachment}
                  accept=".csv"
                />
                {errors.attachment && (
                  <span className="text-sm text-red-500 dark:text-red-300">
                    {errors.attachment}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="dark:border-primary/40 flex w-full border-t border-gray-100 pt-6">
          <div className="flex w-full gap-3">
            <Button
              variant="outline"
              className="dark:border-primary/40 h-12 flex-1 rounded-md border-gray-300 text-[#344054] dark:bg-[#1A1A1A] dark:text-white hover:dark:bg-[#262626]"
              onClick={currentStep === 1 ? handleClose : prevStep}
            >
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 h-12 flex-1 rounded-md text-white dark:bg-[#138754] dark:text-white dark:hover:bg-[#138754]/90"
              onClick={currentStep === 3 ? handleSave : nextStep}
              disabled={isSubmitting}
            >
              {currentStep === 3
                ? isSubmitting
                  ? 'Saving...'
                  : 'Save Entry'
                : 'Next'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
