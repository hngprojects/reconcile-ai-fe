'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useChartOfAccountCategoriesStore } from '@/store/chart-of-accounts-store'
import { useState } from 'react'
import { Plus } from 'lucide-react'

export function AddTransactionModal() {
  const [open, setOpen] = useState(false)
  const { categories } = useChartOfAccountCategoriesStore()

  const activeCategories = categories.filter((category) => category.isActive)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add Account
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Add Account</DialogTitle>
          </div>
          <DialogDescription>
            Add a new account to your chart of accounts
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Account Category</Label>
              <Select>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {activeCategories.map((category) => (
                    <SelectItem
                      key={category.category}
                      value={category.category}
                    >
                      {category.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="4 digits (e.g., 4000)"
                type="text"
                maxLength={4}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input id="accountName" placeholder="e.g., Sales Revenue" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of this account"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="openingBalance">Opening Balance</Label>
              <div className="relative">
                <span className="absolute top-1/2 left-3 -translate-y-1/2">
                  ₦
                </span>
                <Input
                  id="openingBalance"
                  type="number"
                  defaultValue="0.00"
                  step="0.01"
                  min="0"
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="border-primary text-primary"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-primary hover:bg-[#235040]">
              Add Account
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
