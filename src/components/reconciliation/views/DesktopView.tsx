/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState, useTransition } from 'react'
import { BankTable } from '../tables/BankTable'
import { LedgerTable } from '../tables/LedgerTable'
import { PaginationControls } from '../PaginationControls'
import { StatusTable } from '../tables/StatusTable'
import { DownloadCloudIcon, Loader2 } from 'lucide-react'
import UnlinkModal from '../../modal/UnlinkModal'
import { useReconciliation } from '@/context/ReconciliationProvider'
import { exportReconciliation } from '@/lib/api'
import Link from 'next/link'
import { Loader } from '@/components/ui/loader'
import { useReconcilationsById } from '@/app/queries'

export default function DesktopView({ id }: { id: string }) {
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [isExporting, startExporting] = useTransition()
  // const [showSuccessToast, setShowSuccessToast] = useState(false)
  // const [showErrorToast, setShowErrorToast] = useState(false)
  const { isPending } = useReconcilationsById(id)

  const {
    handleUnlink: onUnlink,
    showUnlinkModal,
    setShowUnlinkModal,
    isLoading,
    selectedRow,
    setSelectedRow,
    userPlan,
    loading,
  } = useReconciliation()

  // Add plan validation helper
  const hasPlanAccess = (featureType: 'export' | 'unlink' | 'match') => {
    if (!featureType) return false

    switch (userPlan) {
      case 'starter':
        return true
      case 'basic':
        return false
      default:
        return true // business plan has all features
    }
  }

  // useEffect(() => {
  //   if (showErrorModal) {
  //     // setToastMessage('CSV Table Structure not currently supported!')
  //     setShowErrorToast(true)
  //     setShowErrorModal(false)
  //   }
  // }, [showErrorModal, setShowErrorModal])

  const handleExport = async () => {
    startExporting(async () => {
      try {
        await exportReconciliation(id)
        // setShowSuccessToast(true)
      } catch (error: unknown) {
        console.error('Export error:', error)
      }
    })
  }

  return (
    <>
      {isPending || loading ? (
        <Loader />
      ) : (
        <div className="space-y-6 py-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Matched Results</h1>
            <div className="flex gap-4">
              <Link
                className="font-inter h-[44px] cursor-pointer rounded-[8px] bg-[#2E604A] px-6 py-3 text-[14px] leading-[20px] font-semibold text-white hover:bg-[#2E604A]/90"
                href="/file-upload"
              >
                Re-upload
              </Link>
              {hasPlanAccess('export') && (
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

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            {/* Bank Statement Table */}
            <div className="">
              <h2 className="mb-2 ml-2.5 text-lg font-medium">
                Bank Statement
              </h2>
              <BankTable />
            </div>

            {/* Status Column */}
            <div className="mt-[36px] w-[150px]">
              <StatusTable />
            </div>

            {/* Company Ledger Table */}
            <div className="">
              <h2 className="mb-2 ml-2.5 text-lg font-medium">
                Company Ledger
              </h2>
              <LedgerTable />
            </div>
          </div>

          <PaginationControls />

          {/* Conditionally render unlink modal based on plan */}
          {
            //hasPlanAccess("unlink") && (
            <UnlinkModal
              isOpen={showUnlinkModal}
              isLoading={isLoading}
              onClose={() => {
                setShowUnlinkModal(false)
                setSelectedRow(null)
              }}
              onConfirm={async () => {
                if (!selectedRow) return

                if (selectedRow.statements && selectedRow.ledgers) {
                  await onUnlink(
                    selectedRow.statements.map((stat) => stat.bank_txn),
                    selectedRow.ledgers.map((ledg) => ledg.ledger_txn)
                  )
                  setSelectedRow(null)
                }
              }}
            />
            //)
          }
        </div>
      )}
    </>
  )
}
