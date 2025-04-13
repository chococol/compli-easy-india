
import React from 'react';
import OnboardingOptions from '@/components/onboarding/OnboardingOptions';

const Onboarding = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 p-4 md:p-6 max-w-[1400px] mx-auto w-full">
        <OnboardingOptions />
      </main>
    </div>
  );
};

export default Onboarding;
