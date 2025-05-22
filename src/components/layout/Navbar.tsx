
import React, { useState } from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from '../Logo';
import MobileSidebar from './MobileSidebar';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut, userProfile } = useAuth();
  const navigate = useNavigate();

  // Determine correct auth route based on user profile or default to professional
  const getAuthRoute = () => {
    if (userProfile?.role === 'business' || userProfile?.role === 'professional') {
      return `/${userProfile.role === 'business' ? 'client' : 'professional'}/auth`;
    }
    return '/professional/auth'; // Default to professional auth
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2" 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        <Logo />
        
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          
          {user ? (
            <>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="User profile">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    const route = userProfile?.role === 'business' ? '/dashboard' : '/professional/dashboard';
                    navigate(route);
                  }}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => navigate(getAuthRoute())}>
                Sign In
              </Button>
              <Button onClick={() => navigate(`${getAuthRoute()}?mode=signup`)}>
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <MobileSidebar 
        open={isMobileMenuOpen} 
        onOpenChange={setIsMobileMenuOpen} 
      />
    </header>
  );
};

export default Navbar;
