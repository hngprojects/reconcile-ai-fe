'use client'

import { businessTypes } from '@/data/dashboardConfig'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { businessFormSchema, BusinessFormValues } from './settingsSchemas'

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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function BusinessTab() {
  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      businessName: '',
      businessType: '',
    },
  })

  const onSubmit = (data: BusinessFormValues) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Manage your business details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Business Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Business Name"
                        className="h-11 placeholder:text-sm md:h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs md:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Business Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="!h-11 w-full md:!h-12">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {businessTypes.map((business, index) => (
                          <SelectItem key={index} value={business.value}>
                            {business.label}
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
