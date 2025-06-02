
import React, { useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { 
  Home, 
  Building,
  MessageSquare, 
  CreditCard, 
  Settings,
  FileText,
  ClipboardCheck,
  Users,
  User,
  TrendingUp,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Enhanced navigation structure with sub-items
const professionalNavItems = [
  { 
    icon: Home, 
    label: 'Home', 
    path: '/professional/home',
    hasSubItems: false
  },
  { 
    icon: Building, 
    label: 'Companies', 
    path: '/professional/companies',
    hasSubItems: false
  },
  { 
    icon: ClipboardCheck, 
    label: 'Compliances', 
    path: '/professional/compliances',
    hasSubItems: true,
    subItems: [
      { label: 'Active Tasks', path: '/professional/compliances/active' },
      { label: 'Templates', path: '/professional/compliances/templates' },
      { label: 'Calendar', path: '/professional/compliances/calendar' },
      { label: 'Reports', path: '/professional/compliances/reports' }
    ]
  },
  { 
    icon: FileText, 
    label: 'Documents', 
    path: '/professional/documents',
    hasSubItems: true,
    subItems: [
      { label: 'Upload', path: '/professional/documents/upload' },
      { label: 'Requests', path: '/professional/documents/requests' },
      { label: 'Archive', path: '/professional/documents/archive' },
      { label: 'Templates', path: '/professional/documents/templates' }
    ]
  },
  { 
    icon: CreditCard, 
    label: 'Payments', 
    path: '/professional/payments',
    hasSubItems: false
  },
  { 
    icon: MessageSquare, 
    label: 'Messages', 
    path: '/professional/messages',
    hasSubItems: false
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    path: '/professional/settings',
    hasSubItems: false
  },
];

const clientNavItems = [
  { 
    icon: Home, 
    label: 'Home', 
    path: '/home',
    hasSubItems: false
  },
  { 
    icon: Building, 
    label: 'Organization', 
    path: '/organization',
    hasSubItems: true,
    subItems: [
      { label: 'Entity Info', path: '/organization' },
      { label: 'Associates', path: '/organization/associates' },
      { label: 'Stakeholders', path: '/organization/stakeholders' },
      { label: 'Assets', path: '/organization/assets' }
    ]
  },
  { 
    icon: FileText, 
    label: 'Documents', 
    path: '/documents',
    hasSubItems: true,
    subItems: [
      { label: 'My Documents', path: '/documents' },
      { label: 'Upload', path: '/documents/upload' },
      { label: 'Requests', path: '/documents/requests' },
      { label: 'Archive', path: '/documents/archive' }
    ]
  },
  { 
    icon: ClipboardCheck, 
    label: 'Compliances', 
    path: '/compliances',
    hasSubItems: true,
    subItems: [
      { label: 'Overview', path: '/compliances' },
      { label: 'Active Tasks', path: '/compliances/active' },
      { label: 'Calendar', path: '/compliances/calendar' },
      { label: 'History', path: '/compliances/history' }
    ]
  },
  { 
    icon: CreditCard, 
    label: 'Payments', 
    path: '/payments',
    hasSubItems: false
  },
  { 
    icon: MessageSquare, 
    label: 'Messages', 
    path: '/messages',
    hasSubItems: false
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    path: '/settings',
    hasSubItems: false
  },
];

interface EnhancedSidebarProps {
  isClient?: boolean;
}

const EnhancedSidebar: React.FC<EnhancedSidebarProps> = ({ isClient = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const params = useParams();
  
  const navItems = isClient ? clientNavItems : professionalNavItems;
  
  // Determine which sidebar to show based on route path
  const isProfessionalViewingClient = location.pathname.startsWith('/professional/') && params.clientId;
  const actualNavItems = isProfessionalViewingClient ? clientNavItems : navItems;
  
  // Adjust paths based on context
  const getNavPath = (basePath: string) => {
    if (isProfessionalViewingClient && params.clientId) {
      return `/professional/${params.clientId}${basePath}`;
    }
    if (isClient && !isProfessionalViewingClient) {
      return `/client${basePath}`;
    }
    return basePath;
  };

  const handleMainItemClick = (item: any, e: React.MouseEvent) => {
    if (item.hasSubItems) {
      e.preventDefault();
      if (activeSubMenu === item.label) {
        // Close sub-menu if clicking the same item
        setActiveSubMenu(null);
        setIsCollapsed(false);
      } else {
        // Open sub-menu and collapse main sidebar
        setActiveSubMenu(item.label);
        setIsCollapsed(true);
      }
    } else {
      // Close any open sub-menu
      setActiveSubMenu(null);
      setIsCollapsed(false);
    }
  };

  const handleChevronClick = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (activeSubMenu === item.label) {
      setActiveSubMenu(null);
      setIsCollapsed(false);
    } else {
      setActiveSubMenu(item.label);
      setIsCollapsed(true);
    }
  };

  const closeSubMenu = () => {
    setActiveSubMenu(null);
    setIsCollapsed(false);
  };

  const activeSubMenuData = actualNavItems.find(item => item.label === activeSubMenu);

  const shouldShowFullSidebar = !isCollapsed || isHovered;

  return (
    <div className="flex h-screen">
      {/* Main Sidebar */}
      <aside 
        className={cn(
          "border-r bg-card transition-all duration-300 ease-in-out flex flex-col h-screen overflow-hidden",
          shouldShowFullSidebar ? "w-64" : "w-16"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-4 flex flex-col h-full">
          <nav className="space-y-1 mt-2 flex-1">
            {actualNavItems.map((item) => {
              const isActive = location.pathname === getNavPath(item.path) || 
                               (item.hasSubItems && item.subItems?.some(subItem => 
                                 location.pathname === getNavPath(subItem.path)
                               ));

              return (
                <div key={item.path} className="relative">
                  <NavLink
                    to={getNavPath(item.path)}
                    onClick={(e) => handleMainItemClick(item, e)}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm rounded-md transition-colors group",
                      isActive 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'text-foreground hover:bg-muted'
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {shouldShowFullSidebar && (
                      <>
                        <span className="ml-3 truncate">{item.label}</span>
                        {item.hasSubItems && (
                          <ChevronRight 
                            className={cn(
                              "h-4 w-4 ml-auto shrink-0 transition-transform",
                              activeSubMenu === item.label && "rotate-90"
                            )}
                            onClick={(e) => handleChevronClick(item, e)}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </div>
              );
            })}
          </nav>
          
          <div className="pt-4 border-t">
            <div className="px-3 py-2">
              {shouldShowFullSidebar && (
                <>
                  <div className="text-sm font-medium">Need help?</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Contact your administrator or our support team.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Sub Sidebar */}
      {activeSubMenu && activeSubMenuData && (
        <aside className="w-64 border-r bg-card/95 backdrop-blur-sm flex flex-col h-screen overflow-y-auto animate-in slide-in-from-left-5 duration-300">
          <div className="p-4 flex flex-col h-full">
            {/* Header with back button */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b">
              <button
                onClick={closeSubMenu}
                className="p-1 hover:bg-muted rounded-md transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h3 className="font-medium text-sm">{activeSubMenuData.label}</h3>
                <p className="text-xs text-muted-foreground">Navigate sections</p>
              </div>
            </div>

            {/* Sub Navigation */}
            <nav className="space-y-1 flex-1">
              {activeSubMenuData.subItems?.map((subItem) => {
                const isSubActive = location.pathname === getNavPath(subItem.path);
                
                return (
                  <NavLink
                    key={subItem.path}
                    to={getNavPath(subItem.path)}
                    onClick={closeSubMenu}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                      isSubActive 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'text-foreground hover:bg-muted'
                    )}
                  >
                    <span>{subItem.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </aside>
      )}
    </div>
  );
};

export default EnhancedSidebar;
