
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
  const { user, loading, isOnboardingComplete, userProfile } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If user is not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to="/auth?role=professional" replace />;
  }
  
  // If user is not a professional, redirect to regular auth
  if (userProfile?.role !== 'professional') {
    return <Navigate to="/auth?role=professional" replace />;
  }

  // If onboarding is required for this route and user hasn't completed onboarding
  if (requiresOnboarding && !isOnboardingComplete && location.pathname !== '/professional/onboarding') {
    return <Navigate to="/professional/onboarding" replace />;
  }

  return <>{children}</>;
};

export default ProfessionalProtectedRoute;
