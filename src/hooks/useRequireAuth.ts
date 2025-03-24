import { useAuth } from "@/src/components/context/AuthContext";

export const useRequireAuth = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  return { isLoading, isAuthenticated, user };
};
