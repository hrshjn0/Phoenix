import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Define user type
type User = {
  id: number;
  email: string;
  role: "buyer" | "seller";
  firstName: string | null;
  lastName: string | null;
  businessName: string | null;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch current user data if token exists
  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      // Skip the request if no token in localStorage
      if (!localStorage.getItem("authToken")) {
        return null;
      }
      
      try {
        const userData = await apiRequest("/api/auth/me", {
          method: "GET",
        });
        return userData.user;
      } catch (error) {
        // Clear token if it's invalid
        localStorage.removeItem("authToken");
        return null;
      }
    },
    enabled: isInitialized,
    retry: false,
    staleTime: 300000, // 5 minutes
  });

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    window.location.href = "/";
  };

  const value = {
    user: user,
    isLoading,
    isAuthenticated: !!user,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};