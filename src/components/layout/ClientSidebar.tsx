
import React from 'react';
import { NavLink, useLocation, useParams, useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  ClipboardList, 
  MessageSquare, 
  Settings,
  CreditCard,
  Building,
  ArrowLeft,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const clientNavItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Building, label: 'My Company', path: '/company' },
  { icon: FileText, label: 'Documents', path: '/documents' },
  { icon: ClipboardList, label: 'Tasks', path: '/tasks' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const ClientSidebar = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  
  // Check if this is being viewed by a professional
  const isProfessionalView = location.pathname.startsWith('/professional/view-client/');
  const clientId = params.clientId;
  
  // Adjust paths based on context
  const getNavPath = (basePath: string) => {
    if (isProfessionalView && clientId) {
      return `/professional/view-client/${clientId}${basePath}`;
    }
    return `/client${basePath}`;
  };
  
  const handleBackToProfessional = () => {
    navigate('/professional/dashboard');
  };
  
  return (
    <aside className="w-64 border-r bg-card p-4 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
      {isProfessionalView && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Viewing Client Dashboard</span>
          </div>
          <Button 
            onClick={handleBackToProfessional}
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Dashboard
          </Button>
        </div>
      )}
      
      <nav className="space-y-1 mt-2">
        {clientNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={getNavPath(item.path)}
            className={({ isActive }) => 
              `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-foreground hover:bg-muted'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="mt-auto pt-4 border-t">
        <div className="px-3 py-2">
          <div className="text-sm font-medium">Need help?</div>
          <div className="text-xs text-muted-foreground mt-1">
            {isProfessionalView 
              ? "You're viewing this client's dashboard as a professional." 
              : "Contact your professional for assistance."
            }
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ClientSidebar;
