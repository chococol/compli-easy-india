
import React from 'react';
import { NavLink, useLocation, useParams, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Building,
  FileText,
  ClipboardCheck,
  MessageSquare, 
  CreditCard, 
  Settings,
  ArrowLeft,
  User
} from 'lucide-react';
import Logo from '../Logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const professionalNavItems = [
  { icon: Home, label: 'Dashboard', path: '/professional/dashboard' },
  { icon: Building, label: 'Companies', path: '/professional/companies' },
  { icon: CreditCard, label: 'Payments', path: '/professional/payments' },
  { icon: MessageSquare, label: 'Messages', path: '/professional/messages' },
  { icon: Settings, label: 'Settings', path: '/professional/settings' },
];

const clientNavItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
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

const MobileSidebar: React.FC<MobileSidebarProps> = ({ open, onOpenChange }) => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  
  const isClientRoute = location.pathname.startsWith('/client');
  const isProfessionalView = location.pathname.startsWith('/professional/') && params.clientId;
  const clientId = params.clientId;
  const clientName = clientId ? dummyClients[clientId] || `Client ${clientId}` : '';
  
  // Choose navigation items based on route path
  const navItems = (isClientRoute || isProfessionalView) ? clientNavItems : professionalNavItems;
  
  const getNavPath = (basePath: string) => {
    if (isProfessionalView && clientId) {
      return `/professional/${clientId}${basePath}`;
    } else if (isClientRoute || isProfessionalView) {
      return `/client${basePath}`;
    }
    return basePath;
  };
  
  const handleBackToProfessional = () => {
    navigate('/professional/dashboard');
    onOpenChange(false);
  };
  
  const helpText = isProfessionalView
    ? "You're viewing this client's dashboard as a professional."
    : isClientRoute 
    ? "Contact your professional for assistance."
    : "Contact your administrator or our support team.";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 w-[280px]">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center justify-start">
            <Logo />
          </SheetTitle>
        </SheetHeader>
        
        <div className="overflow-y-auto py-2">
          {isProfessionalView && (
            <div className="mx-2 mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
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
                Back to My Dashboard
              </Button>
            </div>
          )}
          
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
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
                onClick={() => onOpenChange(false)}
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        
        <SheetFooter className="border-t p-4 mt-auto">
          <div className="text-sm">
            <div className="font-medium">Need help?</div>
            <div className="text-muted-foreground mt-1">
              {helpText}
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
