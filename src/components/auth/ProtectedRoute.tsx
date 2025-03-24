"use client";
import { useAuth } from "@/src/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { validateToken } from "@/src/lib/api";
import { Loader } from "../ui/loader";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check authentication on initial render
    if (!isLoading && !isAuthenticated) {
      router.replace("/");
      return;
    }

    // Token validation check
    const token = localStorage.getItem("access_token");
    if (!token || token === "undefined") {
      logout();
      router.replace("/");
      return;
    }

    const interval = setInterval(
      async () => {
        const valid = await validateToken(token);
        if (!valid) {
          logout();
          router.replace("/");
        }
      },
      1 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [isAuthenticated, isLoading, logout, router]);

  // Show loading state
  if (isLoading) {
    return <Loader />;
  }

  // Only render children if authenticated
  return isAuthenticated ? <>{children}</> : null;
}
