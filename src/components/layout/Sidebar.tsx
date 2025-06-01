
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Building,
  MessageSquare, 
  CreditCard, 
  Settings,
} from 'lucide-react';

const professionalNavItems = [
  { icon: Home, label: 'Home', path: '/professional/home' },
  { icon: Building, label: 'Companies', path: '/professional/companies' },
  { icon: CreditCard, label: 'Payments', path: '/professional/payments' },
  { icon: MessageSquare, label: 'Messages', path: '/professional/messages' },
  { icon: Settings, label: 'Settings', path: '/professional/settings' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 border-r bg-card p-4 flex flex-col h-screen overflow-y-auto">
      <nav className="space-y-1 mt-2">
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
            Contact your administrator or our support team.
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
