
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Building,
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

const MobileSidebar: React.FC<MobileSidebarProps> = ({ open, onOpenChange }) => {
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
            {professionalNavItems.map((item) => (
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
              Contact your administrator or our support team.
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
