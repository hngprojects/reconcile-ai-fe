'use client'

import React, { useState } from 'react'
import AddLedgerEntryModal from '@/components/modal/AddLedgerEntryModal'
import { Button } from '@/components/ui/button'

export default function AddLedgerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSave = (data: unknown) => {
    console.log('Ledger entry saved:', data)
    // Process your data here
  }

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Add Ledger Entry</Button>
      <AddLedgerEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}
