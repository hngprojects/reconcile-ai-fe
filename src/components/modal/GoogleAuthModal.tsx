import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/src/components/context/AuthContext";

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoogleAuthModal = ({ isOpen, onClose }: GoogleAuthModalProps) => {
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
        aria-describedby="google-auth-modal"
      >
        <button
          onClick={onClose}
          className="absolute right-4 md:right-6 top-4 md:top-6 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>

        <div className="px-4 md:px-6 py-8 md:py-[76px] flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/assets/images/reconAuthLogo.svg"
              alt="ReconXi Logo"
              width={48}
              height={48}
              className="w-[36px] h-[36px] md:w-[48px] md:h-[48px]"
            />
            <h2 className="font-baloo font-extrabold text-2xl md:text-[28px] leading-none text-[#2E604A] -mt-4">
              ReconXi
            </h2>
            <p id="google-auth-modal" className="font-openSans text-xs md:text-sm leading-[140%] text-[#475569] text-center px-2 md:px-0">
              Use your Google account to get started quickly
            </p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full md:w-[487px] h-[48px] md:h-[64px] cursor-pointer rounded-[8px] 
                     border border-[#CBD5E1] flex items-center justify-center gap-[10px] 
                     px-4 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50
                     max-w-[90%] md:max-w-none mx-auto"
          >
            <Image
              src="/assets/images/GoogleIcon.svg"
              alt="Google Logo"
              width={24}
              height={24}
              className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]"
            />
            <span className="text-[#475569] font-medium text-sm md:text-base">
              {isLoading ? "Loading..." : "Continue with Google"}
            </span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleAuthModal;
