
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ClientSidebar from './ClientSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const { userProfile } = useAuth();
  
  // Determine which sidebar to show based on user role
  const SidebarComponent = userProfile?.role === 'business' ? ClientSidebar : Sidebar;
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        {!isMobile && <SidebarComponent />}
        <main className="flex-1 p-4 md:p-6 max-w-[1400px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
