
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import { useEffect, useState, createContext, useContext } from "react";

// Create an authentication context
type AuthContextType = {
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: (options: string[]) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isOnboardingComplete: false,
  loading: true,
  login: async () => {},
  logout: () => {},
  completeOnboarding: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is logged in from localStorage or session
    const checkAuth = () => {
      const token = localStorage.getItem("auth_token");
      const onboardingComplete = localStorage.getItem("onboarding_complete") === "true";
      
      setIsAuthenticated(!!token);
      setIsOnboardingComplete(onboardingComplete);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // This would be replaced with actual authentication logic
    // For now, we'll just simulate successful login
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store authentication token
      localStorage.setItem("auth_token", "dummy_token");
      setIsAuthenticated(true);
      
      // Check if user has completed onboarding
      const onboardingComplete = localStorage.getItem("onboarding_complete") === "true";
      setIsOnboardingComplete(onboardingComplete);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
  };

  const completeOnboarding = async (options: string[]) => {
    setLoading(true);
    try {
      // Simulate saving to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would save this to the database
      console.log("Saving onboarding options:", options);
      
      // Update local state and storage
      localStorage.setItem("onboarding_complete", "true");
      setIsOnboardingComplete(true);
    } catch (error) {
      console.error("Onboarding error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isOnboardingComplete,
      loading,
      login, 
      logout,
      completeOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected route component
const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  requireOnboarding = true
}: { 
  children: React.ReactNode;
  requireAuth?: boolean;
  requireOnboarding?: boolean;
}) => {
  const { isAuthenticated, isOnboardingComplete, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requireAuth && !isOnboardingComplete && requireOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/onboarding" 
              element={
                <ProtectedRoute requireAuth={true} requireOnboarding={false}>
                  <Onboarding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requireAuth={true} requireOnboarding={true}>
                  <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                  </div>
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
