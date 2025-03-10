"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction
} from "react";
import { useRouter } from "next/navigation";
import { User, Response } from "@/src/types/auth";
import { GOOGLE_API_URL, USER_API_URL } from "@/src/lib/apiEndpoints";

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User|null>>,
  isAuthenticated: boolean;
  signInWithGoogle: () => void;
  logout: () => void;
  getUserDetails: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const signInWithGoogle = async () => {
      window.location.href = GOOGLE_API_URL;
  };

  const getUserDetails = async (token: string) => {
    try {
      const response = await fetch(USER_API_URL, {
          headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
          },
      })
      const data: Response = await response.json();

      localStorage.setItem('user', JSON.stringify(data.data.user));
      setUser(data.data.user);
    } catch (e) {
      console.error('Failed to fetch', e);
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  // Check for authenticated user on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userDetails = localStorage.getItem("user");
    if (token && userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        signInWithGoogle,
        logout,
        getUserDetails
      }}
    >
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
