
import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, ClipboardList, FileText, MessageSquare, CreditCard, Settings, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '../Logo';

interface MobileSidebarProps {
  onClose: () => void;
}

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Building, label: 'My Company', path: '/company' },
  { icon: ClipboardList, label: 'Tasks', path: '/tasks' },
  { icon: FileText, label: 'Documents', path: '/documents' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const MobileSidebar: React.FC<MobileSidebarProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-card p-6 shadow-lg animate-in slide-in-from-left">
        <div className="flex items-center justify-between mb-6">
          <Logo />
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={onClose}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-auto pt-6 border-t mt-6">
          <div className="px-3 py-2">
            <div className="text-sm font-medium">Need help?</div>
            <div className="text-xs text-muted-foreground mt-1">
              Contact your manager or our support team.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
