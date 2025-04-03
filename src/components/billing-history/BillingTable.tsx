'use client'

import { CheckIcon } from '../Icon/Icons'
import { BillingRecord, formatDate, getStatusStyle } from './BillingHistory'
import { ArrowDown, Download } from 'lucide-react'

interface BillingTableProps {
  data: BillingRecord[]
}

const BillingTable = ({ data }: BillingTableProps) => {
  return (
    <div className="overflow-x-auto rounded-[12px] border border-gray-200 bg-white">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="h-[44px] border-b border-gray-200 bg-gray-50 text-left font-semibold">
            <th className="flex cursor-pointer items-center gap-1 p-3">
              <p className="font-inter text-xs leading-[18px] font-semibold text-[#151515]">
                Billing Date
              </p>
              <ArrowDown className="h-4 w-4" />
            </th>
            <th className="p-3">
              <p className="font-inter text-xs leading-[18px] font-semibold text-[#151515]">
                Description
              </p>
            </th>
            <th className="p-3">
              <p className="font-inter text-xs leading-[18px] font-semibold text-[#151515]">
                Status
              </p>
            </th>
            <th className="p-3">
              <p className="font-inter text-xs leading-[18px] font-semibold text-[#151515]">
                Plan
              </p>
            </th>
            <th className="p-3">
              <p className="font-inter text-xs leading-[18px] font-semibold text-[#151515]">
                Amount
              </p>
            </th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="p-3">{formatDate(item.transaction_date)}</td>

              <td className="py-3">
                {item.description || 'Monthly Subscription'}
              </td>
              <td className="py-3">
                <span
                  className={`${getStatusStyle(item.status)} inline-flex items-center gap-1 rounded-[16px] px-2 py-[2px]`}
                >
                  {item.status === 'completed' ? (
                    <>
                      <CheckIcon className="size-5 text-[#12B76A]" />
                      Successful
                    </>
                  ) : (
                    item.status.charAt(0).toUpperCase() + item.status.slice(1)
                  )}
                </span>
              </td>
              <td className="py-3">{item.plan}</td>
              <td className="py-3">${item.amount.toFixed(2)}</td>
              <td className="py-3">
                <Download className="h-6 w-6 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BillingTable
