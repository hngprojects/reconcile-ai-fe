'use client'

import React, { useState, useCallback } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import Image from 'next/image'
import Filters from './Filters'

const data = [
  {
    date: 'Jan 25, 2025',
    bank: 'GTB Business',
    status: 'Completed',
    matched: 4,
    unmatched: 0,
    action: 'View Summary',
  },
  {
    date: 'Feb 25, 2025',
    bank: 'Access Vendor Account',
    status: 'Completed',
    matched: 3,
    unmatched: 4,
    action: 'View Summary',
  },
  {
    date: 'Mar 25, 2025',
    bank: 'Zenith POS Account',
    status: 'Pending',
    matched: 2,
    unmatched: 2,
    action: 'Resume',
  },
  {
    date: 'Apr 25, 2025',
    bank: 'UBA Business',
    status: 'Completed',
    matched: 5,
    unmatched: 3,
    action: 'View Summary',
  },
  {
    date: 'May 25, 2025',
    bank: 'Wema Vendor Account',
    status: 'Completed',
    matched: 2,
    unmatched: 3,
    action: 'View Summary',
  },
  {
    date: 'Jun 25, 2025',
    bank: 'Union Business',
    status: 'Pending',
    matched: 2,
    unmatched: 1,
    action: 'Resume',
  },
  {
    date: 'Jul 25, 2025',
    bank: 'Fidelity Business',
    status: 'Completed',
    matched: 1,
    unmatched: 0,
    action: 'View Summary',
  },
  {
    date: 'Aug 25, 2025',
    bank: 'Ecobank Vendor Account',
    status: 'Completed',
    matched: 4,
    unmatched: 2,
    action: 'View Summary',
  },
]

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return {
        className: 'bg-[#ECFDF3] text-[#027A48]',
        icon: '/assets/images/check.svg',
      }
    case 'pending':
      return {
        className: 'bg-[#FFFAEB] text-[#B54708]',
        icon: '/assets/images/clock.svg',
      }
    case 'failed':
      return {
        className: 'bg-[#FEF3F2] text-[#B42318]',
      }
    default:
      return {
        className: 'bg-gray-100 text-gray-800',
      }
  }
}

const ReconciliationTable = () => {
  const [filteredData, setFilteredData] = useState(data)

  // Memoize the handleFilterChange function
  const handleFilterChange = useCallback(
    ({
      searchTerm = '',
      selectedBank = 'All Banks',
      selectedStatus = 'All Status',
    }: {
      searchTerm: string
      selectedBank: string
      selectedStatus: string
    }) => {
      const lowerSearch = searchTerm.toLowerCase()

      const newData = data.filter((item) => {
        const matchesSearch =
          item.bank.toLowerCase().includes(lowerSearch) ||
          item.status.toLowerCase().includes(lowerSearch) ||
          item.date.toLowerCase().includes(lowerSearch)

        const matchesBank =
          selectedBank === 'All Banks' || item.bank === selectedBank

        const matchesStatus =
          selectedStatus === 'All Status' ||
          item.status.toLowerCase() === selectedStatus.toLowerCase()

        return matchesSearch && matchesBank && matchesStatus
      })

      setFilteredData(newData)
    },
    [] // No dependencies, as `data` is static
  )

  return (
    <>
      <Filters onFilterChange={handleFilterChange} />
      <div className="overflow-x-auto">
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <Table className="separate min-w-full border-collapse rounded-lg bg-white">
            <TableHeader>
              <TableRow className="h-[52px] gap-[12px] border-b border-gray-200 bg-gray-50 text-sm text-gray-600">
                <TableHead className="font-lato border-r border-gray-200 px-6 py-3 text-center text-[16px] font-bold text-[#333]">
                  Date
                </TableHead>
                <TableHead className="font-lato border-r border-gray-200 px-6 py-3 text-center text-[16px] font-bold text-[#333]">
                  Bank Account
                </TableHead>
                <TableHead className="font-lato border-r border-gray-200 px-6 py-3 text-center text-[16px] font-bold text-[#333]">
                  Status
                </TableHead>
                <TableHead className="font-lato border-r border-gray-200 px-6 py-3 text-center text-[16px] font-bold text-[#333]">
                  Matched
                </TableHead>
                <TableHead className="font-lato border-r border-gray-200 px-6 py-3 text-center text-[16px] font-bold text-[#333]">
                  Unmatched
                </TableHead>
                <TableHead className="font-lato px-6 py-3 text-center text-[16px] font-bold text-[#333]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TableRow key={index} className="border-t border-gray-200">
                    <TableCell className="font-inter border-r border-gray-200 p-4 text-center text-sm font-normal text-[#333]">
                      {item.date}
                    </TableCell>
                    <TableCell className="font-inter border-r border-gray-200 p-4 text-center text-sm font-normal text-[#333]">
                      {item.bank}
                    </TableCell>
                    <TableCell className="font-inter border-r border-gray-200 p-4 text-center text-sm font-normal text-[#333]">
                      {(() => {
                        const { className, icon } = getStatusStyle(item.status)
                        return (
                          <span
                            className={`${className} inline-flex items-center gap-1 rounded-[16px] px-3 py-1 font-medium`}
                          >
                            {icon && (
                              <Image
                                src={icon}
                                alt="status icon"
                                width={12}
                                height={12}
                              />
                            )}
                            {item.status}
                          </span>
                        )
                      })()}
                    </TableCell>
                    <TableCell className="font-inter border-r border-gray-200 p-4 text-center text-sm font-normal text-[#333]">
                      {item.matched}
                    </TableCell>
                    <TableCell className="font-inter border-r border-gray-200 p-4 text-center text-sm font-normal text-[#333]">
                      {item.unmatched}
                    </TableCell>
                    <TableCell className="font-inter p-4 text-center text-sm font-normal text-[#333]">
                      <button className="truncate rounded-lg border px-4 py-2 text-sm text-black hover:bg-gray-100">
                        {item.action}
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-4 text-center text-gray-500"
                  >
                    No matching records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default ReconciliationTable
