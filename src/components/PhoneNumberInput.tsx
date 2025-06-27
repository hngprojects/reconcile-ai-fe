'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form'
import { CountrySelector, usePhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import { Button } from './ui/button'

interface PhoneNumberInputProps<TFieldValues extends FieldValues> {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
  error?: FieldError
  name: string
  disabled?: boolean
  size?: 'small' | 'big'
}

export const PhoneNumberInput = <TFieldValues extends FieldValues>({
  field,
  error,
  size = 'big',
  disabled,
  name,
}: PhoneNumberInputProps<TFieldValues>) => {
  const phoneInput = usePhoneInput({
    defaultCountry: 'gb',
    value: field.value as string,
    onChange: (data) => {
      field.onChange(data.phone)
    },
  })

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className={cn('flex w-full', size === 'big' ? 'h-12' : 'h-10')}>
          <CountrySelector
            selectedCountry={phoneInput.country.iso2}
            onSelect={(country) => phoneInput.setCountry(country.iso2)}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            renderButtonWrapper={({ children, rootProps }) => (
              <Button
                {...rootProps}
                variant="outline"
                type="button"
                title="Select country"
                style={{
                  zIndex: 1,
                }}
                className={cn(
                  'h-full rounded-r-none p-[10px] focus-visible:ring-3',
                  // error &&
                  //   'border-destructive focus-visible:ring-destructiv,e/20 dark:focus-visible:ring-destructive/40 border-r-transparent',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {children}
              </Button>
            )}
            dropdownStyleProps={{
              style: {
                top: `${size === 'big' ? '50px' : '40px'}`,
                padding: '7px 4px 7px 7px',
                borderRadius: '8px',
              },
            }}
          />
          <Input
            id={name}
            placeholder="Phone number"
            type="tel"
            value={phoneInput.phone}
            onChange={phoneInput.handlePhoneValueChange}
            className={cn(
              'z-10 flex-1 rounded-l-none border-l-transparent',
              size === 'big' ? 'h-12' : 'h-10',
              error &&
                'border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40'
            )}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
        </div>
      </div>
    </div>
  )
}
