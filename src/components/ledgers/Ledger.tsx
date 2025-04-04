'use client'

import { Download, PlusIcon, Upload } from 'lucide-react'
import { Button } from '../ui/button'
import FilterComponent from './LedgerFilter'
import LedgerTable from './LedgerTable'

export const Ledger = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        {/* header */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-inter text-xl leading-none font-semibold tracking-tight text-[#000000]">
              Ledgers
            </h1>
            <p className="font-inter text-base leading-5 font-normal tracking-normal text-[#000000]">
              View and manage your accounting ledger entries
            </p>
          </div>

          <div className="flex gap-[16px]">
            <Button
              variant={'secondary'}
              className="flex cursor-pointer gap-2 rounded-lg border border-[#2E604A] bg-white px-4 py-2 text-sm font-medium text-[#2E604A] shadow-none"
            >
              <PlusIcon className="h-4 w-4" />
              Add Entry
            </Button>
            <Button
              variant={'secondary'}
              className="flex cursor-pointer gap-2 rounded-lg border border-[#2E604A] bg-white px-4 py-2 text-sm font-medium text-[#2E604A] shadow-none"
            >
              <Upload className="h-4 w-4" />
              Upload CSV
            </Button>
            <Button className="bg-primary hover:bg-primary/90 cursor-pointer transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        <FilterComponent />
      </div>
      {/* table */}
      <LedgerTable />
    </div>
  )
}
