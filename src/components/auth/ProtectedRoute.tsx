"use client";
import { useAuth } from "@/src/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're sure the user is not authenticated
    if (isAuthenticated === false) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === undefined) {
    return null;
  }

  return isAuthenticated ? <>{children}</> : null;
}
