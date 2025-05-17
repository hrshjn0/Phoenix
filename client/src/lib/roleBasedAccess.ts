import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook to check if a user is authorized to access a page based on their role
 * If they don't have the required role, they'll be redirected to an appropriate page
 * 
 * @param allowedRoles - Array of roles that can access the page
 * @param redirectPath - Path to redirect to if not authorized (defaults to homepage)
 */
export const useRoleBasedAccess = (
  allowedRoles: Array<string>,
  redirectPath: string = '/'
) => {
  const [, navigate] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Don't redirect while still loading auth state
    if (isLoading) return;
    
    // Check if user is authenticated and has an allowed role
    const isAuthorized = isAuthenticated && user?.role && allowedRoles.includes(user.role);
    
    // Redirect if not authorized
    if (!isAuthorized) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, user, allowedRoles, navigate, redirectPath, isLoading]);

  return { isAuthorized: isAuthenticated && user?.role && allowedRoles.includes(user.role) };
};