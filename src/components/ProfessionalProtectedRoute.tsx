
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

  console.log('ProfessionalProtectedRoute:', { 
    user: user?.id, 
    loading, 
    isOnboardingComplete, 
    userRole: userProfile?.role,
    professionalType: userProfile?.professionalType,
    currentPath: location.pathname
  });

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If user is not authenticated, redirect to auth page
  if (!user) {
    console.log('User not authenticated, redirecting to auth');
    return <Navigate to="/auth?role=professional" replace />;
  }
  
  // If user is not a professional, redirect to regular auth
  if (userProfile?.role !== 'professional') {
    console.log('User is not a professional, redirecting to professional auth');
    return <Navigate to="/auth?role=professional" replace />;
  }

  // If onboarding is required for this route and user hasn't completed onboarding
  if (requiresOnboarding && !isOnboardingComplete && location.pathname !== '/professional/onboarding') {
    console.log('Professional needs to complete onboarding');
    return <Navigate to="/professional/onboarding" replace />;
  }

  console.log('Professional route access granted');
  return <>{children}</>;
};

export default ProfessionalProtectedRoute;
