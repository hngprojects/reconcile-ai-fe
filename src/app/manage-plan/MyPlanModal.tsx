import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Progress } from "@/src/components/ui/progress";

interface MyPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCancelModal: () => void;
}

export const MyPlanModal: React.FC<MyPlanModalProps> = ({
  isOpen,
  onClose,
  onOpenCancelModal,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="flex items-center justify-between border-b pb-4 ">
          <DialogTitle className="flex-1 text-start mt-[-24px]">
            My plan
          </DialogTitle>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-y-4">
            <p className="font-semibold text-[#475467] text-muted-foreground font-semibold">
              Current Plan
            </p>
            <p className="font-semibold text-right text-sm ">Starter</p>

            <p className="text-sm text-muted-foreground font-medium">Price</p>
            <p className="font-semibold text-right font-medium">$10</p>

            <p className="text-sm text-muted-foreground font-medium">
              Billing interval
            </p>
            <p className="font-semibold text-right font-medium">Monthly</p>

            <p className="text-sm text-muted-foreground font-medium">
              Reconciliations left
            </p>
            <p className="font-semibold text-right font-medium">12/20</p>
          </div>

          <Progress value={(12 / 20) * 100} className="h-1 bg-gray-200" />
          <p className="text-sm text-center my-[4px]">
            Next bill on <span className="font-semibold">24 April 2025</span>
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="w-[320px] h-[47px] mx-[auto] border-red-500 text-red-500 hover:bg-red-50"
            onClick={onOpenCancelModal}
          >
            Cancel Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
