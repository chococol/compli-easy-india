
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  ClipboardList, 
  MessageSquare, 
  Settings,
  CreditCard
} from 'lucide-react';

const clientNavItems = [
  { icon: Home, label: 'Dashboard', path: '/client/dashboard' },
  { icon: FileText, label: 'Documents', path: '/client/documents' },
  { icon: ClipboardList, label: 'Tasks', path: '/client/tasks' },
  { icon: CreditCard, label: 'Payments', path: '/client/payments' },
  { icon: MessageSquare, label: 'Messages', path: '/client/messages' },
  { icon: Settings, label: 'Settings', path: '/client/settings' },
];

const ClientSidebar = () => {
  return (
    <aside className="w-64 border-r bg-card p-4 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="space-y-1 mt-2">
        {clientNavItems.map((item) => (
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
            Contact your professional for assistance.
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ClientSidebar;
