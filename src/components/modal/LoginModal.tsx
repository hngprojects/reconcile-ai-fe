// LoginModal.tsx
import { useState } from "react";
import GoogleAuthModal from "@/src/components/modal/GoogleAuthModal";
import SignupModal from "@/src/components/modal/SignupModal"; 

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const [isSignupOpen, setisSignupOpen] = useState(false);

    const openSignupModal = () => {
      onClose(); 
      setisSignupOpen(true); 
    };

  return (
    <>
      <GoogleAuthModal
        isOpen={isOpen}
        onClose={onClose}
        heading="ReconXi"
        intro="Welcome Back!"
        description="Access your financial data and manage your reconciliations. Log in to continue optimizing your workflow!"
        ctaText="Login with Google"
        footerText="Don't Have an account?"
        footerLinkText="Register"
        onFooterLinkClick={openSignupModal}
      />

      <SignupModal isOpen={isSignupOpen} onClose={() => setisSignupOpen(false)} />
    </>
  );
};

export default LoginModal;