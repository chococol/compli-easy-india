import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import TasksPage from "./pages/TasksPage";
import DocumentsPage from "./pages/DocumentsPage";
import DocumentUploadPage from "./pages/DocumentUploadPage";
import DocumentViewPage from "./pages/DocumentViewPage";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Mission from "./pages/Mission";
import Contact from "./pages/Contact";
import Partner from "./pages/Partner";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Auth from "./pages/Auth";
import ClientAuth from "./pages/ClientAuth";
import ProfessionalAuth from "./pages/ProfessionalAuth";
import ProfessionalOnboarding from "./pages/ProfessionalOnboarding";
import ClientOnboarding from "./pages/ClientOnboarding";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import ClientDetailsPage from "./pages/ClientDetailsPage";
import ClientDocumentsPage from "./pages/ClientDocumentsPage";
import CompaniesPage from "./pages/CompaniesPage";
import CompanyDetailsPage from "./pages/CompanyDetailsPage";
import PaymentsPage from "./pages/PaymentsPage";
import MessagesPage from "./pages/MessagesPage";
import SettingsPage from "./pages/SettingsPage";
import AddClientPage from "./pages/AddClientPage";
import ClientCompanyPage from "./pages/ClientCompanyPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfessionalProtectedRoute from "./components/ProfessionalProtectedRoute";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Initialize dark mode based on user preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              
              {/* Auth routes */}
              <Route path="/auth" element={<Navigate to="/professional/auth" replace />} />
              <Route path="/client/auth" element={<ClientAuth />} />
              <Route path="/professional/auth" element={<ProfessionalAuth />} />
              
              {/* Legacy routes - redirect to new client paths */}
              <Route path="/dashboard" element={<Navigate to="/client/dashboard" replace />} />
              <Route path="/documents" element={<Navigate to="/client/documents" replace />} />
              <Route path="/tasks" element={<Navigate to="/client/tasks" replace />} />
              <Route path="/payments" element={<Navigate to="/client/payments" replace />} />
              <Route path="/messages" element={<Navigate to="/client/messages" replace />} />
              <Route path="/settings" element={<Navigate to="/client/settings" replace />} />
              
              {/* Client onboarding */}
              <Route path="/client/onboarding" element={<ClientOnboarding />} />
              
              {/* Client routes with /client prefix */}
              <Route path="/client/dashboard" element={<Dashboard />} />
              <Route path="/client/company" element={<ClientCompanyPage />} />
              <Route path="/client/tasks" element={<TasksPage />} />
              <Route path="/client/documents" element={<DocumentsPage />} />
              <Route path="/client/documents/upload" element={<DocumentUploadPage />} />
              <Route path="/client/documents/:id" element={<DocumentViewPage />} />
              <Route path="/client/payments" element={<PaymentsPage />} />
              <Route path="/client/messages" element={<MessagesPage />} />
              <Route path="/client/settings" element={<SettingsPage />} />
              
              {/* Professional onboarding */}
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/professional/onboarding" element={<ProfessionalOnboarding />} />
              
              {/* Professional routes */}
              <Route path="/professional/dashboard" element={<ProfessionalDashboard />} />
              
              {/* Professional viewing client dashboards - NEW SIMPLIFIED STRUCTURE */}
              <Route path="/professional/:clientId/dashboard" element={<Dashboard />} />
              <Route path="/professional/:clientId/company" element={<ClientCompanyPage />} />
              <Route path="/professional/:clientId/tasks" element={<TasksPage />} />
              <Route path="/professional/:clientId/documents" element={<DocumentsPage />} />
              <Route path="/professional/:clientId/documents/upload" element={<DocumentUploadPage />} />
              <Route path="/professional/:clientId/documents/:id" element={<DocumentViewPage />} />
              <Route path="/professional/:clientId/payments" element={<PaymentsPage />} />
              <Route path="/professional/:clientId/messages" element={<MessagesPage />} />
              <Route path="/professional/:clientId/settings" element={<SettingsPage />} />
              
              <Route path="/professional/companies" element={<CompaniesPage />} />
              <Route path="/professional/companies/:companyId" element={<CompanyDetailsPage />} />
              <Route path="/professional/companies/add" element={<AddClientPage />} />
              <Route path="/professional/payments" element={<PaymentsPage />} />
              <Route path="/professional/messages" element={<MessagesPage />} />
              <Route path="/professional/settings" element={<SettingsPage />} />
              
              {/* Legacy professional routes - kept for compatibility */}
              <Route path="/professional/clients/:clientId" element={<ClientDetailsPage />} />
              <Route path="/professional/clients/:clientId/documents" element={<ClientDocumentsPage />} />
              <Route path="/professional/clients/add" element={<AddClientPage />} />
              
              {/* Fallback for not found routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
