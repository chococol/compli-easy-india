
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ClientSidebar from './ClientSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const params = useParams();
  
  // Determine which sidebar to show based on route path
  const isClientRoute = location.pathname.startsWith('/client');
  const isProfessionalViewingClient = location.pathname.startsWith('/professional/') && params.clientId;
  
  // Use ClientSidebar for client routes or when professional is viewing a client
  const SidebarComponent = (isClientRoute || isProfessionalViewingClient) ? ClientSidebar : Sidebar;
  
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
