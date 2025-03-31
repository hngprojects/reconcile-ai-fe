import { ArrowLeft } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { CheckCircle2Icon } from 'lucide-react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StickyNote, ArrowDown, CloudDownload } from 'lucide-react'
import Container from '@/components/Container'
import Footer from '@/components/Footer'

export default function BillingPage() {
  const planFeatures = [
    'Reconcile up to 20 transactions/month',
    'Basic AI matching (date, amount, description)',
    'Export results to CSV',
    'Manual adjustments (unlink and match errors)',
  ]

  const invoices = [
    {
      id: '007',
      month: 'Dec 2022',
      date: 'Dec 1, 2022',
      status: 'Paid',
      amount: 'USD $10.00',
      plan: 'Starter Plan',
    },
    {
      id: '006',
      month: 'Nov 2022',
      date: 'Nov 1, 2022',
      status: 'Paid',
      amount: 'USD $10.00',
      plan: 'Starter Plan',
    },
    {
      id: '005',
      month: 'Oct 2022',
      date: 'Oct 1, 2022',
      status: 'Paid',
      amount: 'USD $10.00',
      plan: 'Starter Plan',
    },
    {
      id: '004',
      month: 'Sep 2022',
      date: 'Sep 1, 2022',
      status: 'Paid',
      amount: 'USD $10.00',
      plan: 'Starter Plan',
    },
  ]

  return (
    <div>
      <Container className="font-inter my-5">
        <div className="flex items-center gap-2">
          <ArrowLeft />
          <p>Go Back</p>
        </div>
        <div className="mt-3 border-b-1 border-solid border-[#EAECF0] px-8 py-4 text-[#333333]">
          <h2 className="text-base font-bold sm:text-3xl">Billing</h2>
          <p>Manage your billing and payment details.</p>
        </div>

        <div className="flex flex-col justify-between gap-4 border-b-1 border-solid border-[#EAECF0] py-7 pl-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-7">
            <div>
              <h3 className="text[#101828] font-bold">Current Plan</h3>
              <p className="text[#475467]">Manage your subscription plan</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-10">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#101828]">Starter plan</h3>
                  <p className="rounded-lg bg-[#EAEFED] px-2 py-0.5 text-sm text-[#2A5743]">
                    Current
                  </p>
                </div>
                <div>
                  <p className="text-[#475467]">
                    Our most popular plan for start-ups.
                  </p>
                </div>
              </div>
              <div>
                <p>
                  <span className="md:3xl text-2xl font-bold text-[#101828] sm:text-2xl">
                    $10
                  </span>
                  per month
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-7 md:flex-row">
            <Link
              href="/file-upload"
              aria-label="Start Reconciliation"
              className="mr-auto flex h-12 w-full cursor-pointer items-center justify-center rounded-md border-1 border-solid border-[#297B65] px-4 py-2 text-sm font-semibold text-[#297B65] hover:bg-[#333333] hover:text-white md:w-40"
            >
              Cancel Plan
            </Link>
            <Link
              href="/subscription/upgrade-plan"
              aria-label="Start Reconciliation"
              className="mr-auto flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-[#297B65] px-4 py-2 text-sm font-semibold text-white hover:bg-[#297B65]/90 md:w-40"
            >
              Upgrade Plan
            </Link>
          </div>
        </div>

        <div className="border-b-1 border-solid border-[#EAECF0] px-8 py-4">
          <h3>Plan Features</h3>
          {planFeatures.map((feature, index) => (
            <div
              key={index}
              className="my-4 flex items-center gap-3 text-[#333333]"
            >
              <CheckCircle2Icon className="h-6 w-6" />
              <p className="text-sm sm:text-base">{feature}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-row items-center justify-between border-b-1 border-solid border-[#EAECF0] py-4 pl-8">
          <div>
            <h2 className="font-bold text-[#101828]">Next Billing Date</h2>
            <p>april 05 2025</p>
          </div>
          <p className="text-base font-bold text-[#101828] sm:text-3xl">$10</p>
        </div>

        <div>
          <div className="flex w-full flex-col justify-between gap-5 pt-10 pb-4 pl-8 sm:flex-row sm:items-center sm:gap-0">
            <div>
              <h2>Billing and invoice</h2>
              <p>Pick an account type that fits your workflow</p>
            </div>
            <div>
              <button
                aria-label="Start Reconciliation"
                className="mr-auto flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md border-1 border-dashed border-[#D0D5DD] bg-[white] px-4 py-2 text-sm font-semibold text-[#344054] hover:bg-[#297B65]/90 hover:text-[white] md:w-40"
              >
                <CloudDownload />
                Download all
              </button>
            </div>
          </div>

          <div className="mt-6 w-full pl-8">
            <Table className="overflow-hidden rounded-xl border-1 border-solid border-[#EAECF0]">
              <TableHeader>
                <TableRow className="bg-[#EAECF0]">
                  <TableHead>Invoice</TableHead>
                  <TableHead className="flex items-center gap-1">
                    Billing date
                    <ArrowDown className="h-4 w-4" />
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="flex items-center space-x-2">
                      <StickyNote className="h-8 w-8 rounded-full bg-[#EAEFED] p-2 text-[#2E604A]" />
                      <span className="text-[#101828]">
                        Invoice #{invoice.id} – {invoice.month}
                      </span>
                    </TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell className="w-fit">
                      <span className="flex w-fit items-center gap-1 rounded-md bg-green-100 px-2 py-1 text-green-700">
                        <Check className="h-3 w-3" />
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>{invoice.plan}</TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        className="cursor-pointer text-[#2E604A]"
                      >
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  )
}
