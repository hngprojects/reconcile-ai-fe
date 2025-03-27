"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/components/context/AuthContext";
import GoogleAuthModal from "@/src/components/modal/GoogleAuthModal";
import LoginModal from "@/src/components/modal/LoginModal";
import UserDetails from "@/src/components/UserDetails";
import { useSession } from "next-auth/react";

const UserAction = () => {
  const { user, setUser } = useAuth();
  const { data: session } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (session) {
        localStorage.setItem("access_token", session.accessToken as string);
        // console.log(session);
        if (!user) {
          setUser(session.user as typeof user);
        }
      }
    };

    fetch();
  }, [session, setUser]); // eslint-disable-line react-hooks/exhaustive-deps

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
      {user ? (
        <UserDetails />
      ) : (
        <>
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowLoginModal(true)}
              className="h-[44px] px-6 py-3 border-2 border-[#2E604A] text-[#2E604A] rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/10 cursor-pointer"
              aria-label="Open login modal"
            >
              <span className="relative bottom-0.5">Login</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAuthModal(true)}
              className="h-[44px] px-6 py-3 bg-[#2E604A] text-white rounded-[8px] font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#2E604A]/90 cursor-pointer"
              aria-label="Open signup modal"
            >
              Sign up
            </button>
          </div>

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
      )}
    </>
  );
};

export default UserAction;
