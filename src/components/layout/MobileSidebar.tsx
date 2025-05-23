
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Building,
  FileText,
  ClipboardList,
  MessageSquare, 
  CreditCard, 
  Settings
} from 'lucide-react';
import Logo from '../Logo';
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
  { icon: Home, label: 'Dashboard', path: '/client/dashboard' },
  { icon: Building, label: 'My Company', path: '/client/company' },
  { icon: FileText, label: 'Documents', path: '/client/documents' },
  { icon: ClipboardList, label: 'Tasks', path: '/client/tasks' },
  { icon: CreditCard, label: 'Payments', path: '/client/payments' },
  { icon: MessageSquare, label: 'Messages', path: '/client/messages' },
  { icon: Settings, label: 'Settings', path: '/client/settings' },
];

const MobileSidebar: React.FC<MobileSidebarProps> = ({ open, onOpenChange }) => {
  const location = useLocation();
  const isClientRoute = location.pathname.startsWith('/client');
  
  // Choose navigation items based on route path
  const navItems = isClientRoute ? clientNavItems : professionalNavItems;
  const helpText = isClientRoute
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
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
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
