
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import OnboardingOptions from '@/components/onboarding/OnboardingOptions';
import { useAuth } from '@/contexts/AuthContext';

const Onboarding = () => {
  const { isOnboardingComplete } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If onboarding is already complete, redirect to dashboard
    if (isOnboardingComplete) {
      navigate('/dashboard');
    }
  }, [isOnboardingComplete, navigate]);

  // Only render the onboarding content if onboarding is not complete
  if (isOnboardingComplete) {
    return null; // Return null while redirecting
  }

  return (
    <MainLayout>
      <OnboardingOptions />
    </MainLayout>
  );
};

export default Onboarding;
