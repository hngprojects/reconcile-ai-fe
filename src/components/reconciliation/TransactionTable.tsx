'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FrontendTransaction } from '../../types/frontendResponseTypes'
import { cn } from '@/lib/utils'

interface TransactionTableProps {
  transaction?: FrontendTransaction | null
  transactions?: FrontendTransaction | FrontendTransaction[] | null
  status: 'matched' | 'unmatched' | 'empty'
  NoOfMatchedData?: number
}

export function TransactionTable({
  transaction,
  transactions,
  status,
  NoOfMatchedData,
}: TransactionTableProps) {
  const getRowStyles = () => {
    switch (status) {
      case 'matched':
        return 'bg-[#F3FEFA] hover:!bg-[#F3FEFA]'
      case 'unmatched':
        return 'bg-[#FFF4F0] hover:!bg-[#FFF4F0]'
      default:
        return ''
    }
  }

  // Process the transactions to display
  const transactionsToDisplay: FrontendTransaction[] = []

  if (transaction) {
    // If a single transaction is provided
    transactionsToDisplay.push(transaction)
  } else if (transactions) {
    // If transactions array or single transaction is provided
    if (Array.isArray(transactions)) {
      transactionsToDisplay.push(...transactions)
    } else {
      transactionsToDisplay.push(transactions)
    }
  }

  // Calculate the row height based on number of rows
  const calculateRowHeight = () => {
    // Base height for a single transaction
    const baseHeight = 61.4

    // If no transactions or only one, use the base height
    if (transactionsToDisplay.length <= 1) {
      return baseHeight
    }

    // Otherwise, calculate height based on number of transactions
    return (
      (baseHeight / transactionsToDisplay.length) * transactionsToDisplay.length
    )
  }

  const rowHeight = calculateRowHeight()

  console.log({ rowHeight, transactionsToDisplay })

  return (
    <div className="flex-1 overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="h-[52px] border-b bg-[#F9FAFB]">
          <TableRow className="!border-b-0">
            <TableHead className="border-r px-6 text-left">Date</TableHead>
            <TableHead className="border-r px-6 text-left">
              Description
            </TableHead>
            <TableHead className="px-6 text-left">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {status === 'empty' ? (
            <TableRow
              className="h-0 hover:bg-white"
              style={{ height: `${rowHeight + 5}px` }}
            >
              <TableCell className="border-r"></TableCell>
              <TableCell className="border-r px-6"></TableCell>
              <TableCell className="px-6"></TableCell>
            </TableRow>
          ) : transactionsToDisplay.length > 0 ? (
            transactionsToDisplay.length === 1 ? (
              // Single transaction row
              <TableRow
                key={transactionsToDisplay[0].id}
                className={cn(getRowStyles())}
                style={{
                  height: !!NoOfMatchedData
                    ? `${rowHeight * NoOfMatchedData + 5}px`
                    : `${rowHeight}px`,
                }}
              >
                <TableCell className="border-r px-6 text-ellipsis whitespace-nowrap">
                  {transactionsToDisplay[0]?.date}
                </TableCell>
                <TableCell className="border-r px-6 text-ellipsis whitespace-nowrap">
                  {transactionsToDisplay[0]?.description}
                </TableCell>
                <TableCell className="px-6 text-ellipsis whitespace-nowrap">
                  {transactionsToDisplay[0]?.amount}
                </TableCell>
              </TableRow>
            ) : (
              // Multiple transactions
              transactionsToDisplay.map((txn) => (
                <TableRow
                  key={txn.id}
                  className={cn(getRowStyles())}
                  style={{ height: `${rowHeight + 3}px` }}
                >
                  <TableCell className="border-r px-6 text-ellipsis whitespace-nowrap">
                    {txn?.date}
                  </TableCell>
                  <TableCell className="border-r px-6 text-ellipsis whitespace-nowrap">
                    {txn?.description}
                  </TableCell>
                  <TableCell className="px-6 text-ellipsis whitespace-nowrap">
                    {txn?.amount}
                  </TableCell>
                </TableRow>
              ))
            )
          ) : (
            <TableRow
              className={cn(getRowStyles())}
              style={{ height: `${rowHeight}px` }}
            >
              <TableCell colSpan={3} className="px-6 text-center text-gray-500">
                No transaction data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
