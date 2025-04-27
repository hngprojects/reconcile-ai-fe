import * as React from 'react'
import { z } from 'zod'
import { useFormContext, Controller } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { useBookkeepingLedgers } from '@/hooks/useBookkeepingLedgers'
import { Skeleton } from '@/components/ui/skeleton'
import type { BookkeepingLedger } from '@/types/bookkeeping'

// Create a dynamic schema based on ledger names
const createLedgerSchema = (ledgers: BookkeepingLedger[]) => {
  const ledgerFields = ledgers.reduce(
    (acc, ledger) => {
      const fieldName = ledger.name.toLowerCase().replace(/\s+/g, '')
      acc[fieldName] = z.boolean()
      return acc
    },
    {} as Record<string, z.ZodBoolean>
  )

  return z.object({
    ledgers: z
      .object(ledgerFields)
      .refine(
        (values) => Object.values(values).some((v) => v === true),
        'At least one ledger type must be selected'
      ),
    saveAsDefault: z.boolean().default(false),
  })
}

const defaultLedgers: BookkeepingLedger[] = [
  {
    id: '1',
    user_id: '0',
    name: 'General Ledger',
    description: 'Main accounting ledger',
    categories: ['all'],
    is_active: true,
    is_default: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: '0',
    name: 'Vendor Ledger',
    description: 'Vendor transactions ledger',
    categories: ['vendor'],
    is_active: true,
    is_default: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    user_id: '0',
    name: 'Customer Ledger',
    description: 'Customer transactions ledger',
    categories: ['customer'],
    is_active: true,
    is_default: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const SelectLedgerSchema = z.lazy(() =>
  createLedgerSchema(defaultLedgers)
)

type SelectLedgerFormValues = z.infer<typeof SelectLedgerSchema>

const SelectLedgerForm = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<SelectLedgerFormValues>()

  const { data: ledgersResponse, isLoading } = useBookkeepingLedgers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const availableLedgers = ledgersResponse?.data || []

  // Initialize form values when ledgers are loaded
  React.useEffect(() => {
    if (availableLedgers.length > 0) {
      const ledgerValues = {} as Record<string, boolean>

      availableLedgers.forEach((ledger) => {
        const fieldName = ledger.name.toLowerCase().replace(/\s+/g, '')
        ledgerValues[fieldName] = false
      })

      setValue('ledgers', ledgerValues, { shouldValidate: true })
    }
  }, [availableLedgers, setValue])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-3/4" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 text-start">
      <h6 className="text-[#475467]">
        Select which ledgers you want to include in the reconciliation process.
        This helps the system find the best matches for your bank transactions.
      </h6>

      <div className="space-y-4">
        {availableLedgers.map((ledger: BookkeepingLedger) => (
          <Controller
            key={ledger.id}
            name={
              `ledgers.${ledger.name.toLowerCase().replace(/\s+/g, '')}` as const
            }
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <div className="items-top flex items-center gap-3">
                <Checkbox
                  id={`ledger-${ledger.id}`}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={!ledger.is_active}
                  className="m-0 size-5 border-[#D0D5DD]"
                />
                <label
                  htmlFor={`ledger-${ledger.id}`}
                  className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {ledger.name}
                  {!ledger.is_active && (
                    <span className="ml-2 text-sm text-gray-500">
                      (Inactive)
                    </span>
                  )}
                </label>
              </div>
            )}
          />
        ))}

        {errors.ledgers && (
          <span className="text-destructive text-sm">
            {errors.ledgers.message?.toString()}
          </span>
        )}
      </div>

      <Controller
        name="saveAsDefault"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <div className="items-top mt-8 flex items-center gap-3">
            <Checkbox
              id="saveAsDefault"
              checked={field.value}
              onCheckedChange={field.onChange}
              className="m-0 size-5 border-[#D0D5DD]"
            />
            <label
              htmlFor="saveAsDefault"
              className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Save these selections as default
            </label>
          </div>
        )}
      />
    </div>
  )
}

export default SelectLedgerForm
