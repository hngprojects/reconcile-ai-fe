"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Unauthenticated from "@/src/components/reconciliation/UnAuthorized";
import { Loader } from "@/src/components/ui/loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  showUnauthorized?: boolean;
}

export default function ProtectedRoute({
  children,
  showUnauthorized = true,
}: ProtectedRouteProps) {
  const [authenticated, setAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetch = async () => {
      if (session === null) {
        setAuthenticated(false);
        if (!showUnauthorized && pathname !== "/") {
          router.push("/");
        }
      }
      setLoading(false);
    };

    fetch();
  }, [session, router, showUnauthorized, pathname]);

  if (loading) {
    return <Loader />;
  }

  if (!authenticated) {
    return showUnauthorized ? <Unauthenticated /> : null;
  }

  return <>{children}</>;
}
