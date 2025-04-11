'use client'

import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { useReconciliation } from '@/context/ReconciliationProvider'
import { exportReconciliation } from '@/actions/api'
import { cn } from '@/lib/utils'
import { DownloadCloudIcon, Loader2, MoreVertical } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import {
  addValueAndLabel,
  TransactionOption,
} from '../../../helpers/searchComboxOptionExpander'
import { FrontendTransaction } from '../../../types/frontendResponseTypes'
import { CheckIcon } from '../../Icon/Icons'
import UnlinkModal from '../../modal/UnlinkModal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { StatusBadge } from '../StatusBadge'
import { SuccessToast } from '../SuccessToast'
import { FindPossibleMatchModal } from '../modals/FindPossibleMatchModal'
import QuickFindAndMatchComboBox from '../quickFind/QuickFindAndMatchComboBox'
import { useReconcilationsById } from '@/app/queries'

export function MobileView({ id }: { id: string }) {
  const {
    paginatedData,
    pagination,
    totalItems,
    onPreviousPage,
    onNextPage,
    canPreviousPage,
    canNextPage,
    unmatchedBankTransactions,
    unmatchedLedgerTransactions,
    handleMatch: onMatch,
    handleUnlink: onUnlink,
    showUnlinkModalMobile,
    setShowUnlinkModalMobile,
    setShowUnlinkModal,
    isLoading,
    userPlan,
    setSelectedRow,
    selectedRow,
    loading,
  } = useReconciliation()
  const { isPending } = useReconcilationsById(id)

  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [showErrorToast, setShowErrorToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [isExporting, startExporting] = useTransition()
  const [modalOpen, setModalOpen] = useState(false)

  const possibleMatches =
    selectedRow?.statements === null
      ? unmatchedBankTransactions
      : unmatchedLedgerTransactions

  const { pageIndex, pageSize } = pagination

  const startItem = pageIndex * pageSize + 1
  const endItem = Math.min((pageIndex + 1) * pageSize, totalItems)

  const handleExport = async () => {
    startExporting(async () => {
      try {
        await exportReconciliation(id)
        setToastMessage('Your data has been exported successfully!')
        setShowSuccessToast(true)
      } catch (error: unknown) {
        console.error('Export error:', error)
        setToastMessage(
          error instanceof Error ? error.message : 'Failed to export data'
        )
      }
    })
  }

  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showSuccessToast])

  // Show CSV structure error toast
  useEffect(() => {
    if (showErrorModal) {
      setToastMessage('CSV Table Structure not currently supported!')
      setShowErrorToast(true)
      setShowErrorModal(false)
    }
  }, [showErrorModal, setShowErrorModal])

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined

    if (showSuccessToast || showErrorToast) {
      timer = setTimeout(() => {
        setShowSuccessToast(false)
        setShowErrorToast(false)
      }, 5000)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [showSuccessToast, showErrorToast])

  return (
    <>
      {isPending || loading ? (
        <Loader />
      ) : (
        <div className="space-y-3 py-6">
          {showSuccessToast && (
            <div className="animate-in fade-in fixed top-4 right-4 z-50 duration-500">
              <SuccessToast
                message={toastMessage}
                onClose={() => setShowSuccessToast(false)}
              />
            </div>
          )}

          {/* Conditional export button */}
          <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row">
            <h1 className="text-2xl font-semibold">Matched Results</h1>
            <div className="flex gap-4">
              <a href="/file-upload">
                <button
                  type="button"
                  className="flex h-12 w-[150px] cursor-pointer items-center justify-center rounded-md border border-[#2E604A] !bg-[#2E604A] px-6 py-4 font-medium !text-white hover:bg-[#2E604A]/90"
                >
                  Re-upload
                </button>
              </a>
              {userPlan === 'business' && (
                <button
                  type="button"
                  className="flex h-12 w-[150px] cursor-pointer items-center justify-center rounded-md border border-[#2E604A] px-6 py-4 font-medium text-[#2E604A] hover:bg-gray-100"
                  onClick={handleExport}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                      Exporting...
                    </>
                  ) : (
                    <>
                      <DownloadCloudIcon className="mr-2 h-5 w-5" />
                      Export
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Transaction Cards */}
          {paginatedData.map((item, index) => {
            const possibleMatches =
              item.statements !== null
                ? unmatchedLedgerTransactions
                : unmatchedBankTransactions

            const transactionOptions: TransactionOption[] =
              addValueAndLabel(possibleMatches)

            const handleSearch = (query: string) => {
              // Always return full list for empty queries
              if (!query.trim()) return transactionOptions

              return transactionOptions.filter(
                (transaction) =>
                  transaction.description
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                  transaction.date.toLowerCase().includes(query.toLowerCase())
              )
            }

            return (
              <div
                key={`transaction-${item.reconciliation_pair_id || index}`}
                className={cn(
                  'rounded-lg border shadow-sm',
                  item.matched ? 'bg-[#F3FEFA]' : 'bg-[#FFF4F0]',
                  {
                    'rounded-t-lg': index === 0,
                  }
                )}
              >
                {/* Column Headers */}
                {index === 0 && (
                  <div className="flex items-center justify-between rounded-t-md border-b bg-gray-50 px-4 py-3">
                    <div className="text-sm font-medium text-gray-500">
                      Date/Description
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      Amount
                    </div>
                  </div>
                )}

                <div className="space-y-4 p-4">
                  {/* Bank Statement */}
                  {item.statements?.map(
                    (stmt, index) =>
                      stmt.bank_txn !== null && (
                        <div className="space-y-2" key={index}>
                          <div className="flex justify-between">
                            <div className="flex flex-col">
                              <div className="text-sm font-semibold text-gray-900">
                                Bank Statement
                              </div>
                              <div className="space-y-1">
                                <div className="text-sm text-gray-700">
                                  {stmt.bank_txn?.date}
                                </div>
                                <div className="text-lg text-gray-700">
                                  {stmt.bank_txn?.description}
                                </div>
                              </div>
                            </div>

                            <div className="font-medium text-gray-600">
                              {stmt.bank_txn?.amount}
                            </div>
                          </div>

                          {item.matched && (
                            <div className="flex items-center gap-3">
                              {userPlan === 'business' && (
                                <button
                                  type="button"
                                  title="Unlink matching transactions"
                                  className="group inline-block cursor-pointer rounded-3xl border-[0.5px] border-[#007A55] p-2 hover:bg-[#CEFFED]"
                                  onClick={() => {
                                    setShowUnlinkModalMobile(true)
                                    setSelectedRow(item)
                                  }}
                                >
                                  <StatusBadge
                                    matched={item.matched}
                                    matchScore={stmt.score}
                                  />
                                </button>
                              )}

                              <hr className="flex-1 border border-gray-200/70" />
                            </div>
                          )}
                        </div>
                      )
                  )}

                  {/* Company Ledger - Only show if matched */}
                  {item.ledgers?.map(
                    (ldgr, index) =>
                      ldgr.ledger_txn !== null && (
                        <div className="flex justify-between" key={index}>
                          <div className="flex flex-col">
                            <div className="text-sm font-semibold text-gray-900">
                              Company Ledger
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm text-gray-700">
                                {ldgr.ledger_txn?.date}
                              </div>
                              <div className="text-lg text-gray-700">
                                {ldgr.ledger_txn?.description}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end justify-between">
                            <div className="font-medium text-gray-600">
                              {ldgr.ledger_txn?.amount}
                            </div>

                            {item.statements !== null &&
                              userPlan === 'business' && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      className="size-8 p-0"
                                    >
                                      <span className="sr-only">Open menu</span>
                                      <MoreVertical className="h-4 w-4 text-gray-600" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedRow(item)
                                        setShowUnlinkModal(true)
                                      }}
                                      className="gap-0.5"
                                    >
                                      <CheckIcon className="h-7 w-7 text-[#333333]" />
                                      <span className="cursor-pointer text-sm text-nowrap text-[#333333]">
                                        Unlink Matched
                                      </span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                          </div>
                        </div>
                      )
                  )}

                  {/* Show Unmatched status if not matched */}
                  {!item.matched && (
                    <div className="flex flex-col items-start justify-between gap-5 pt-1">
                      <div className="inline-block rounded-3xl border-[0.5px] border-[#C50700] p-2">
                        <StatusBadge matched={false} />
                      </div>

                      <div className="flex w-full items-center justify-between gap-3">
                        {userPlan === 'business' && (
                          <QuickFindAndMatchComboBox
                            commandProps={{
                              label: 'Select possible match',
                            }}
                            defaultOptions={transactionOptions}
                            onSearchSync={handleSearch}
                            placeholder="Find possible match"
                            hidePlaceholderWhenSelected
                            onConfirm={(option) => {
                              const selectedOption: FrontendTransaction = {
                                id: option.id,
                                description: option.description,
                                date: option.date,
                                amount: option.amount,
                              }
                              console.log('Confirmed:', {
                                selectedOption,
                                option,
                              })

                              if (item.ledgers) {
                                onMatch(
                                  [selectedOption],
                                  item.ledgers.map(
                                    (ledger) => ledger.ledger_txn
                                  )
                                )
                              }

                              if (item.statements) {
                                onMatch(
                                  item.statements.map(
                                    (statement) => statement.bank_txn
                                  ),
                                  [selectedOption]
                                )
                              }
                            }}
                            emptyIndicator={
                              <p className="text-center text-sm">
                                No transactions found
                              </p>
                            }
                          />
                        )}

                        {userPlan === 'business' && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="size-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4 text-gray-600" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="gap-0.5"
                                onClick={() => {
                                  setSelectedRow(item)
                                  setModalOpen(true)
                                }}
                              >
                                <CheckIcon className="h-7 w-7 text-[#333333]" />
                                <span className="cursor-pointer text-sm text-nowrap text-[#333333]">
                                  Find Possible Match
                                </span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {/* Pagination */}
          <div className="flex items-center justify-between py-4">
            <div className="text-sm text-gray-500">
              Showing {startItem} - {endItem} out of {totalItems}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onPreviousPage}
                disabled={!canPreviousPage}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onNextPage}
                disabled={!canNextPage}
              >
                Next
              </Button>
            </div>
          </div>

          <FindPossibleMatchModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            reconciledDataRow={selectedRow}
            potentialMatches={possibleMatches}
            onMatch={onMatch}
          />

          {userPlan === 'business' && (
            <UnlinkModal
              isOpen={showUnlinkModalMobile}
              isLoading={isLoading}
              onClose={() => {
                setShowUnlinkModalMobile(false)
                setSelectedRow(null)
              }}
              onConfirm={async () => {
                if (!selectedRow) return

                if (selectedRow.statements && selectedRow.ledgers) {
                  await onUnlink(
                    selectedRow.statements.map(
                      (statement) => statement.bank_txn
                    ),
                    selectedRow.ledgers.map((ledger) => ledger.ledger_txn)
                  )
                  setSelectedRow(null)
                }
              }}
            />
          )}
        </div>
      )}
    </>
  )
}
