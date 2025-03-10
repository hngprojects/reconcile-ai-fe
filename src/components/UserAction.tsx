"use client";

import { FC, useState } from "react";
import { useAuth } from "@/src/components/context/AuthContext";
import GoogleAuthModal from "@/src/components/modal/GoogleAuthModal";

const UserAction: FC = () => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <div className="flex items-center gap-1 sm:gap-3">
        {!isAuthenticated ? (<div className="flex items-center justify-center bg-gray-100 text-[#297B65] size-12 text-xl rounded-full">
  <p>N</p>
</div>):
(
          
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
      </div>

      <GoogleAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default UserAction;
