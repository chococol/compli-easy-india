
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresOnboarding?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresOnboarding = true 
}) => {
  // Temporarily bypass all protection checks
  // Original code is commented out for easy restoration later
  
  /* 
  const { user, loading, isOnboardingComplete } = useAuth();
  const location = useLocation();

  if (loading) {
    // You could add a loading spinner here
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If user is not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If onboarding is required for this route and user hasn't completed onboarding
  // and they're not already on the onboarding page, redirect to onboarding
  if (requiresOnboarding && !isOnboardingComplete && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }
  */

  // Bypass all checks and render children directly
  console.log('WARNING: Route protection is temporarily disabled!');
  return <>{children}</>;
};

export default ProtectedRoute;
