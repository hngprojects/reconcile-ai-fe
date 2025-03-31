import { Dialog, DialogContent } from '@/components/ui/dialog'
import { StarsIcon } from '../../Icon/Icons'
import { UploadModalProps } from './types'
import { useSession } from 'next-auth/react'

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="flex h-auto max-w-[400px] flex-col items-center justify-center"
        closeButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        aria-describedby="upload-progress-description"
      >
        <div className="sr-only" id="upload-progress-description">
          Upload progress modal showing reconciliation processing status
        </div>
        <div className="flex h-[213px] w-[90%] flex-col items-center justify-between rounded-[12px] bg-white p-8 max-md:mx-auto md:w-[436px]">
          <StarsIcon className="h-6 w-6" />
          <h2 className="text-center text-lg font-semibold text-[#0F172A] md:text-xl">
            Processing Reconciliation
          </h2>
          {isAuthenticated ? (
            <>
              <p className="text-center text-sm text-[#475569]">
                The reconciliation process has begun
              </p>
              <p className="text-xs text-[#47556999]">
                You will get an E-mail notification when it’s ready
              </p>
            </>
          ) : (
            <>
              <p className="text-center text-sm text-gray-600">
                Your files are being processed. You can continue browsing while
                we work on it.
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UploadModal
