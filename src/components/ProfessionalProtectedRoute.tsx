
import React from 'react';

interface ProfessionalProtectedRouteProps {
  children: React.ReactNode;
  requiresOnboarding?: boolean;
}

const ProfessionalProtectedRoute: React.FC<ProfessionalProtectedRouteProps> = ({ 
  children, 
  requiresOnboarding = true 
}) => {
  // Completely bypass all protection checks as requested
  return <>{children}</>;
};

export default ProfessionalProtectedRoute;
