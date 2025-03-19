import { useEffect } from "react";
import { useAuth } from "@/src/components/context/AuthContext";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { StarsIcon } from "../../Icon/Icons";
import { UploadModalProps } from "./types";

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const { user } = useAuth();
  const isAuthenticated = Boolean(user?.email);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              <p className="text-gray-600 text-sm text-center">
                Your files are being processed. You can continue browsing while
                we work on it.
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UploadModal;
