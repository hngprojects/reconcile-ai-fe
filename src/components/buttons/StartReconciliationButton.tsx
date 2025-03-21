"use client";

import { useAuth } from "@/src/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import LoginModal from "../modal/LoginModal";
import GoogleAuthModal from "../modal/GoogleAuthModal";

interface StartReconciliationButtonProps {
  className?: string;
  "aria-label"?: string;
  text?: string;
}

export default function StartReconciliationButton({
  className,
  "aria-label": ariaLabel,
  text = "Start Reconciliation",
}: StartReconciliationButtonProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/file-upload");
    } else {
      setShowLoginModal(true);
    }
  };

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowAuthModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowAuthModal(false);
    setShowLoginModal(true);
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={
          className ||
          "bg-[#297B65] py-3 px-6 rounded-md font-semibold inline-flex justify-center items-center min-h-[48px] w-full sm:w-auto text-base text-white hover:bg-[#297B65]/90 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-[#297B65] focus:outline-none transition-colors"
        }
        aria-label={ariaLabel || text}
      >
        {text}
      </motion.button>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={handleSwitchToSignup}
      />

      <GoogleAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
}
