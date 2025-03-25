import { useAuth } from "@/src/components/context/AuthContext";

export const useRequireAuth = () => {
  const { isAuthenticated, setIsLoading, isLoading, user } = useAuth();

  const adjustedIsAuthenticated = isLoading ? null : isAuthenticated;
  console.log(isLoading);

  return {
    isLoading,
    setIsLoading,
    isAuthenticated: adjustedIsAuthenticated,
    user,
  };
};
