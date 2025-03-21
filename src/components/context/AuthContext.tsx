"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/navigation";
import { User, Response } from "@/src/types/auth";
import { toast } from "sonner";
import {
  GOOGLE_API_URL,
  LOGOUT_API_URL,
  USER_API_URL,
} from "@/src/lib/apiEndpoints";

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => void;
  logout: () => void;
  getUserDetails: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const signInWithGoogle = async () => {
    // window.location.href = GOOGLE_API_URL;
    router.push(GOOGLE_API_URL);
  };

  const getUserDetails = async (token: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(USER_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data: Response = await response.json();

      localStorage.setItem("user", JSON.stringify(data.data.user));
      setUser(data.data.user);
    } catch (e) {
      console.error("Failed to fetch", e);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(LOGOUT_API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(localStorage.getItem("access_token") && {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          }), // Only send Authorization if token exists in localStorage
        },
      });
      if (!res.ok) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        toast.error("Something went wrong!");
        setUser(null);
        return;
      }
      // Remove access token and user data from localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      setUser(null);
      router.push("/");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Something went wrong while logging out!", error);
    }
  };

  // Check for authenticated user on mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userDetails = localStorage.getItem("user");

    if (token) {
      if (userDetails) {
        setUser(JSON.parse(userDetails));
        setIsLoading(false);
      } else {
        getUserDetails(token);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        isLoading,
        signInWithGoogle,
        logout,
        getUserDetails,
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
