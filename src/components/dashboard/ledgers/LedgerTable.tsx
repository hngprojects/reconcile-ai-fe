'use client'

import React, { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { Badge } from '@/components/ui/badge'
import { Dot } from 'lucide-react'
import { CheckIcon, VerticalDotsIcon } from '../../Icon/Icons'
import { PaginationControls } from '../../PaginationControl'

// Define types for our data
interface GeneralLedgerItem {
  date: string
  description: string
  amount: number
  paid: number
  reconciled: boolean
  bankReference: string
}

interface VendorLedgerItem {
  date: string
  vendorName: string
  description: string
  amount: number
  paid: number
  outstanding: number
  reconciled: boolean
  bankReference: string
}

interface CustomerLedgerItem {
  date: string
  customerName: string
  description: string
  amount: number
  received: number
  outstanding: number
  reconciled: boolean
  bankReference: string
}

export function EnhancedLedgerTable({
  generalData,
  vendorsData,
  customersData,
}: {
  generalData: GeneralLedgerItem[]
  vendorsData: VendorLedgerItem[]
  customersData: CustomerLedgerItem[]
}) {
  // const { status, data: session } = useSession()
  const { status } = useSession()

  const isAuthenticated = status === 'authenticated'
  const [activeTab, setActiveTab] = useState('general')

  // Separate pagination states for each table
  const [generalPagination, setGeneralPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [vendorsPagination, setVendorsPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [customersPagination, setCustomersPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  // const getUserPlan = (plan: string | undefined) => {
  //   switch (plan) {
  //     case 'Starter':
  //       return 'starter'
  //     case 'Business':
  //       return 'business'
  //     default:
  //       return 'basic'
  //   }
  // }

  // const userPlan = getUserPlan(session?.plan?.plan.plan)

  // Format currency (Nigerian Naira format)
  const formatCurrency = (amount: number) => {
    const prefix = amount < 0 ? '-₦' : amount > 0 ? '₦' : '₦'
    return `${prefix}${Math.abs(amount).toLocaleString()}`
  }

  // Define columns for General Ledger
  const baseGeneralColumns: ColumnDef<GeneralLedgerItem>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ getValue }) => (
        <div className="px-6 py-5">{getValue() as string}</div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ getValue }) => (
        <div className="px-6 py-5">{getValue() as string}</div>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ getValue }) => (
        <div className="px-6 py-5 text-[#D92D20]">
          {formatCurrency(getValue() as number)}
        </div>
      ),
    },
    {
      accessorKey: 'paid',
      header: 'Paid',
      cell: ({ getValue }) => (
        <div className="px-6 py-5 text-[#D92D20]">
          {formatCurrency(getValue() as number)}
        </div>
      ),
    },
    {
      accessorKey: 'reconciled',
      header: 'Reconciled',
      cell: ({ getValue }) => {
        const reconciled = getValue() as boolean
        return (
          <div className="px-6 py-5">
            {reconciled ? (
              <Badge
                variant="outline"
                className="flex w-fit items-center gap-1 border-green-200 bg-green-50 text-green-600"
              >
                <Dot size={12} strokeWidth={10} /> Yes
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="flex w-fit items-center gap-1 border-red-200 bg-red-50 text-red-600"
              >
                <Dot size={12} strokeWidth={10} /> No
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'bankReference',
      header: 'Bank Reference',
      cell: ({ getValue }) => (
        <div className="px-6 py-5">{getValue() as string}</div>
      ),
    },
  ]

  // Define columns for Vendors Ledger
  const baseVendorsColumns: ColumnDef<VendorLedgerItem>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ getValue }) => (
        <div className="px-6 py-5">{getValue() as string}</div>
      ),
    },
    {
      accessorKey: 'vendorName',
      header: 'Vendor Name',
      cell: ({ getValue }) => (
        <div className="px-6 py-5">{getValue() as string}</div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ getValue }) => (
        <div className="px-6 py-5">{getValue() as string}</div>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ getValue }) => (
        <div className="px-6 py-5 text-[#D92D20]">
          {formatCurrency(getValue() as number)}
        </div>
      ),
    },
    {
      accessorKey: 'paid',
      header: 'Paid',
      cell: ({ getValue }) => (
        <div className="px-6 py-5 text-[#D92D20]">
          {formatCurrency(getValue() as number)}
        </div>
      ),
    },
    {
      accessorKey: 'outstanding',
      header: 'Outstanding',
      cell: ({ getValue }) => {
        const outstanding = getValue() as number
        return (
          <div className="px-6 py-5">
            {outstanding > 0 ? (
              <span className="text-[#C27D00]">
                {formatCurrency(outstanding)}
              </span>
            ) : (
              <span className="text-[#039855]">₦0</span>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'reconciled',
      header: 'Reconciled',
      cell: ({ getValue }) => {
        const reconciled = getValue() as boolean
        return (
          <div className="px-6 py-5">
            {reconciled ? (
              <Badge
                variant="outline"
                className="flex w-fit items-center gap-1 border-green-200 bg-green-50 text-green-600"
              >
                <Dot size={12} strokeWidth={10} /> Yes
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="flex w-fit items-center gap-1 border-red-200 bg-red-50 text-red-600"
              >
                <Dot size={12} strokeWidth={10} /> No
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'bankReference',
      header: 'Bank Reference',
      cell: ({ getValue }) => (
        <div className="px-6 py-5">{getValue() as string}</div>
      ),
    },
  ]

  // Define columns for Customers Ledger
  const baseCustomersColumns: ColumnDef<CustomerLedgerItem>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ getValue }) => (
        <div className="px-6 py-5">{getValue() as string}</div>
      ),
    },
    {
      accessorKey: 'customerName',
      header: 'Customer Name',
      cell: ({ getValue }) => (
        <div className="px-6 py-5">{getValue() as string}</div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ getValue }) => (
        <div className="px-6 py-5">{getValue() as string}</div>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ getValue }) => (
        <div className="px-6 py-5 text-[#039855]">
          {formatCurrency(getValue() as number)}
        </div>
      ),
    },
    {
      accessorKey: 'received',
      header: 'Received',
      cell: ({ getValue }) => (
        <div className="px-6 py-5 text-[#039855]">
          {formatCurrency(getValue() as number)}
        </div>
      ),
    },
    {
      accessorKey: 'outstanding',
      header: 'Outstanding',
      cell: ({ getValue }) => {
        const outstanding = getValue() as number
        return (
          <div className="px-6 py-5">
            {outstanding > 0 ? (
              <span className="text-[#C27D00]">
                {formatCurrency(outstanding)}
              </span>
            ) : (
              <span className="text-[#039855]">₦0</span>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'reconciled',
      header: 'Reconciled',
      cell: ({ getValue }) => {
        const reconciled = getValue() as boolean
        return (
          <div className="px-6 py-5">
            {reconciled ? (
              <Badge
                variant="outline"
                className="flex w-fit items-center gap-1 border-green-200 bg-green-50 text-green-600"
              >
                <Dot size={12} strokeWidth={10} /> Yes
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="flex w-fit items-center gap-1 border-red-200 bg-red-50 text-red-600"
              >
                <Dot size={12} strokeWidth={10} /> No
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'bankReference',
      header: 'Bank Reference',
      cell: ({ getValue }) => (
        <div className="px-6 py-5">{getValue() as string}</div>
      ),
    },
  ]

  const generalLedgerActionColumn: ColumnDef<GeneralLedgerItem> = {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => {
      const item = row.original
      return (
        <div className="flex items-center justify-center py-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex cursor-pointer items-center justify-center"
              >
                <span className="sr-only">Open menu</span>
                <VerticalDotsIcon className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {item.reconciled ? (
                <DropdownMenuItem className="gap-0.5">
                  <CheckIcon className="h-7 w-7 text-[#333333]" />
                  <span className="cursor-pointer text-sm text-nowrap text-[#333333]">
                    Unlink Matched
                  </span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="gap-0.5">
                  <CheckIcon className="h-7 w-7 text-[#333333]" />
                  <span className="cursor-pointer text-sm text-nowrap text-[#333333]">
                    Find Possible Match
                  </span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  }
  const vendorLedgerActionColumn: ColumnDef<VendorLedgerItem> = {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => {
      const item = row.original
      return (
        <div className="flex items-center justify-center py-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex cursor-pointer items-center justify-center"
              >
                <span className="sr-only">Open menu</span>
                <VerticalDotsIcon className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {item.reconciled ? (
                <DropdownMenuItem className="gap-0.5">
                  <CheckIcon className="h-7 w-7 text-[#333333]" />
                  <span className="cursor-pointer text-sm text-nowrap text-[#333333]">
                    Unlink Matched
                  </span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="gap-0.5">
                  <CheckIcon className="h-7 w-7 text-[#333333]" />
                  <span className="cursor-pointer text-sm text-nowrap text-[#333333]">
                    Find Possible Match
                  </span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  }
  const customerLedgerActionColumn: ColumnDef<CustomerLedgerItem> = {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => {
      const item = row.original
      return (
        <div className="flex items-center justify-center py-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex cursor-pointer items-center justify-center"
              >
                <span className="sr-only">Open menu</span>
                <VerticalDotsIcon className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {item.reconciled ? (
                <DropdownMenuItem className="gap-0.5">
                  <CheckIcon className="h-7 w-7 text-[#333333]" />
                  <span className="cursor-pointer text-sm text-nowrap text-[#333333]">
                    Unlink Matched
                  </span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="gap-0.5">
                  <CheckIcon className="h-7 w-7 text-[#333333]" />
                  <span className="cursor-pointer text-sm text-nowrap text-[#333333]">
                    Find Possible Match
                  </span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  }
  // Combine columns based on authentication
  const generalColumns = [
    ...baseGeneralColumns,
    ...(isAuthenticated ? [generalLedgerActionColumn] : []),
    // ...(isAuthenticated && userPlan === 'business'
    //   ? [generalLedgerActionColumn]
    //   : []),
  ]
  const vendorsColumns = [
    ...baseVendorsColumns,
    ...(isAuthenticated ? [vendorLedgerActionColumn] : []),
    // ...(isAuthenticated && userPlan === 'business'
    //   ? [vendorLedgerActionColumn]
    //   : []),
  ]
  const customersColumns = [
    ...baseCustomersColumns,
    ...(isAuthenticated ? [customerLedgerActionColumn] : []),
    // ...(isAuthenticated && userPlan === 'business'
    //   ? [customerLedgerActionColumn]
    //   : []),
  ]

  // Create independent table instances
  const generalTable = useReactTable({
    data: generalData,
    columns: generalColumns,
    state: { pagination: generalPagination },
    onPaginationChange: setGeneralPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  })

  const vendorsTable = useReactTable({
    data: vendorsData,
    columns: vendorsColumns,
    state: { pagination: vendorsPagination },
    onPaginationChange: setVendorsPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  })

  const customersTable = useReactTable({
    data: customersData,
    columns: customersColumns,
    state: { pagination: customersPagination },
    onPaginationChange: setCustomersPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  })

  return (
    <div className="w-full">
      <Tabs
        defaultValue="general"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="min-h-[44px] !rounded-[8px] bg-[#F5F5F5] p-[4px] dark:bg-[#1A1A1A]">
          <TabsTrigger
            value="general"
            className={`font-[Open Sans] min-h-[36px] gap-[10px] rounded-[4px] pt-[4px] pr-[10px] pb-[4px] pl-[10px] text-[14px] leading-[20px] font-semibold tracking-[0.1%] !text-[#262626] dark:!text-white ${
              activeTab === 'general'
                ? 'bg-white shadow-md dark:!bg-[#000000]'
                : ''
            } `}
          >
            General Ledger
          </TabsTrigger>
          <TabsTrigger
            value="vendors"
            className={`font-[Open Sans] min-h-[36px] gap-[10px] rounded-[4px] pt-[4px] pr-[10px] pb-[4px] pl-[10px] text-[14px] leading-[20px] font-semibold tracking-[0.1%] !text-[#262626] dark:!text-white ${
              activeTab === 'vendors'
                ? 'bg-white shadow-md dark:!bg-[#000000]'
                : ''
            } `}
          >
            Vendors Ledger
          </TabsTrigger>
          <TabsTrigger
            value="customers"
            className={`font-[Open Sans] min-h-[36px] gap-[10px] rounded-[4px] pt-[4px] pr-[10px] pb-[4px] pl-[10px] text-[14px] leading-[20px] font-semibold tracking-[0.1%] !text-[#262626] dark:!text-white ${
              activeTab === 'customers'
                ? 'bg-white shadow-md dark:!bg-[#000000]'
                : ''
            } `}
          >
            Customers Ledger
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-2">
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-gray-50 text-gray-700 dark:bg-[#1A1A1A] dark:!text-white">
                {generalTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header, index, array) => (
                      <TableHead
                        key={header.id}
                        className={cn(
                          'h-12 px-6 text-gray-700 dark:text-white',
                          index < array.length - 1 && 'border-r'
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {generalTable.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className={cn('transition-colors')}>
                    {row.getVisibleCells().map((cell, index, array) => (
                      <TableCell
                        key={cell.id}
                        className={cn(index < array.length - 1 && 'border-r')}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <PaginationControls
            pageIndex={generalTable.getState().pagination.pageIndex}
            pageSize={generalTable.getState().pagination.pageSize}
            totalItems={generalData.length}
            onPreviousPage={() => generalTable.previousPage()}
            onNextPage={() => generalTable.nextPage()}
            canPreviousPage={generalTable.getCanPreviousPage()}
            canNextPage={generalTable.getCanNextPage()}
            onRowsPerPageChange={(value) => generalTable.setPageSize(value)}
          />
        </TabsContent>

        <TabsContent value="vendors" className="mt-2">
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-gray-50 text-gray-700 dark:bg-[#1A1A1A] dark:!text-white">
                {vendorsTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header, index, array) => (
                      <TableHead
                        key={header.id}
                        className={cn(
                          'h-12 px-6 text-gray-700 dark:text-white',
                          index < array.length - 1 && 'border-r'
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {vendorsTable.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className={cn('transition-colors')}>
                    {row.getVisibleCells().map((cell, index, array) => (
                      <TableCell
                        key={cell.id}
                        className={cn(index < array.length - 1 && 'border-r')}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <PaginationControls
            pageIndex={vendorsTable.getState().pagination.pageIndex}
            pageSize={vendorsTable.getState().pagination.pageSize}
            totalItems={vendorsData.length}
            onPreviousPage={() => vendorsTable.previousPage()}
            onNextPage={() => vendorsTable.nextPage()}
            canPreviousPage={vendorsTable.getCanPreviousPage()}
            canNextPage={vendorsTable.getCanNextPage()}
            onRowsPerPageChange={(value) => vendorsTable.setPageSize(value)}
          />
        </TabsContent>

        <TabsContent value="customers" className="mt-2">
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-gray-50 text-gray-700 dark:bg-[#1A1A1A] dark:!text-white">
                {customersTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header, index, array) => (
                      <TableHead
                        key={header.id}
                        className={cn(
                          'h-12 px-6 text-gray-700 dark:text-white',
                          index < array.length - 1 && 'border-r'
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {customersTable.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className={cn('transition-colors')}>
                    {row.getVisibleCells().map((cell, index, array) => (
                      <TableCell
                        key={cell.id}
                        className={cn(index < array.length - 1 && 'border-r')}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <PaginationControls
            pageIndex={customersTable.getState().pagination.pageIndex}
            pageSize={customersTable.getState().pagination.pageSize}
            totalItems={customersData.length}
            onPreviousPage={() => customersTable.previousPage()}
            onNextPage={() => customersTable.nextPage()}
            canPreviousPage={customersTable.getCanPreviousPage()}
            canNextPage={customersTable.getCanNextPage()}
            onRowsPerPageChange={(value) => customersTable.setPageSize(value)}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EnhancedLedgerTable
