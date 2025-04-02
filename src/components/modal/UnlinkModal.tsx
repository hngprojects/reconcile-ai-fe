import { Loader2 } from 'lucide-react'
import { DangerIcon } from '../Icon/Icons'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogFooter } from '../ui/dialog'

interface UnlinkModalProps {
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onConfirm: () => void
}

const UnlinkModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: UnlinkModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="unlink-modal-description"
      >
        <div className="sr-only" id="unlink-modal-description">
          Confirm unlinking of matched transactions
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center self-start rounded-full border-10 border-[#FEF3F2] bg-[#FEE4E2]">
            <DangerIcon />
          </div>
          <div className="self-start">
            <h3 className="mb-3 text-lg font-semibold text-[#101828]">
              Are you sure you want to unlink? <br />
              This will un-match the records.
            </h3>
          </div>

          <DialogFooter className="grid w-full grid-cols-2 gap-2 sm:gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full cursor-pointer border-[#D0D5DD] bg-white font-semibold text-[#344054] hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="w-full cursor-pointer bg-[#EC261F] font-semibold hover:bg-[#EC261F]/80"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Unlink'
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UnlinkModal
