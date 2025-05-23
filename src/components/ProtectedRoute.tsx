
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresOnboarding?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresOnboarding = true 
}) => {
  // Completely bypass all protection checks as requested
  return <>{children}</>;
};

export default ProtectedRoute;
