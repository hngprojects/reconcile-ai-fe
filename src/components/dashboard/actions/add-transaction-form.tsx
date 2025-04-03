"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface AddTransactionFormProps {
  onClose: () => void
}

export function AddTransactionForm({ onClose }: AddTransactionFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Tabs defaultValue="expense">
      <TabsList className="grid w-full grid-cols-3 mb-4">
        <TabsTrigger value="expense">Expense</TabsTrigger>
        <TabsTrigger value="income">Income</TabsTrigger>
        <TabsTrigger value="transfer">Transfer</TabsTrigger>
      </TabsList>

      <TabsContent value="expense">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expense-date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expense-type">Type</Label>
              <Select defaultValue="expense">
                <SelectTrigger id="expense-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="purchase">Purchase</SelectItem>
                  <SelectItem value="withdrawal">Withdrawal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-description">Description</Label>
            <Input id="expense-description" placeholder="E.g., Internet Bill, Office Supplies" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">₦</span>
              <Input id="expense-amount" placeholder="0.00" className="pl-8" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-category">Account/Category</Label>
            <Select required>
              <SelectTrigger id="expense-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="supplies">Office Supplies</SelectItem>
                <SelectItem value="salaries">Salaries</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-paid-status">Paid Status</Label>
            <Select defaultValue="paid" required>
              <SelectTrigger id="expense-paid-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partially Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-amount-paid">Amount Paid</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">₦</span>
              <Input id="expense-amount-paid" placeholder="0.00" className="pl-8" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-bank-account">Bank Account Used</Label>
            <Select>
              <SelectTrigger id="expense-bank-account">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Main Business Account</SelectItem>
                <SelectItem value="savings">Savings Account</SelectItem>
                <SelectItem value="pos">POS Wallet</SelectItem>
                <SelectItem value="cash">Cash on Hand</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-receipt">Attachment (Optional)</Label>
            <Input id="expense-receipt" type="file" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense-notes">Notes (Optional)</Label>
            <Textarea id="expense-notes" placeholder="Add any additional notes or comments" />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                console.log("Transaction saved")
                onClose()
              }}
            >
              Save Expense
            </Button>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="income">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income-date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="income-type">Type</Label>
              <Select defaultValue="sales">
                <SelectTrigger id="income-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="deposit">Deposit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="income-description">Description</Label>
            <Input id="income-description" placeholder="E.g., POS Sales, Consulting Fee" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="income-amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">₦</span>
              <Input id="income-amount" placeholder="0.00" className="pl-8" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="income-category">Account/Category</Label>
            <Select required>
              <SelectTrigger id="income-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="interest">Interest</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="income-paid-status">Paid Status</Label>
            <Select defaultValue="paid" required>
              <SelectTrigger id="income-paid-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partially Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="income-amount-paid">Amount Paid</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">₦</span>
              <Input id="income-amount-paid" placeholder="0.00" className="pl-8" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="income-bank-account">Bank Account Used</Label>
            <Select>
              <SelectTrigger id="income-bank-account">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Main Business Account</SelectItem>
                <SelectItem value="savings">Savings Account</SelectItem>
                <SelectItem value="pos">POS Wallet</SelectItem>
                <SelectItem value="cash">Cash on Hand</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="income-receipt">Attachment (Optional)</Label>
            <Input id="income-receipt" type="file" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="income-notes">Notes (Optional)</Label>
            <Textarea id="income-notes" placeholder="Add any additional notes or comments" />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Income</Button>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="transfer">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transfer-date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transfer-amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₦</span>
                <Input id="transfer-amount" placeholder="0.00" className="pl-8" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transfer-from">From Account</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank1">Main Business Account</SelectItem>
                  <SelectItem value="bank2">Savings Account</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transfer-to">To Account</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank1">Main Business Account</SelectItem>
                  <SelectItem value="bank2">Savings Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transfer-ledger">Ledger</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select ledger" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Ledger</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transfer-description">Description (Optional)</Label>
            <Textarea id="transfer-description" placeholder="Add notes about this transfer" />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Transfer</Button>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  )
}

