'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useChartOfAccountCategoriesStore } from '@/store/chart-of-accounts-store'
import { addChartOfAccountFormSchema } from '@/types/chartOfAccounts'
import { create_a_new_chart_account } from '@/actions/chartOfAccounts'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

type AccountFormValues = z.infer<typeof addChartOfAccountFormSchema>

export function AddAccountModal() {
  const { data: session } = useSession()
  const [isCreatingAccount, startCreatingAccount] = useTransition()
  const [open, setOpen] = useState(false)
  const { categories } = useChartOfAccountCategoriesStore()

  const activeCategories = categories.filter((category) => category.is_active)

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(addChartOfAccountFormSchema),
    defaultValues: {
      name: '',
      accountNumber: '',
      accountName: '',
      description: '',
      openingBalance: 0,
    },
  })

  function onSubmit(data: AccountFormValues) {
    console.log('Form submitted with data:', data)

    startCreatingAccount(() => {
      create_a_new_chart_account({
        account_chart_category_id: data.name,
        account_number: data.accountNumber,
        account_name: data.accountName,
        description: data.description,
        balance: data.openingBalance,
        user_id: session?.user.id.toString() as string,
      }).then((res) => {
        if (res.success) {
          toast.success('Account created successfully!')

          setOpen(false)
          form.reset()
        } else {
          toast.error(res.message)
        }
      })
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        form.reset()
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add Account
        </Button>
      </DialogTrigger>

      <DialogContent className="flex h-[82vh] max-h-[600px] flex-col gap-0 overflow-hidden px-0 sm:max-w-[500px]">
        <DialogHeader className="px-6 pb-2 shadow-2xs">
          <div className="text-left">
            <DialogTitle>Add Account</DialogTitle>
            <DialogDescription>
              Add a new account to your chart of accounts
            </DialogDescription>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col"
          >
            <ScrollArea className="min-h-0 flex-1 px-5">
              <div className="grid gap-4 px-1 py-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="!h-11 w-full placeholder:text-sm">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {activeCategories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter an account number"
                          className="h-11 placeholder:text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., Sales Revenue"
                          className="h-11 placeholder:text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Brief description of this account"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="openingBalance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opening Balance</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute top-1/2 left-3 -translate-y-1/2">
                            ₦
                          </span>
                          <Input
                            {...field}
                            type="number"
                            step="0.01"
                            min="0"
                            className="h-11 pl-8 placeholder:text-sm"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>

            <div className="mb-5 flex h-[80px] items-center justify-between gap-3 border-t px-6 py-5">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="border-primary text-primary flex-1"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-primary dark:hover:bg-muted-foreground flex-1 hover:bg-[#235040]"
                disabled={form.formState.isSubmitting || isCreatingAccount}
              >
                {form.formState.isSubmitting || isCreatingAccount ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Add Account'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
