'use client'

import { useState } from 'react'
import { FileSpreadsheet, Calculator, BarChart3, Mail } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { QuickActionButton } from './quick-action-button'
// import { AddTransactionForm } from './add-transaction-form'
import { AddLedgerForm } from './add-ledger-form'
import { useRouter } from 'next/navigation'

type DialogType = 'add-transaction' | 'add-ledger' | 'pl-report' | null

export function QuickActions() {
  const [activeDialog, setActiveDialog] = useState<DialogType>(null)
  const router = useRouter()

  const handleOpenDialog = (dialog: DialogType) => setActiveDialog(dialog)
  const handleCloseDialog = () => setActiveDialog(null)
  const handleReconcile = () => {
    router.push('/dashboard/reconciliation')
  }

  const handlePLReport = () => {
    handleOpenDialog('pl-report')
    setTimeout(() => {
      handleCloseDialog()
    }, 5000)
  }

  return (
    <section className="mb-8">
      <h2 className="dark:text-foreground mb-4 text-xl font-semibold">
        Quick Actions
      </h2>
      <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <QuickActionButton
          icon={<FileSpreadsheet className="h-5 w-5" />}
          label="Add Ledger"
          onClick={() => handleOpenDialog('add-ledger')}
        />
        <QuickActionButton
          icon={<Calculator className="h-5 w-5" />}
          label="Reconcile"
          onClick={handleReconcile}
        />
        <QuickActionButton
          icon={<BarChart3 className="h-5 w-5" />}
          label="P&L Report"
          onClick={handlePLReport}
        />
      </div>

      {/* Dialogs */}
      {/* <Dialog
        open={activeDialog === 'add-transaction'}
        onOpenChange={(open) => !open && handleCloseDialog()}
      >
        <DialogContent className="max-h-[90vh] sm:max-w-[500px]">
          <ScrollArea className="max-h-[80vh] pr-4">
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
            </DialogHeader>
            <AddTransactionForm onClose={handleCloseDialog} />
          </ScrollArea>
        </DialogContent>
      </Dialog> */}

      <Dialog
        open={activeDialog === 'add-ledger'}
        onOpenChange={(open) => !open && handleCloseDialog()}
      >
        <DialogContent className="max-h-[90vh] sm:max-w-[500px]">
          <ScrollArea className="max-h-[80vh] pr-4">
            <DialogHeader>
              <DialogTitle>Add Ledger Entry</DialogTitle>
            </DialogHeader>
            <AddLedgerForm onClose={handleCloseDialog} />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog === 'pl-report'}
        onOpenChange={(open) => !open && handleCloseDialog()}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="text-primary h-5 w-5" />
              Report Generation Initiated
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground text-sm">
              Your Profit & Loss report is being generated. You will receive a
              detailed PDF report in your registered email address shortly.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
