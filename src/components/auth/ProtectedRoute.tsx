"use client";
import { useAuth } from "@/src/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validateToken } from "@/src/lib/api";
import { Loader } from "../ui/loader";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token") as string;

    // Initial token check
    if (!token || token === "undefined") {
      logout();
      router.replace("/");
      return;
    }

    setIsLoading(false);

    const interval = setInterval(
      () => {
        if (token && token !== "undefined") {
          const valid = validateToken(token);

          if (!valid) {
            logout();
            router.replace("/");
          }
        }
      },
      1 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [logout, router]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
}
