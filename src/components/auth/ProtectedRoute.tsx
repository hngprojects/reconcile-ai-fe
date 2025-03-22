"use client";
import { useAuth } from "@/src/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { validateToken } from '@/src/lib/api';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token') as string;
    const interval = setInterval(() => {
      if (token && token !== 'undefined') {
        const valid = validateToken(token);

        if(!valid){
          logout();
          router.replace("/");
        }
      }
    }, 1 * 60 * 1000); 
    return () => clearInterval(interval);
  }, [logout, router]);


  return <>{children}</>;
}
