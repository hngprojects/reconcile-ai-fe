// components/SelectLedgerForm.tsx
import * as React from 'react'
import { z } from 'zod'
import { useFormContext, Controller } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { useBookkeepingLedgers } from '@/hooks/useBookkeepingLedgers'
import { Skeleton } from '@/components/ui/skeleton'
import type { BookkeepingLedger } from '@/types/bookkeeping'

// Define a dynamic schema
export const SelectLedgerSchema = z.object({
  ledgers: z.record(z.boolean()).refine(
    (obj) => Object.values(obj).some((v) => v === true),
    'At least one ledger type must be selected'
  ),
  saveAsDefault: z.boolean().default(false),
})

type SelectLedgerFormValues = z.infer<typeof SelectLedgerSchema>

const SelectLedgerForm = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<SelectLedgerFormValues>()

  const { data: ledgersResponse, isLoading } = useBookkeepingLedgers()

  // Stabilize availableLedgers with useMemo to prevent unnecessary useEffect triggers
  const availableLedgers = React.useMemo(
    () => ledgersResponse?.data || [],
    [ledgersResponse?.data]
  )

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
            name={`ledgers.${ledger.name.toLowerCase().replace(/\s+/g, '')}`}
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