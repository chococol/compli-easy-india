
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Layers,
  CheckCircle2,
  Scale,
  FileText,
  Briefcase,
  Users,
  Building2,
  Settings,
} from 'lucide-react';

const navMain = [
  { icon: Home, label: 'Home', path: '/professional/home' },
  { icon: Layers, label: 'Assets', path: '/professional/assets' },       // Now includes Licenses/IPR
  { icon: CheckCircle2, label: 'Compliances', path: '/professional/compliances' },
  { icon: Scale, label: 'Taxes', path: '/professional/taxes' },
  { icon: Briefcase, label: 'Services', path: '/professional/services' }, // Renamed Legal Services to Services
  { icon: FileText, label: 'Documents', path: '/professional/documents' },
];

const navSecondary = [
  { icon: Users, label: 'Team', path: '/professional/team' },
];

const navBottom = [
  { icon: Building2, label: 'Organization Details', path: '/professional/organization' },
  { icon: Settings, label: 'Settings', path: '/professional/settings' },
];

const Sidebar = () => {
  return (
    <aside className="flex flex-col h-screen w-64 border-r bg-card p-4">
      <nav className="flex-1 flex flex-col gap-2">

        {/* Top main group */}
        <div className="space-y-1">
          {navMain.map((item) => (
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
        </div>

        {/* Divider */}
        <div className="my-2 border-t" />

        {/* Team */}
        <div>
          {navSecondary.map((item) => (
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
        </div>
      </nav>

      {/* Divider above Organization/Settings */}
      <div className="mb-2 border-t" />

      {/* Organization and Settings at the bottom */}
      <nav className="flex flex-col gap-1 mt-auto">
        {navBottom.map((item) => (
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
    </aside>
  );
};

export default Sidebar;
