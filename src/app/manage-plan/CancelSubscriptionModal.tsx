import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { AlertCircle } from "lucide-react";

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
}

export const CancelSubscriptionModal: React.FC<
  CancelSubscriptionModalProps
> = ({ isOpen, onClose, onCancel }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="border border-[1px solid ] border-[#FDA29B] rounded-xl p-[16px] space-y-[8px]">
          <DialogHeader>
            <DialogTitle className="text-[#B42318]">
              <AlertCircle className="mr-2 h-5 w-5 mb-[16px]" />
              Important
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-[#B42318]">
            Canceling your subscription will downgrade your account to the Free
            plan at the end of your current billing period.
          </DialogDescription>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">What you will lose:</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <AlertCircle className="mr-2 h-4 w-4 " />
              Reconcile up to 20 transactions/month
            </li>
            <li className="flex items-start">
              <AlertCircle className="mr-2 h-4 w-4 " />
              Basic AI matching (date, amount, description)
            </li>
            <li className="flex items-start">
              <AlertCircle className="mr-2 h-4 w-4 " />
              Export results to CSV
            </li>
            <li className="flex items-start">
              <AlertCircle className="mr-2 h-4 w-4  " />
              Manual adjustments (unlink and match errors)
            </li>
          </ul>
        </div>

        <DialogFooter>
          <Button variant="outline" className="mt-[24px] border border-[#E63946] border-[2px] h-[47px] py-[12px] px-[24px] text-[#E63946]" onClick={onCancel}>
            Cancel Subscription
          </Button>
          <Button className="bg-[#2E604A] py-[14px] mt-[24px] px-[16px] h-[47px]" onClick={onClose}>
            Keep Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
