"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  profileImage: string;
  username: string;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");

  // Simulated login function
  const login = () => {
    setIsAuthenticated(true);
    setProfileImage("/assets/images/screen-mockup.png"); // Replace with actual user image
    setUsername("Reconxi user"); // Replace with actual username
  };

  const logout = () => {
    setIsAuthenticated(false);
    setProfileImage("");
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, profileImage, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
