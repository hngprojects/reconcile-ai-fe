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
import { User } from "@/src/types/auth";
import { toast } from "sonner";
import { LOGOUT_API_URL, USER_API_URL } from "@/src/lib/apiEndpoints";
import { signIn, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { validateToken } from "@/src/lib/api";

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
    const result = await signIn("google", { callbackUrl: "/file-upload" });

    if (result?.error) {
      alert(result.error);
      return;
    }
  };

  // Modified logout function to handle cleanup properly
  const logout = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        await fetch(LOGOUT_API_URL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Always clean up local storage and state
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      setUser(null);
      await signOut({ callbackUrl: "/" });
    }
  };

  const getUserDetails = async (token: string) => {
    try {
      const response = await fetch(USER_API_URL, {
        // const response = await fetch(USER_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data: Response = await response.json();

      localStorage.setItem("user", JSON.stringify(data.data.user));
      setUser({ ...data.data.user, payment_plan: data.data.plan });
    } catch (e) {
      console.error("Failed to fetch", e);
    }
  };

  // Check for authenticated user on mount and token validity
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      const userDetails = localStorage.getItem("user");

      if (!token || token === "undefined") {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        // Validate token on mount
        const isValid = await validateToken(token);
        if (!isValid) {
          logout();
          return;
        }

        if (userDetails && userDetails !== "undefined") {
          setUser(JSON.parse(userDetails));
        } else {
          // Fetch user details if we have token but no user data
          await getUserDetails(token);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
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
      <SessionProvider>{children}</SessionProvider>
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
