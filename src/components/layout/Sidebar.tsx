
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
  Calendar
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const businessNavItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Building, label: 'My Company', path: '/company' },
  { icon: ClipboardList, label: 'Tasks', path: '/tasks' },
  { icon: FileText, label: 'Documents', path: '/documents' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const professionalNavItems = [
  { icon: Home, label: 'Dashboard', path: '/professional/dashboard' },
  { icon: Users, label: 'Clients', path: '/professional/clients' },
  { icon: Calendar, label: 'Compliance Calendar', path: '/professional/calendar' },
  { icon: FileText, label: 'Documents', path: '/professional/documents' },
  { icon: MessageSquare, label: 'Messages', path: '/professional/messages' },
  { icon: Settings, label: 'Settings', path: '/professional/settings' },
];

const Sidebar = () => {
  const { userProfile } = useAuth();
  const isProfessional = userProfile?.role === 'professional';
  
  const navItems = isProfessional ? professionalNavItems : businessNavItems;

  return (
    <aside className="w-64 border-r bg-card p-4 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="space-y-1 mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="mt-auto pt-4 border-t">
        <div className="px-3 py-2">
          <div className="text-sm font-medium">Need help?</div>
          <div className="text-xs text-muted-foreground mt-1">
            Contact your {isProfessional ? 'administrator' : 'manager'} or our support team.
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
