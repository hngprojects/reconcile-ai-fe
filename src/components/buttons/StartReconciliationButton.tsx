// "use client";

// import { useAuth } from "@/src/components/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import LoginModal from "../modal/LoginModal";
// import GoogleAuthModal from "../modal/GoogleAuthModal";

// interface StartReconciliationButtonProps {
//   className?: string;
//   "aria-label"?: string;
//   text?: string;
// }

// export default function StartReconciliationButton({
//   className,
//   "aria-label": ariaLabel,
//   text = "Start Reconciliation",
// }: StartReconciliationButtonProps) {
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);

//   const handleClick = () => {
//     if (isAuthenticated) {
//       router.push("/file-upload");
//     } else {
//       setShowLoginModal(true);
//     }
//   };

//   const handleSwitchToSignup = () => {
//     setShowLoginModal(false);
//     setShowAuthModal(true);
//   };

//   const handleSwitchToLogin = () => {
//     setShowAuthModal(false);
//     setShowLoginModal(true);
//   };

//   return (
//     <>
//       <motion.button
//         onClick={handleClick}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className={
//           className ||
//           "bg-[#297B65] py-3 px-6 rounded-md font-semibold inline-flex justify-center items-center min-h-[48px] w-full sm:w-auto text-base text-white hover:bg-[#297B65]/90 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-[#297B65] focus:outline-none transition-colors"
//         }
//         aria-label={ariaLabel || text}
//       >
//         {text}
//       </motion.button>

//       <LoginModal
//         isOpen={showLoginModal}
//         onClose={() => setShowLoginModal(false)}
//         onSwitchToSignup={handleSwitchToSignup}
//       />

//       <GoogleAuthModal
//         isOpen={showAuthModal}
//         onClose={() => setShowAuthModal(false)}
//         onSwitchToLogin={handleSwitchToLogin}
//       />
//     </>
//   );
// }

"use client";

import { useAuth } from "@/src/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
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
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for handling loading state

  useEffect(() => {
    if (!showLoginModal && !showAuthModal) {
      setIsLoading(false);
    }
  }, [showAuthModal, showLoginModal]);

  const handleClick = () => {
    setIsLoading(true); // Start loading state
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          scale: 1.05,
          backgroundColor: "#1E6741", // Subtle color change on hover
        }}
        whileTap={{ scale: 0.95 }}
        className={
          className ||
          "bg-[#297B65] py-3 px-6 rounded-md font-semibold inline-flex justify-center items-center min-h-[48px] w-full sm:w-auto text-base text-white hover:bg-[#297B65]/90 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-[#297B65] focus:outline-none transition-all duration-300"
        }
        aria-label={ariaLabel || text}
      >
        {/* Show loading spinner if isLoading is true */}
        {isLoading ? (
          <div className="loader"></div> // Simple spinner for loading state
        ) : isHovered ? (
          <Typewriter
            words={[text]}
            loop={1}
            cursor={false}
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        ) : (
          text
        )}
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

      {/* Add a CSS spinner */}
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3; /* Light gray background */
          border-top: 4px solid #3498db; /* Blue spinner color */
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
