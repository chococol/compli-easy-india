
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresRegistration?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresRegistration = true 
}) => {
  const { user, loading, isRegistrationComplete } = useAuth();
  const location = useLocation();

  if (loading) {
    // You could add a loading spinner here
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If user is not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If registration is required for this route and user hasn't completed registration
  // and they're not already on the registration page, redirect to registration
  if (requiresRegistration && !isRegistrationComplete && location.pathname !== '/registration') {
    return <Navigate to="/registration" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
