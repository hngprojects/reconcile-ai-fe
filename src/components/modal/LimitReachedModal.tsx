import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { AlertCircle } from "lucide-react";

interface LimitReachedModalProps {
  open: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export default function LimitReachedModal({ open, onClose }: LimitReachedModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-lg w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>

          <DialogHeader className="text-center">
            <DialogTitle className="text-lg font-semibold">Reconciliation Limit Reached</DialogTitle>
          </DialogHeader>

          <DialogDescription className="text-center text-gray-600 text-sm px-4">
            You&apos;ve used up your reconciliations limit for the current period. 
            Please consider upgrading your plan to continue reconciling transactions.
          </DialogDescription>

          <DialogFooter className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
            <Button 
              variant="outline" 
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-pointer w-full sm:w-auto"
              onClick={onClose}
            >
              Dismiss
            </Button>
            <Button 
              className="bg-[#2E604A] text-white px-4 py-2 rounded-md cursor-pointer w-full sm:w-auto"
              onClick={() => {
                window.location.href = "/manage-plan";
              }}
            >
              Upgrade Plan
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}