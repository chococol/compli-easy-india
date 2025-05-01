
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProfessionalProtectedRouteProps {
  children: React.ReactNode;
  requiresOnboarding?: boolean;
}

const ProfessionalProtectedRoute: React.FC<ProfessionalProtectedRouteProps> = ({ 
  children, 
  requiresOnboarding = true 
}) => {
  const { user, loading, isOnboardingComplete } = useAuth();
  const location = useLocation();

  console.log('ProfessionalProtectedRoute:', { 
    user: user?.id, 
    loading, 
    isOnboardingComplete,
    currentPath: location.pathname
  });

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If user is not authenticated, redirect to auth page (professional by default)
  if (!user) {
    console.log('User not authenticated, redirecting to professional auth');
    return <Navigate to="/auth?role=professional" replace />;
  }
  
  // Allow all authenticated users to access professional routes
  // Temporarily bypass the onboarding check if the page is NOT the onboarding page itself
  if (requiresOnboarding && !isOnboardingComplete && location.pathname !== '/professional/onboarding') {
    console.log('User needs to complete onboarding, but temporarily bypassing this check');
    // For now, let's continue to the requested page instead of redirecting to onboarding
    // return <Navigate to="/professional/onboarding" replace />;
  }

  console.log('Professional route access granted');
  return <>{children}</>;
};

export default ProfessionalProtectedRoute;
