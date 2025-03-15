import { Loader2 } from "lucide-react";
import { DangerIcon } from "../Icon/Icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface UnlinkModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
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
        aria-describedby="unlink-description"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Unlink Transaction</DialogTitle>
          <DialogDescription id="unlink-description">
            Unlink transaction that was previously matched by the AI
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex justify-center items-center w-16 h-16 rounded-full self-start bg-[#FEE4E2] border-10 border-[#FEF3F2] ">
            <DangerIcon />
          </div>
          <div className="self-start">
            <h3 className="text-lg font-semibold text-[#101828] mb-3">
              Are you sure you want to unlink? <br />
              This will un-match the records.
            </h3>
          </div>

          <DialogFooter className="w-full grid grid-cols-2 gap-2 sm:gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full bg-white font-semibold hover:bg-gray-100  cursor-pointer border-[#D0D5DD]  text-[#344054]"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="w-full font-semibold bg-[#EC261F] cursor-pointer hover:bg-[#EC261F]/80"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Unlink"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnlinkModal;
