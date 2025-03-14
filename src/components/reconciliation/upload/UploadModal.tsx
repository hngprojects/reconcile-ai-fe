import { useState } from "react";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { Progress } from "@/src/components/ui/progress";
import Image from "next/image";
import starIcon from "@/public/assets/images/star-icon.png";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
}

export function UploadModal({ isOpen, onClose, progress }: UploadModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default: Not Authenticated
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Email submitted:", email);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[400px] flex flex-col h-auto items-center justify-center"
        closeButton={false}
      >
        <div className="bg-white w-[90%] md:w-[436px] rounded-[12px] flex flex-col items-center justify-between p-8">
          <Image
            src={starIcon}
            width={24}
            height={24}
            alt="star-icon"
            className="object-cover"
          />
          <h2 className="text-[#0F172A] font-semibold text-lg md:text-xl text-center">
            Processing Reconciliation
          </h2>

          {isAuthenticated ? (
            // Authenticated user view
            <>
              <p className="text-sm text-[#475569] text-center">
                The reconciliation process has begun.
              </p>
              <p className="text-[#47556999] text-xs text-center">
                You will get an E-mail notification when it’s ready.
              </p>
            </>
          ) : (
            // Unauthenticated user view
            <>
              <p className="text-sm text-[#475569] text-center mt-2">
                The reconciliation process has begun.
              </p>
              <p className="text-xs text-[#47556999] text-center mt-1">
                <a href="#" className="text-[#14532D] font-medium">
                  Sign in
                </a>{" "}
                to get an E-mail when it’s ready or input <br /> your mail
                below.
              </p>
              <div className="flex w-full mt-6 gap-4">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-shrink-0 w-[248px] h-[44px] p-4 rounded-[9px] border border-[#DEDEDE] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#14532D]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleSubmit}
                  className="flex w-[100px] h-[44px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[8px] bg-[#2E604A] text-white hover:bg-green-800 cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </>
          )}

          {/* Common progress bar for both auth and unauth users */}
          <Progress value={progress} className="w-full mt-4" hidden />
          <p className="text-sm text-gray-500" hidden>{progress}% Complete</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UploadModal;
