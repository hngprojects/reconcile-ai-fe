import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/src/components/context/AuthContext";
import { GoogleIcon, LogoIcon } from "../Icon/Icons";

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const GoogleAuthModal = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}: GoogleAuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error("Failed to initialize Google Sign In:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[90%] md:!max-w-[535px] h-auto rounded-[12px] bg-white p-0 border-none mx-auto"
        closeButton={false}
        aria-labelledby="auth-title"
        aria-describedby="auth-description"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 md:right-6 top-4 md:top-6 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>

        <div className="px-4 md:px-6 py-8 md:py-[76px] flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <LogoIcon className="w-9 h-9 sm:w-12 sm:h-12" />
            <h2
              id="auth-title"
              className="font-baloo font-extrabold text-2xl md:text-[28px] leading-none text-[#2E604A] -mt-4"
            >
              ReconXi
            </h2>
            <p
              id="auth-description"
              className="font-openSans text-[14px] leading-[140%] text-[#475569] text-center max-w-[400px]"
            >
              Use your Google account to get started quickly
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full md:w-[487px] h-[48px] md:h-[64px] cursor-pointer rounded-[8px] 
                     border border-[#CBD5E1] flex items-center justify-center gap-[10px] 
                     px-4 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
            aria-label="Continue with Google"
          >
            <GoogleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[#475569] font-medium text-sm md:text-base">
              {isLoading ? "Loading..." : "Continue with Google"}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-inter font-semibold text-[13px] leading-[120%] text-[#525252]">
              Already Have an Account?
            </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-inter font-bold text-[13px] leading-[120%] text-[#2E604A] hover:underline cursor-pointer"
              aria-label="Switch to login"
            >
              Login
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleAuthModal;
