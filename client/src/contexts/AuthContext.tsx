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

  // Set up an event listener to detect changes to authToken in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      // When authToken changes, refresh the user data
      refetch();
    };

    // Check for login state when initialized
    setIsInitialized(true);

    // Listen for changes to localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('auth-changed', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-changed', handleStorageChange);
    };
  }, [refetch]);

  const logout = () => {
    localStorage.removeItem("authToken");
    queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    // Manually refetch to update state immediately
    refetch();
  };

  const value = {
    user: user,
    isLoading,
    isAuthenticated: !!user,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};