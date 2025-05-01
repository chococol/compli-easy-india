
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  ClipboardList, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  Settings,
  Building,
  Users,
  Calendar,
  Plus,
  UserPlus
} from 'lucide-react';

const professionalNavItems = [
  { icon: Home, label: 'Dashboard', path: '/professional/dashboard' },
  { icon: Users, label: 'Clients', path: '/professional/clients' },
  { icon: UserPlus, label: 'Add Client', path: '/professional/clients/add' },
  { icon: Calendar, label: 'Compliance Calendar', path: '/professional/calendar' },
  { icon: FileText, label: 'Documents', path: '/professional/documents' },
  { icon: MessageSquare, label: 'Messages', path: '/professional/messages' },
  { icon: Settings, label: 'Settings', path: '/professional/settings' },
];

const Sidebar = () => {
  // Always show professional navigation items
  const navItems = professionalNavItems;

  return (
    <aside className="w-64 border-r bg-card p-4 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="space-y-1 mt-2">
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
