
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
  
  // Temporarily allow all authenticated users to access professional routes
  // regardless of their actual role
  
  // If onboarding is required for this route and user hasn't completed onboarding
  if (requiresOnboarding && !isOnboardingComplete && location.pathname !== '/professional/onboarding') {
    console.log('User needs to complete onboarding');
    return <Navigate to="/professional/onboarding" replace />;
  }

  console.log('Professional route access granted');
  return <>{children}</>;
};

export default ProfessionalProtectedRoute;
