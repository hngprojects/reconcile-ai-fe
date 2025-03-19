"use client";

import { FC, useState, useEffect } from "react";
import { useAuth } from "@/src/components/context/AuthContext";
import LoginModal from "@/src/components/modal/LoginModal";
import SignupModal from "@/src/components/modal/SignupModal";
import UserDetails from "@/src/components/UserDetails";
import { Button } from "./ui/button";

type AuthMode = "login" | "signup";
const UserAction: FC = () => {
  const { user, setUser } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signup");

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, [setUser]);

  if (user) return <UserDetails />;

  const openModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className="flex items-center space-x-4">
        <Button onClick={() => openModal("login")}>
          Login Now
        </Button>
        <Button onClick={() => openModal("signup")}>
          Sign Up
        </Button>
      </div>
      {authMode === "login" ? (
        <LoginModal isOpen={isModalOpen} onClose={closeModal} />
      ) : (
        <SignupModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </>
  );
};

export default UserAction;