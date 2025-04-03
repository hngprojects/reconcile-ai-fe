'use client'

import { useState } from 'react'
import { FileSpreadsheet, Calculator, BarChart3 } from 'lucide-react'
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

type DialogType = 'add-transaction' | 'add-ledger' | null

export function QuickActions() {
  const [activeDialog, setActiveDialog] = useState<DialogType>(null)
  const router = useRouter()

  const handleOpenDialog = (dialog: DialogType) => setActiveDialog(dialog)
  const handleCloseDialog = () => setActiveDialog(null)
  const handleReconcile = () => {
    router.push('/reconciliation')
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
          icon={<BarChart3 />}
          label="P&L Report"
          onClick={() => (window.location.href = '/reports')}
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
    </section>
  )
}
