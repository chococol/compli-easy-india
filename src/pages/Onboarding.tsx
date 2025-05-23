
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import OnboardingOptions from '@/components/onboarding/OnboardingOptions';
import { useAuth } from '@/contexts/AuthContext';

const Onboarding = () => {
  const { isOnboardingComplete, userProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check user role and redirect to appropriate onboarding page
    if (userProfile?.role === 'business') {
      navigate('/client/onboarding');
      return;
    }
    
    // If onboarding is already complete, redirect to appropriate dashboard based on role
    if (isOnboardingComplete) {
      if (userProfile?.role === 'business') {
        navigate('/client/dashboard');
      } else {
        navigate('/professional/dashboard');
      }
    }
  }, [isOnboardingComplete, userProfile, navigate]);

  // Only render the onboarding content if onboarding is not complete
  if (isOnboardingComplete || userProfile?.role === 'business') {
    return null; // Return null while redirecting
  }

  return (
    <MainLayout>
      <OnboardingOptions />
    </MainLayout>
  );
};

export default Onboarding;
