
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import EnhancedSidebar from './EnhancedSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Determine which sidebar to show based on route path
  const isClientRoute = location.pathname.startsWith('/client');
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        {!isMobile && <EnhancedSidebar isClient={isClientRoute} />}
        <main className="flex-1 p-4 md:p-6 max-w-[1400px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
