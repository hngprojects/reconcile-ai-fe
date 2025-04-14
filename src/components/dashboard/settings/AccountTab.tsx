'use client'

import { availableCurrencies, fiscalYear } from '@/data/dashboardConfig'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { accountFormSchema, AccountFormValues } from './settingsSchemas'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function AccountTab() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      fiscalYear: '',
      currency: '',
    },
  })

  const onSubmit = (data: AccountFormValues) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Accounting Settings</CardTitle>
            <CardDescription>
              Configure your accounting preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fiscalYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Fiscal Year</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="!h-11 w-full md:!h-12">
                          <SelectValue placeholder="Select fiscal year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fiscalYear.map((range, index) => (
                          <SelectItem key={index} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs md:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      Default Currency
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="!h-11 w-full md:!h-12">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableCurrencies.map((currency, index) => (
                          <SelectItem key={index} value={currency.value}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs md:text-sm" />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            className="text-primary hover:text-primary"
            onClick={() => form.reset()}
          >
            Reset
          </Button>

          <Button type="submit" className="font-normal">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
}
