import * as React from 'react'
import { z } from 'zod'
import { useFormContext, Controller } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'

export const SelectLedgerSchema = z.object({
  ledgers: z
    .object({
      general: z.boolean().default(false),
      vendor: z.boolean().default(false),
      customer: z.boolean().default(false),
    })
    .refine(
      (values) => Object.values(values).some((v) => v === true),
      'At least one ledger type must be selected'
    ),
  saveAsDefault: z.boolean().default(false),
})

type SelectLedgerFormValues = z.infer<typeof SelectLedgerSchema>

const LEDGER_OPTIONS = [
  { id: 'general', label: 'General Ledger' },
  { id: 'vendor', label: 'Vendor Ledger' },
  { id: 'customer', label: 'Customer Ledger' },
] as const

const SelectLedgerForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<SelectLedgerFormValues>()

  return (
    <div className="space-y-4 text-start">
      <h6 className="text-[#475467]">
        Select which ledgers you want to include in the reconciliation process.
        This helps the system find the best matches for your bank transactions.
      </h6>

      <div className="space-y-4">
        {LEDGER_OPTIONS.map(({ id, label }) => (
          <Controller
            key={id}
            name={`ledgers.${id}`}
            control={control}
            render={({ field }) => (
              <div className="items-top flex items-center gap-3">
                <Checkbox
                  id={`ledger-${id}`}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="m-0 size-5 border-[#D0D5DD]"
                />
                <label
                  htmlFor={`ledger-${id}`}
                  className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </label>
              </div>
            )}
          />
        ))}

        {errors.ledgers && (
          <span className="text-destructive text-sm">
            {errors.ledgers.message}
          </span>
        )}
      </div>

      <Controller
        name="saveAsDefault"
        control={control}
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
