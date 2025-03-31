import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface LimitReachedModalProps {
  open: boolean
  onClose: () => void
  onUpgrade: () => void
}

export default function LimitReachedModal({
  open,
  onClose,
}: LimitReachedModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md rounded-lg p-6 sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div className="flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>

          <DialogHeader className="text-center">
            <DialogTitle className="text-lg font-semibold">
              Reconciliation Limit Reached
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="px-4 text-center text-sm text-gray-600">
            You&apos;ve used up your reconciliations limit for the current
            period. Please consider upgrading your plan to continue reconciling
            transactions.
          </DialogDescription>

          <DialogFooter className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              variant="outline"
              className="w-full cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-gray-700 sm:w-auto"
              onClick={onClose}
            >
              Dismiss
            </Button>
            <Button
              className="w-full cursor-pointer rounded-md bg-[#2E604A] px-4 py-2 text-white sm:w-auto"
              onClick={() => {
                window.location.href = '/manage-plan'
              }}
            >
              Upgrade Plan
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
