import { useState, useEffect } from "react";
import { useAuth } from "@/src/components/context/AuthContext";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { Progress } from "@/src/components/ui/progress";
import { StarsIcon } from "../../Icon/Icons";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
}

export function UploadModal({ isOpen, onClose, progress }: UploadModalProps) {
  const { getUserDetails } = useAuth();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Emaail submitted:", email);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      getUserDetails(token as string);
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [getUserDetails]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[400px] flex flex-col h-auto items-center justify-center"
        closeButton={false}
        // aria-describedby="upload-progress-description"
      >
        <div className="bg-white w-[90%] max-md:mx-auto md:w-[436px] h-[213px] rounded-[12px] flex flex-col items-center justify-between p-8">
          <StarsIcon className="w-6 h-6" />
          <h2 className="text-[#0F172A] font-semibold text-lg md:text-xl text-center">
            Processing Reconciliation
          </h2>
          {isAuthenticated ? (
            // Authenticated User View
            <>
              <p
                id="upload-progress-description"
                className="text-sm text-[#475569] text-center"
              >
                The reconciliation process has begun
              </p>
              <p className="text-[#47556999] text-xs">
                You will get an E-mail notification when it&apos;s ready.
              </p>
            </>
          ) : (
            // Non-Authenticated User View
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
          <p className="text-sm text-gray-500" hidden>
            {progress}% Complete
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UploadModal;