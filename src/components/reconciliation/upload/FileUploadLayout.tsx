import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import UploadCard from './UploadCard'
import { toast } from 'sonner'
import { reconcileFiles } from '@/lib/api'
import { FileUploadLayoutProps } from './types'
import Container from '@/components/Container'
import ErrorModal from '@/components/modal/ErrorModal'
import { countCsvRows } from '@/utils/csvHelpers'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function FileUploadLayout({
  onReconcile,
}: FileUploadLayoutProps) {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const [bankFiles, setBankFiles] = useState<File[]>([])
  const [ledgerFiles, setLedgerFiles] = useState<File[]>([])
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorCode, setErrorCode] = useState<number>()
  const router = useRouter()

  const fetchPlanAndCount = useCallback(async () => {
    try {
      // Plan and count fetching logic commented out
    } catch (error) {
      console.error('Error fetching user plan:', error)
    }
  }, [])

  useEffect(() => {
    fetchPlanAndCount()
  }, [fetchPlanAndCount])

  const handleFileDelete = (fileName: string, type: 'bank' | 'ledger') => {
    if (type === 'bank') {
      setBankFiles((files) => files.filter((f) => f.name !== fileName))
    } else {
      setLedgerFiles((files) => files.filter((f) => f.name !== fileName))
    }
  }

  const validateRowCount = async (files: File[]): Promise<boolean> => {
    if (!isAuthenticated) return true

    const totalRows = await Promise.all(files.map(countCsvRows))
    return totalRows.reduce((sum, count) => sum + count, 0) <= 100
  }

  const handleReconciliation = async () => {
    if (bankFiles.length === 0 || ledgerFiles.length === 0) return

    try {
      if (!isAuthenticated) {
        const [bankValid, ledgerValid] = await Promise.all([
          validateRowCount(bankFiles),
          validateRowCount(ledgerFiles),
        ])

        if (!bankValid || !ledgerValid) {
          setErrorCode(403)
          setShowErrorModal(true)
          return
        }
      }

      const toastId = toast.loading(
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Processing Reconciliation</h2>
          <p className="text-sm text-gray-600">
            {isAuthenticated
              ? "You will get an email notification when it's ready"
              : 'Your files are being processed'}
          </p>
        </div>,
        { duration: Infinity }
      )

      const result = await reconcileFiles(bankFiles, ledgerFiles)

      if (result.status === 'error') {
        toast.dismiss(toastId)
        setErrorCode(result.code)
        setShowErrorModal(true)
        return
      }

      if (result.status === 'success') {
        setTimeout(() => {
          toast.dismiss(toastId)
        }, 5000)

        router.push('/dashboard')

        localStorage.setItem('reconciliation_id', result.data.reconciliation_id)
        setBankFiles([])
        setLedgerFiles([])
      }

      setTimeout(() => {
        onReconcile(bankFiles, ledgerFiles)
      }, 1000)
    } catch (error) {
      console.error('Error in reconciliation handler:', error)
      const reconciliationError = error as Error & {
        code?: number
        status?: number
      }
      setErrorCode(reconciliationError.code || reconciliationError.status)
      setShowErrorModal(true)
    }
  }

  return (
    <Container className="my-10">
      <div className="flex flex-col justify-center gap-[40px] lg:flex-row">
        <UploadCard
          title="Upload Bank Statement"
          type="bank"
          files={bankFiles}
          onFilesSelect={setBankFiles}
          onFileDelete={(fileName) => handleFileDelete(fileName, 'bank')}
          existingFiles={[...bankFiles, ...ledgerFiles].map((f) => f.name)}
        />
        <UploadCard
          title="Upload Company Ledger"
          type="ledger"
          files={ledgerFiles}
          onFilesSelect={setLedgerFiles}
          onFileDelete={(fileName) => handleFileDelete(fileName, 'ledger')}
          existingFiles={[...bankFiles, ...ledgerFiles].map((f) => f.name)}
        />
      </div>

      <Button
        onClick={handleReconciliation}
        disabled={
          bankFiles.length === 0 || ledgerFiles.length === 0 || !isAuthenticated
        }
        className="disabled:bg-opacity-50 mx-auto mt-[40px] block h-[64px] w-full cursor-pointer rounded-[8px] bg-[#2E604A] px-4 py-[16px] md:w-[552px] md:px-[200px]"
      >
        Reconcile
      </Button>

      {showErrorModal && (
        <ErrorModal
          open={showErrorModal}
          onOpenChange={() => setShowErrorModal(false)}
          errorCode={errorCode}
        />
      )}
    </Container>
  )
}
