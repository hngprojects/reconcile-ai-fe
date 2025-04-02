import { Dialog, DialogContent } from '@/components/ui/dialog'
import { CircleAlertIcon, X } from 'lucide-react'

interface CancelSubscriptionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CancelSubscriptionModal: React.FC<CancelSubscriptionModalProps> = ({
  open,
  onOpenChange,
}) => {
  const handleCancel = () => {
    // Add cancel subscription logic here
    onOpenChange(false)
  }

  const handleKeep = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="mx-auto h-auto w-[90%] rounded-[12px] border-none bg-white p-0 md:!max-w-[535px]"
        closeButton={false}
        aria-labelledby="auth-title"
        aria-describedby="auth-description"
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100 md:top-6 md:right-6"
          aria-label="Close authentication modal"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>

        <div className="p-4 sm:p-6">
          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-[#FDA29B] bg-[#FFFBFA] p-4">
            <CircleAlertIcon className="h-5 w-5 flex-shrink-0 text-[#D92D20]" />
            <div>
              <h4 className="font-inter text-sm font-semibold text-[#B42318]">
                Important
              </h4>
              <p className="text-sm text-[#B42318]">
                Canceling your subscription will downgrade your account to the
                Free plan at the end of your current billing period.
              </p>
            </div>
          </div>

          <div className="mt-4 px-4 py-5">
            <h3 className="font-inter mb-3 text-lg font-medium text-[#101828]">
              What you will lose
            </h3>
            <ul className="space-y-3">
              {[
                'Reconcile up to 20 transaction/month',
                'Basic AI matching (date, amount, description)',
                'Export results to CSV',
                'Manual adjustments (unlink and match errors)',
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-[#333333]"
                >
                  <CircleAlertIcon className="h-4 w-4 flex-shrink-0 border-[#333333]" />
                  <span className="font-inter text-sm font-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex flex-col justify-end gap-3 sm:flex-row">
            <button
              onClick={handleCancel}
              className="w-full cursor-pointer rounded-lg border-2 border-[#E63946] px-6 py-3 font-medium text-[#E63946] transition-colors hover:bg-[#E63946]/10 sm:w-auto"
            >
              Cancel subscription
            </button>
            <button
              onClick={handleKeep}
              className="w-full cursor-pointer rounded-lg bg-[#2E604A] px-4 py-3.5 font-medium text-white transition-colors hover:bg-[#2E604A]/90 sm:w-auto"
            >
              Keep subscription
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CancelSubscriptionModal
