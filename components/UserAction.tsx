"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/context/AuthContext"; // Import useAuth

const UserAction: FC = () => {
  const { isAuthenticated, profileImage, login } = useAuth(); // Get authentication functions

  return (
    <div>
      {isAuthenticated && profileImage ? (
        <Image
          src={profileImage}
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full cursor-pointer"
        />
      ) : (
        <button type="button"
          className="bg-[#297B65] cursor-pointer py-2 px-4 text-nowrap rounded-md font-semibold justify-center items-center h-12 sm:w-56 text-sm text-white hover:bg-[#297B65]/90 flex"
          onClick={login} // Call login function on click
        >
          Login
        </button>
      )}
    </div>
  );
};

export default UserAction;
