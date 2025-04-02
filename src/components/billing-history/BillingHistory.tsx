'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, Download } from 'lucide-react'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import Container from '@/components/Container'
import { getBillingHistory } from '@/lib/api'
import { Loader } from '@/components/ui/loader'
import BillingTable from './BillingTable'
import BillingCard from './BillingCard'
// import { toast } from "sonner";

export interface BillingRecord {
  id: number
  amount: number
  description: string
  plan: string
  transaction_date: string
  status: string
}

export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

export const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-[#ECFDF3] text-[#027A48]'
    case 'pending':
      return 'bg-[#FFFAEB] text-[#B54708]'
    case 'failed':
      return 'bg-[#FEF3F2] text-[#B42318]'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function BillingHistory() {
  const router = useRouter()

  const [billingHistory, setBillingHistory] = useState<BillingRecord[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isLoading, setIsLoading] = useState(true)
  const [totalRows, setTotalRows] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await getBillingHistory(currentPage, rowsPerPage)
        if (response.data) {
          setBillingHistory(response.data)
          if (response.meta) {
            setTotalRows(response.meta.total)
            setRowsPerPage(response.meta.per_page)
            setTotalPages(response.meta.last_page)
          }
        }
      } catch (error) {
        console.error('Exception when fetching billing history:', error)
        // toast.error("An error occurred while Fetching billing history");
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentPage, rowsPerPage])

  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1)
  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1)

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Container className="mt-8 mb-20 flex flex-col gap-6 self-stretch">
        <div
          onClick={() => router.back()}
          className="flex w-fit cursor-pointer items-center gap-2"
        >
          <ArrowLeft className="h-6 w-6" />
          <p className="font-inter text-base leading-[38px] font-medium text-[#333]">
            Go back
          </p>
        </div>

        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <h1 className="font-inter text-lg leading-7 font-semibold text-[#101828]">
            Billing History
          </h1>
          {!!billingHistory.length && (
            <button className="hover:bg-accent flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-[10px] shadow-sm">
              <Download className="h-6 w-6" />
              <p className="text-sm leading-5 font-semibold text-gray-700">
                Download all
              </p>
            </button>
          )}
        </div>
        {billingHistory.length > 0 ? (
          <>
            <div>
              <div className="max-md:hidden">
                <BillingTable data={billingHistory} />
              </div>

              <div className="md:hidden">
                <BillingCard data={billingHistory} />
              </div>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-between border-[#EFF1F3] pt-4 md:border-t">
              <div className="flex items-center gap-4">
                <p className="max-md:hidden">Rows per page</p>
                <Select
                  value={rowsPerPage.toString()}
                  onValueChange={(v) => {
                    setRowsPerPage(Number(v))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-[60px] p-2 max-md:hidden">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[rowsPerPage].map((value) => (
                      <SelectItem key={value} value={value.toString()}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm max-md:hidden">
                  {(currentPage - 1) * rowsPerPage + 1}-
                  {Math.min(currentPage * rowsPerPage, totalRows)} of{' '}
                  {totalRows} rows
                </p>
                <p className="text-sm md:hidden">
                  Showing {rowsPerPage} out of {totalRows}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-12 flex flex-col items-center gap-6">
            <div>
              <div className="flex items-center justify-center">
                <Image
                  src="/assets/images/no_billing.png"
                  alt="No Billing History"
                  width={350}
                  height={270}
                  className=""
                  quality={75}
                  priority={true}
                />
              </div>
              <div className="flex max-w-md flex-col items-center gap-1">
                <h5 className="text-2xl font-medium">No Billing History Yet</h5>
                <p className="text-center text-[#333333]">
                  It looks like you haven’t made any payments yet. Once you do,
                  you’ll see them here.
                </p>
                <Link
                  href="/pricing"
                  className="hover:bg-accent text-primary hover:text-primary border-primary mt-4 flex h-10 w-full cursor-pointer items-center justify-center rounded-md border text-sm font-medium"
                >
                  View Pricing Plan
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
      <Footer />
    </>
  )
}
