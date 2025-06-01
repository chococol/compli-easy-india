import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';

// Pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Mission from '@/pages/Mission';
import Partner from '@/pages/Partner';
import GetStarted from '@/pages/GetStarted';
import NotFound from '@/pages/NotFound';

// Auth Pages
import Auth from '@/pages/Auth';
import ClientAuth from '@/pages/ClientAuth';
import ProfessionalAuth from '@/pages/ProfessionalAuth';

// Dashboard Pages
import Dashboard from '@/pages/Dashboard';
import ProfessionalDashboard from '@/pages/ProfessionalDashboard';
import OrganizationPage from '@/pages/OrganizationPage';
import DocumentsPage from '@/pages/DocumentsPage';
import CompliancesPage from '@/pages/CompliancesPage';
import PaymentsPage from '@/pages/PaymentsPage';
import MessagesPage from '@/pages/MessagesPage';
import SettingsPage from '@/pages/SettingsPage';

// Other Pages
import Onboarding from '@/pages/Onboarding';
import ClientOnboarding from '@/pages/ClientOnboarding';
import ProfessionalOnboarding from '@/pages/ProfessionalOnboarding';
import ClientDocumentsPage from '@/pages/ClientDocumentsPage';
import DocumentViewPage from '@/pages/DocumentViewPage';
import DocumentUploadPage from '@/pages/DocumentUploadPage';
import CompaniesPage from '@/pages/CompaniesPage';
import CompanyDetailsPage from '@/pages/CompanyDetailsPage';
import ClientsPage from '@/pages/ClientsPage';
import AddClientPage from '@/pages/AddClientPage';
import ClientDetailsPage from '@/pages/ClientDetailsPage';
import AddComplianceTaskPage from '@/pages/AddComplianceTaskPage';

// Components
import ProtectedRoute from '@/components/ProtectedRoute';
import ProfessionalProtectedRoute from '@/components/ProfessionalProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <Router>
            <div className="App min-h-screen bg-background">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/mission" element={<Mission />} />
                <Route path="/partner" element={<Partner />} />
                <Route path="/get-started" element={<GetStarted />} />
                
                {/* Auth Routes */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/client-auth" element={<ClientAuth />} />
                <Route path="/professional-auth" element={<ProfessionalAuth />} />
                
                {/* Onboarding Routes */}
                <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
                <Route path="/client-onboarding" element={<ProtectedRoute><ClientOnboarding /></ProtectedRoute>} />
                <Route path="/professional-onboarding" element={<ProfessionalProtectedRoute><ProfessionalOnboarding /></ProfessionalProtectedRoute>} />
                
                {/* Default Dashboard Redirects */}
                <Route path="/dashboard" element={<Navigate to="/client/dashboard" replace />} />
                <Route path="/company" element={<Navigate to="/client/organization" replace />} />
                <Route path="/documents" element={<Navigate to="/client/documents" replace />} />
                <Route path="/tasks" element={<Navigate to="/client/compliances" replace />} />
                <Route path="/compliances" element={<Navigate to="/client/compliances" replace />} />
                <Route path="/payments" element={<Navigate to="/client/payments" replace />} />
                <Route path="/messages" element={<Navigate to="/client/messages" replace />} />
                <Route path="/settings" element={<Navigate to="/client/settings" replace />} />

                {/* Client Routes */}
                <Route path="/client/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/client/organization" element={<ProtectedRoute><OrganizationPage /></ProtectedRoute>} />
                <Route path="/client/documents" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
                <Route path="/client/compliances" element={<ProtectedRoute><CompliancesPage /></ProtectedRoute>} />
                <Route path="/client/payments" element={<ProtectedRoute><PaymentsPage /></ProtectedRoute>} />
                <Route path="/client/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
                <Route path="/client/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

                {/* Professional viewing client routes */}
                <Route path="/professional/:clientId/dashboard" element={<ProfessionalProtectedRoute><Dashboard /></ProfessionalProtectedRoute>} />
                <Route path="/professional/:clientId/organization" element={<ProfessionalProtectedRoute><OrganizationPage /></ProfessionalProtectedRoute>} />
                <Route path="/professional/:clientId/documents" element={<ProfessionalProtectedRoute><DocumentsPage /></ProfessionalProtectedRoute>} />
                <Route path="/professional/:clientId/compliances" element={<ProfessionalProtectedRoute><CompliancesPage /></ProfessionalProtectedRoute>} />
                <Route path="/professional/:clientId/payments" element={<ProfessionalProtectedRoute><PaymentsPage /></ProfessionalProtectedRoute>} />
                <Route path="/professional/:clientId/messages" element={<ProfessionalProtectedRoute><MessagesPage /></ProfessionalProtectedRoute>} />
                <Route path="/professional/:clientId/settings" element={<ProfessionalProtectedRoute><SettingsPage /></ProfessionalProtectedRoute>} />

                {/* Professional Routes */}
                <Route path="/professional/dashboard" element={<ProfessionalProtectedRoute><ProfessionalDashboard /></ProfessionalProtectedRoute>} />
                <Route path="/professional/companies" element={<ProfessionalProtectedRoute><CompaniesPage /></ProfessionalProtectedRoute>} />
                <Route path="/professional/companies/:companyId" element={<ProfessionalProtectedRoute><CompanyDetailsPage /></ProfessionalProtectedRoute>} />
                <Route path="/professional/clients" element={<ProfessionalProtectedRoute><ClientsPage /></ProfessionalProtectedRoute>} />
                <Route path="/professional/clients/add" element={<ProfessionalProtectedRoute><AddClientPage /></ProfessionalProtectedRoute>} />
                <Route path="/professional/clients/:clientId" element={<ProfessionalProtectedRoute><ClientDetailsPage /></ProfessionalProtectedRoute>} />
                <Route path="/professional/clients/:clientId/compliance/add" element={<ProfessionalProtectedRoute><AddComplianceTaskPage /></ProfessionalProtectedRoute>} />
                <Route path="/professional/clients/:clientId/documents" element={<ProfessionalProtectedRoute><ClientDocumentsPage /></ProfessionalProtectedRoute>} />
                <Route path="/professional/payments" element={<ProfessionalProtectedRoute><PaymentsPage /></ProfessionalProtectedRoute>} />
                <Route path="/professional/messages" element={<ProfessionalProtectedRoute><MessagesPage /></ProfessionalProtectedRoute>} />
                <Route path="/professional/settings" element={<ProfessionalProtectedRoute><SettingsPage /></ProfessionalProtectedRoute>} />
                
                {/* Document Routes */}
                <Route path="/documents/upload" element={<ProtectedRoute><DocumentUploadPage /></ProtectedRoute>} />
                <Route path="/documents/view/:documentId" element={<ProtectedRoute><DocumentViewPage /></ProtectedRoute>} />
                
                {/* Catch All */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              <Toaster />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
