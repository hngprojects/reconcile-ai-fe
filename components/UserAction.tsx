"use client";

import { FC } from "react";
import Image from "next/image";
import { useAuth } from "@/components/context/AuthContext"; 

const UserAction: FC = () => {
  const { isAuthenticated, profileImage, username, login } = useAuth(); 

  return (
    <div className="flex items-center gap-1 sm:gap-3">
      {isAuthenticated && profileImage ? (
        <>
          <span className="text-xs sm:text-sm font-semibold">{username}</span> 
          <Image
            src={profileImage}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          />
        </>
      ) : (
        <button
          type="button"
          className="bg-[#297B65] cursor-pointer py-2 px-4 text-nowrap rounded-md font-semibold justify-center items-center h-12 sm:w-56 text-sm text-white hover:bg-[#297B65]/90 flex"
          onClick={login} 
        >
          Get Started
        </button>
      )}
    </div>
  );
};

export default UserAction;
