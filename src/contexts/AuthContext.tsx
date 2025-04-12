
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isRegistrationComplete: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  completeRegistration: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// For demo purposes, we're using localStorage to track registration status
// In a real app, this would be stored in your database
const REGISTRATION_COMPLETE_KEY = 'registration_complete';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // When user signs in, check registration status
        if (session?.user) {
          const registrationComplete = localStorage.getItem(`${REGISTRATION_COMPLETE_KEY}_${session.user.id}`);
          setIsRegistrationComplete(registrationComplete === 'true');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check registration status for current user
      if (session?.user) {
        const registrationComplete = localStorage.getItem(`${REGISTRATION_COMPLETE_KEY}_${session.user.id}`);
        setIsRegistrationComplete(registrationComplete === 'true');
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) {
        navigate('/dashboard');
      }
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const completeRegistration = () => {
    if (user) {
      localStorage.setItem(`${REGISTRATION_COMPLETE_KEY}_${user.id}`, 'true');
      setIsRegistrationComplete(true);
      navigate('/dashboard');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      isRegistrationComplete,
      signIn, 
      signUp, 
      signOut,
      completeRegistration
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
