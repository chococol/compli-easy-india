
import React from 'react';
import { NavLink, useLocation, useParams, useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  ClipboardCheck, 
  MessageSquare, 
  Settings,
  CreditCard,
  Building,
  ArrowLeft,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const clientNavItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: Building, label: 'Organization', path: '/organization' },
  { icon: FileText, label: 'Documents', path: '/documents' },
  { icon: ClipboardCheck, label: 'Compliances', path: '/compliances' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

// Dummy client data for display
const dummyClients: { [key: string]: string } = {
  '1': 'Tech Solutions Inc.',
  '2': 'Green Energy Corp.',
  '3': 'Marketing Pros LLC',
};

const ClientSidebar = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  
  // Check if this is being viewed by a professional using new route structure
  const isProfessionalView = location.pathname.startsWith('/professional/') && params.clientId;
  const clientId = params.clientId;
  const clientName = clientId ? dummyClients[clientId] || `Client ${clientId}` : '';
  
  // Adjust paths based on context
  const getNavPath = (basePath: string) => {
    if (isProfessionalView && clientId) {
      return `/professional/${clientId}${basePath}`;
    }
    return `/client${basePath}`;
  };
  
  const handleBackToProfessional = () => {
    navigate('/professional/home');
  };
  
  return (
    <aside className="w-64 border-r bg-card p-4 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto fixed">
      {isProfessionalView && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Viewing Client</span>
          </div>
          <div className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
            {clientName}
          </div>
          <Button 
            onClick={handleBackToProfessional}
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Home
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
              ? "You're viewing this client's data as a professional." 
              : "Contact your professional for assistance."
            }
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ClientSidebar;
