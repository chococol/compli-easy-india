import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { ProfessionalProfile } from '@/integrations/supabase/professional_types';

export type UserRole = 'business' | 'professional';

type UserProfile = {
  id: string;
  role: UserRole;
  professionalType?: 'CA' | 'CS';
  businessName?: string;
  isOnboardingComplete: boolean;
  email: string;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: UserProfile | null;
  isOnboardingComplete: boolean;
  signIn: (email: string, password: string, role?: UserRole) => Promise<{ error: any }>;
  signUp: (email: string, password: string, role: UserRole, professionalType?: 'CA' | 'CS') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  completeOnboarding: (businessStructure: string) => Promise<void>;
  completeProfessionalOnboarding: (details: { fullName: string, licenseNumber: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const navigate = useNavigate();

  // Function to fetch the user profile
  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching user profile for user ID:', userId);
      
      // Check for professional profile first (changed order)
      let { data: professionalData, error: professionalError } = await supabase
        .from('professional_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      console.log('Professional profile fetch result:', { professionalData, professionalError });
      
      if (professionalData) {
        console.log('User is a professional:', professionalData);
        setUserProfile({
          id: userId,
          role: 'professional',
          professionalType: professionalData.professional_type as 'CA' | 'CS',
          isOnboardingComplete: professionalData.is_onboarding_complete || false,
          email: user?.email || '',
        });
        setIsOnboardingComplete(professionalData.is_onboarding_complete || false);
        return;
      }
      
      // Then check for business profile if professional profile not found
      let { data: businessData, error: businessError } = await supabase
        .from('user_onboarding')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      console.log('Business profile fetch result:', { businessData, businessError });
      
      if (businessData) {
        console.log('User is a business:', businessData);
        setUserProfile({
          id: userId,
          role: 'business',
          isOnboardingComplete: businessData.is_complete || false,
          email: user?.email || '',
        });
        setIsOnboardingComplete(businessData.is_complete || false);
        return;
      }
      
      // If no profile found, set a default profile with incomplete onboarding
      console.log('No profile found, setting default');
      setUserProfile({
        id: userId,
        role: 'business', // Default role
        isOnboardingComplete: false,
        email: user?.email || '',
      });
      setIsOnboardingComplete(false);
      
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setIsOnboardingComplete(false);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        // When user signs in, fetch their profile
        if (session?.user) {
          fetchUserProfile(session.user.id);
        } else {
          // Clear profile when user signs out
          setUserProfile(null);
          setIsOnboardingComplete(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Checking existing session:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check profile for current user
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string, role?: UserRole) => {
    try {
      console.log(`Signing in with email: ${email}, role: ${role}`);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (!error) {
        console.log('Sign in successful, getting current session');
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          console.log('Session found, fetching user profile');
          await fetchUserProfile(session.user.id);
        }
      }
      
      return { error };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, role: UserRole, professionalType?: 'CA' | 'CS') => {
    try {
      console.log(`Signing up with email: ${email}, role: ${role}, type: ${professionalType}`);
      const { error, data } = await supabase.auth.signUp({ email, password });
      
      if (!error && data.user) {
        console.log('Sign up successful, creating profile for user ID:', data.user.id);
        
        // Create the appropriate profile based on role
        if (role === 'professional' && professionalType) {
          console.log('Creating professional profile');
          const { error: insertError } = await supabase.from('professional_profiles').insert([
            { 
              user_id: data.user.id, 
              professional_type: professionalType,
              is_onboarding_complete: false,
              created_at: new Date().toISOString()
            }
          ]);
          
          if (insertError) {
            console.error('Error creating professional profile:', insertError);
          } else {
            console.log('Professional profile created successfully');
            // Set user profile manually after signup
            setUserProfile({
              id: data.user.id,
              role: 'professional',
              professionalType: professionalType,
              isOnboardingComplete: false,
              email: email
            });
          }
        } else {
          // For business users, we'll create their profile during onboarding
          console.log('Business user, profile will be created during onboarding');
          setUserProfile({
            id: data.user.id,
            role: 'business',
            isOnboardingComplete: false,
            email: email
          });
        }
      }
      
      return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
    setIsOnboardingComplete(false);
    navigate('/');
  };

  const completeOnboarding = async (businessStructure: string) => {
    if (user) {
      try {
        // First check if onboarding data already exists
        const { data: existingData } = await supabase
          .from('user_onboarding')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (existingData) {
          // Update existing record
          const { error } = await supabase
            .from('user_onboarding')
            .update({ 
              business_structure: businessStructure,
              is_complete: true
            })
            .eq('user_id', user.id);

          if (error) {
            console.error('Error updating onboarding data:', error);
            return;
          }
        } else {
          // Insert new record
          const { error } = await supabase
            .from('user_onboarding')
            .insert({ 
              user_id: user.id,
              business_structure: businessStructure,
              is_complete: true
            });

          if (error) {
            console.error('Error saving onboarding data:', error);
            return;
          }
        }

        setIsOnboardingComplete(true);
        
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            isOnboardingComplete: true
          });
        }
        
        navigate('/dashboard');
      } catch (error) {
        console.error('Error completing onboarding:', error);
      }
    }
  };

  const completeProfessionalOnboarding = async (details: { fullName: string, licenseNumber: string }) => {
    if (user) {
      try {
        console.log("Completing professional onboarding with details:", details);
        
        const { error } = await supabase
          .from('professional_profiles')
          .update({ 
            full_name: details.fullName,
            license_number: details.licenseNumber,
            is_onboarding_complete: true,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);

        if (error) {
          console.error('Error completing professional onboarding:', error);
          throw error;
        }

        console.log("Professional onboarding completed successfully");
        
        // Force update the local state
        setIsOnboardingComplete(true);
        
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            isOnboardingComplete: true
          });
        }
        
        // After successful onboarding, refetch the user profile to ensure we have the latest data
        await fetchUserProfile(user.id);
        
        // Then navigate to dashboard
        navigate('/professional/dashboard');
      } catch (error) {
        console.error('Error completing professional onboarding:', error);
        throw error;
      }
    } else {
      console.error("Cannot complete onboarding: No user is logged in");
      throw new Error("User not logged in");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      userProfile,
      isOnboardingComplete,
      signIn, 
      signUp, 
      signOut,
      completeOnboarding,
      completeProfessionalOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
