"use client";

import { FC, useState, useEffect } from "react";
import { useAuth } from "@/src/components/context/AuthContext";
import GoogleAuthModal from "@/src/components/modal/GoogleAuthModal";
import UserDetails from "@/src/components/UserDetails";

const UserAction: FC = () => {
  const { user, setUser } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, [setUser]);

  return (
    <>
      {user ? (
        <UserDetails />
      ) : (
        <button
          type="button"
          className="bg-[#297B65] cursor-pointer py-2 px-4 text-nowrap 
                     rounded-md font-semibold justify-center items-center h-12 
                     sm:w-56 text-sm text-white hover:bg-[#297B65]/90 flex"
          onClick={() => setShowAuthModal(true)}
        >
          Get Started
        </button>
      )}

      <GoogleAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default UserAction;
