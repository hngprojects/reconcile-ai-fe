"use client";

import { useAuth } from "@/src/components/context/AuthContext";
import { useEffect } from "react";

export default function AuthCallback() {
  const { getUserDetails } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if(token) getUserDetails(token as string);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Authenticating...</h1>
        <p className="text-gray-600">
          Please wait while we complete your sign-in.
        </p>
      </div>
    </div>
  );
}
