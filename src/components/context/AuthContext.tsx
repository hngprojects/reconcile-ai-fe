"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User, AuthResponse } from "@/src/types/auth";
import { BASE_URL } from "@/src/lib/apiEndpoints";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signInWithGoogle: () => void;
  logout: () => void;
  handleAuthCallback: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const signInWithGoogle = () => {
    // Simply redirect to the Google auth endpoint
    window.location.href = `${BASE_URL}/auth/google`;
  };

  const handleAuthCallback = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/auth/google/callback`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data: AuthResponse = await response.json();
      setUser(data.user);
      localStorage.setItem("auth_token", data.token);
      router.push("/file-upload");
    } catch (error) {
      console.error("Auth callback error:", error);
      router.push("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    router.push("/");
  };

  // Check for authenticated user on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      // Verify token and get user info
      // Add API endpoint to verify token if available
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signInWithGoogle,
        logout,
        handleAuthCallback,
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
