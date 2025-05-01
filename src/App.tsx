
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
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Auth from "./pages/Auth";
import ProfessionalOnboarding from "./pages/ProfessionalOnboarding";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import ClientDetailsPage from "./pages/ClientDetailsPage";
import ClientDocumentsPage from "./pages/ClientDocumentsPage";
import CompaniesPage from "./pages/CompaniesPage";
import CompanyDetailsPage from "./pages/CompanyDetailsPage";
import PaymentsPage from "./pages/PaymentsPage";
import MessagesPage from "./pages/MessagesPage";
import AddClientPage from "./pages/AddClientPage";
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
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Redirect business routes to professional equivalents */}
              <Route path="/dashboard" element={<Navigate to="/professional/dashboard" replace />} />
              <Route path="/onboarding" element={<Navigate to="/professional/onboarding" replace />} />
              
              {/* Keep these routes but they'll likely not be accessed due to redirects */}
              <Route path="/tasks" element={
                <ProtectedRoute requiresOnboarding={true}>
                  <TasksPage />
                </ProtectedRoute>
              } />
              <Route path="/documents" element={
                <ProtectedRoute requiresOnboarding={true}>
                  <DocumentsPage />
                </ProtectedRoute>
              } />
              <Route path="/documents/upload" element={
                <ProtectedRoute requiresOnboarding={true}>
                  <DocumentUploadPage />
                </ProtectedRoute>
              } />
              <Route path="/documents/:id" element={
                <ProtectedRoute requiresOnboarding={true}>
                  <DocumentViewPage />
                </ProtectedRoute>
              } />
              
              {/* Professional user routes */}
              <Route path="/professional/onboarding" element={
                <ProfessionalProtectedRoute requiresOnboarding={false}>
                  <ProfessionalOnboarding />
                </ProfessionalProtectedRoute>
              } />
              <Route path="/professional/dashboard" element={
                <ProfessionalProtectedRoute requiresOnboarding={true}>
                  <ProfessionalDashboard />
                </ProfessionalProtectedRoute>
              } />
              
              {/* New Professional Routes */}
              <Route path="/professional/companies" element={
                <ProfessionalProtectedRoute requiresOnboarding={true}>
                  <CompaniesPage />
                </ProfessionalProtectedRoute>
              } />
              <Route path="/professional/companies/:companyId" element={
                <ProfessionalProtectedRoute requiresOnboarding={true}>
                  <CompanyDetailsPage />
                </ProfessionalProtectedRoute>
              } />
              <Route path="/professional/companies/add" element={
                <ProfessionalProtectedRoute requiresOnboarding={true}>
                  <AddClientPage />
                </ProfessionalProtectedRoute>
              } />
              <Route path="/professional/payments" element={
                <ProfessionalProtectedRoute requiresOnboarding={true}>
                  <PaymentsPage />
                </ProfessionalProtectedRoute>
              } />
              <Route path="/professional/messages" element={
                <ProfessionalProtectedRoute requiresOnboarding={true}>
                  <MessagesPage />
                </ProfessionalProtectedRoute>
              } />
              
              {/* Legacy routes - kept for compatibility */}
              <Route path="/professional/clients/:clientId" element={
                <ProfessionalProtectedRoute requiresOnboarding={true}>
                  <ClientDetailsPage />
                </ProfessionalProtectedRoute>
              } />
              <Route path="/professional/clients/:clientId/documents" element={
                <ProfessionalProtectedRoute requiresOnboarding={true}>
                  <ClientDocumentsPage />
                </ProfessionalProtectedRoute>
              } />
              <Route path="/professional/clients/add" element={
                <ProfessionalProtectedRoute requiresOnboarding={true}>
                  <AddClientPage />
                </ProfessionalProtectedRoute>
              } />
              
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
