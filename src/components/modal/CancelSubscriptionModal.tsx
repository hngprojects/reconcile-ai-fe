import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { CircleAlertIcon, X } from "lucide-react";

interface CancelSubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CancelSubscriptionModal: React.FC<CancelSubscriptionModalProps> = ({
  open,
  onOpenChange,
}) => {
  const handleCancel = () => {
    // Add cancel subscription logic here
    onOpenChange(false);
  };

  const handleKeep = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[90%] md:!max-w-[535px] h-auto rounded-[12px] bg-white p-0 border-none mx-auto"
        closeButton={false}
        aria-labelledby="auth-title"
        aria-describedby="auth-description"
      >
        <button
          type="button"
          onClick={onOpenChange}
          className="absolute right-4 md:right-6 top-4 md:top-6 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>

        <div className="p-4 sm:p-6">
          <div className="mt-6 flex flex-col bg-[#FFFBFA] border border-[#FDA29B] rounded-xl p-4 gap-3">
              <CircleAlertIcon
                className="w-5 h-5 flex-shrink-0 text-[#D92D20]"
              />
              <div>
                <h4 className="font-inter font-semibold text-sm text-[#B42318]">
                  Important
                </h4>
                <p className="text-sm text-[#B42318]">
                  Canceling your subscription will downgrade your account to the
                  Free plan at the end of your current billing period.
                </p>
            </div>
          </div>

          <div className="mt-4 py-5 px-4">
            <h3 className="font-inter font-medium text-lg text-[#101828] mb-3">
              What you will lose
            </h3>
            <ul className="space-y-3">
              {[
                "Reconcile up to 20 transaction/month",
                "Basic AI matching (date, amount, description)",
                "Export results to CSV",
                "Manual adjustments (unlink and match errors)",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-[#333333]"
                >
                  <CircleAlertIcon className="w-4 h-4 border-[#333333] flex-shrink-0" />
                  <span className="font-inter font-normal text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
            <button
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 py-3 border-2 border-[#E63946] text-[#E63946] rounded-lg font-medium hover:bg-[#E63946]/10 transition-colors cursor-pointer"
            >
              Cancel subscription
            </button>
            <button
              onClick={handleKeep}
              className="w-full sm:w-auto px-4 py-3.5 bg-[#2E604A] text-white rounded-lg font-medium hover:bg-[#2E604A]/90 transition-colors cursor-pointer"
            >
              Keep subscription
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelSubscriptionModal;
