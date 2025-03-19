import { useState } from "react";
import GoogleAuthModal from "@/src/components/modal/GoogleAuthModal";
import LoginModal from "@/src/components/modal/LoginModal"; 

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLoginModal = () => {
    onClose(); 
    setIsLoginOpen(true); 
  };

  return (
    <>
      <GoogleAuthModal
        isOpen={isOpen}
        onClose={onClose}
        heading="ReconXi"
        intro="Sign Up - Simplify Your Reconciliation"
        description="Get started today and take control of your financial records with ease"
        ctaText="Sign Up with Google"
        footerText="Already have an account?"
        footerLinkText="Login"
        onFooterLinkClick={openLoginModal} 
      />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default SignupModal;