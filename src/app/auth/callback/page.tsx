"use client";

import { useAuth } from "@/src/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "@/src/components/ui/loader";

export default function AuthCallback() {
  const router = useRouter();
  const { getUserDetails } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/");
        return;
      }

      try {
        await getUserDetails(token);
        router.push("/file-upload");
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    handleAuth();
  }, [getUserDetails, router]);

  if (isLoading) {
    return <Loader />;
  }

  return null;
}
