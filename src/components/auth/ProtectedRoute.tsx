"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Unauthenticated from "@/src/components/reconciliation/UnAuthorized";
import { Loader } from "@/src/components/ui/loader";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();


  useEffect(() => {
    const fetch = async () => {
      if (session) {
        setAuthenticated(true);
      }
    };

    setLoading(false);
    fetch();
  }, [session]);
  return (<>
  {
    loading ? <Loader /> 
      : authenticated ? <>{children}</> 
        : <Unauthenticated />
  }
  </>);
}
