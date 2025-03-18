import { useState, useEffect } from "react";
import { useAuth } from "@/src/components/context/AuthContext";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { Progress } from "@/src/components/ui/progress";
import { StarsIcon, CheckIcon } from "../../Icon/Icons"; // Ensure CheckIcon is imported
import { toast } from "sonner";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
}

export function UploadModal({ isOpen, onClose, progress }: UploadModalProps) {
  const { user } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const [toastShown, setToastShown] = useState(false);
  const isAuthenticated = Boolean(user?.email);

  useEffect(() => {
    if (isAuthenticated && progress >= 100 && !emailSent && !toastShown) {
      if (user?.email) {
        toast.success(`Reconciliation result has been sent to ${user.email}.`, {
          icon: <CheckIcon className="w-5 h-5" />,
          style: { background: "#EEFFEE" },
          action: {
            label: <p className="bg-inherit">Close</p>,
            onClick: () => toast.dismiss(),
          },
        });
        setEmailSent(true);
      }
      setToastShown(true);
    }
  }, [isAuthenticated, progress, emailSent, user, toastShown]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        if (progress >= 100) onClose();
      }}
    >
      <DialogContent
        className="max-w-[400px] flex flex-col h-auto items-center justify-center"
        closeButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        aria-describedby="upload-progress-description"
      >
        <div className="sr-only" id="upload-progress-description">
          Upload progress modal showing reconciliation processing status
        </div>
        <div className="bg-white w-[90%] max-md:mx-auto md:w-[436px] h-[213px] rounded-[12px] flex flex-col items-center justify-between p-8">
          <StarsIcon className="w-6 h-6" />
          <h2 className="text-[#0F172A] font-semibold text-lg md:text-xl text-center">
            Processing Reconciliation
          </h2>
          {isAuthenticated ? (
            <>
              <p className="text-sm text-[#475569] text-center">
                The reconciliation process has begun
              </p>
              <p className="text-[#47556999] text-xs">
                You will get an E-mail notification when it’s ready
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-[#475569] text-center">
                Please wait while AI does the magic
              </p>
              <p className="text-[#47556999] text-xs">
                Matching records, it will be with you shortly.
              </p>
            </>
          )}
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-500">{progress}% Complete</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UploadModal;
