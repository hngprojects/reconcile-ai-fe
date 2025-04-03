'use client'

import React, { useState } from 'react'
import UploadLedgerCSVDialog from '@/components/modal/UploadLedgerCSVDialog'
import { Button } from '@/components/ui/button'

export default function UploadLedgerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleUpload = (file: File) => {
    console.log('CSV file uploaded:', file)
    // Process your file here - maybe send to an API endpoint
  }

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Upload Ledger CSV</Button>
      <UploadLedgerCSVDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  )
}
