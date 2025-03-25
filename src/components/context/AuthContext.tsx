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
import { User } from "@/src/types/auth";
import { toast } from "sonner";
import { LOGOUT_API_URL, USER_API_URL } from "@/src/lib/apiEndpoints";
import { signIn, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => void;
  logout: () => void;
  getUserDetails: (token: string) => Promise<void>;
  deleteUserDetails: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signInWithGoogle = async () => {
    const result = await signIn("google", { callbackUrl: "/file-upload" });

    if (result?.error) {
      alert(result.error);
      return;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("access_token");

      // Only attempt server logout if we have a token
      if (token) {
        const res = await fetch(LOGOUT_API_URL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          toast.error("Logout failed on server");
        }
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout properly");
    } finally {
      // Always clean up local state regardless of server response
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      setUser(null);

      // Sign out of NextAuth session
      await signOut({ callbackUrl: "/" });

      toast.success("Logged out successfully");
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

const deleteUserDetails = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("No authentication token found");
      return;
    }

    const response = await fetch(USER_API_URL, { 
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete user account");
    }

    // Cleanup after successful deletion
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
    
    // Sign out and redirect
    await signOut({ callbackUrl: "/" });
    toast.success("Account deleted successfully");

  } catch (e) {
    console.error("Account deletion error:", e);
    toast.error(e instanceof Error ? e.message : "Failed to delete account");
  }
};


  // Check for authenticated user on mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userDetails = localStorage.getItem("user");

    if (token) {
      if (userDetails && userDetails !== "undefined") {
        setUser(JSON.parse(userDetails));
        setIsLoading(false);
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
        deleteUserDetails,
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



// // na beans and for testing oo, don't push the below oo


// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
//   Dispatch,
//   SetStateAction,
// } from "react";
// import { User } from "@/src/types/auth";
// import { toast } from "sonner";
// import { LOGOUT_API_URL, USER_API_URL } from "@/src/lib/apiEndpoints";
// import { signIn, signOut } from "next-auth/react";
// import { SessionProvider } from "next-auth/react";

// const mockUser = {
//   id: "1",
//   name: "Test User",
//   email: "test@example.com",
//   country: "United States",
//   city: "New York",
//   payment_plan: {
//     plan: "Basic",
//     status: "active",
//   },
//   avatar: null,
// };

// interface AuthContextType {
//   user: User | null;
//   setUser: Dispatch<SetStateAction<User | null>>;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   signInWithGoogle: () => void;
//   logout: () => void;
//   getUserDetails: (token: string) => Promise<void>;
//   deleteUserDetails: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const simulateLogin = async () => {
//     try {
//       setIsLoading(true);
//       // Simulate API delay
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       // Set mock token
//       localStorage.setItem("access_token", "mock_token_12345");
//       localStorage.setItem("user", JSON.stringify(mockUser));

//       setUser(mockUser);
//       toast.success("Logged in successfully!");
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("Failed to login");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const signInWithGoogle = async () => {
//     const result = await signIn("google", { callbackUrl: "/file-upload" });

//     if (result?.error) {
//       alert(result.error);
//       return;
//     }
//   };

//   const logout = async () => {
//     try {
//       const token = localStorage.getItem("access_token");

//       // Only attempt server logout if we have a token
//       if (token) {
//         const res = await fetch(LOGOUT_API_URL, {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           toast.error("Logout failed on server");
//         }
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error("Failed to logout properly");
//     } finally {
//       // Always clean up local state regardless of server response
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("user");
//       setUser(null);

//       // Sign out of NextAuth session
//       await signOut({ callbackUrl: "/" });

//       toast.success("Logged out successfully");
//     }
//   };

//   const getUserDetails = async (token: string) => {
//     try {
//       const response = await fetch(USER_API_URL, {
//         // const response = await fetch(USER_API_URL, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });
//       const data: Response = await response.json();

//       localStorage.setItem("user", JSON.stringify(data.data.user));
//       setUser({ ...data.data.user, payment_plan: data.data.plan });
//     } catch (e) {
//       console.error("Failed to fetch", e);
//     }
//   };

//   const deleteUserDetails = async () => {
//     try {
//       const token = localStorage.getItem("access_token");
//       if (!token) {
//         toast.error("No authentication token found");
//         return;
//       }

//       const response = await fetch(USER_API_URL, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to delete user account");
//       }

//       // Cleanup after successful deletion
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("user");
//       setUser(null);

//       // Sign out and redirect
//       await signOut({ callbackUrl: "/" });
//       toast.success("Account deleted successfully");
//     } catch (e) {
//       console.error("Account deletion error:", e);
//       toast.error(e instanceof Error ? e.message : "Failed to delete account");
//     }
//   };

//   // Check for authenticated user on mount
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     const userDetails = localStorage.getItem("user");

//     if (token) {
//       if (userDetails && userDetails !== "undefined") {
//         setUser(JSON.parse(userDetails));
//         setIsLoading(false);
//       }
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser,
//         isAuthenticated: !!user,
//         isLoading,
//         signInWithGoogle: simulateLogin, 
//         logout,
//         getUserDetails,
//         deleteUserDetails,
//       }}
//     >
//       <SessionProvider>{children}</SessionProvider>
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };