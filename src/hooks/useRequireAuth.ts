import { useAuth } from "@/src/components/context/AuthContext";

export const useRequireAuth = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  const adjustedIsAuthenticated = isLoading ? null : isAuthenticated;

  return {
    isLoading,
    isAuthenticated: adjustedIsAuthenticated,
    user,
  };
};
