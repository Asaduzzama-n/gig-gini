"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Trophy, 
  Plus, 
  Users, 
  Menu,
  Briefcase,
  Target,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';


interface BottomNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  roles?: ('admin' | 'employer' | 'employee')[];
}

const bottomNavItems: BottomNavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: Home
  },
  {
    id: 'leaderboard',
    label: 'Leaderboard',
    href: '/leaderboards',
    icon: Trophy
  },
  {
    id: 'create',
    label: 'Create',
    href: '/employer/competitions/create',
    icon: Plus,
    requiresAuth: true,
    roles: ['employer']
  },
  {
    id: 'participate',
    label: 'Join',
    href: '/browse-competitions',
    icon: Target,
    requiresAuth: true,
    roles: ['employee']
  }
];

const menuItems = [
  {
    label: 'My Profile',
    href: '/profile',
    icon: Users,
    requiresAuth: true
  },
  {
    label: 'My Competitions',
    href: '/employee/competitions',
    icon: Briefcase,
    requiresAuth: true,
    roles: ['employee']
  },
  {
    label: 'My Competitions',
    href: '/employer/competitions',
    icon: Briefcase,
    requiresAuth: true,
    roles: ['employer']
  },
  {
    label: 'Browse Competitions',
    href: '/browse-competitions',
    icon: Target
  },
  {
    label: 'Leaderboards',
    href: '/leaderboards',
    icon: Trophy
  }
];

export function BottomNavigation() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getVisibleNavItems = () => {
    return bottomNavItems.filter(item => {
      if (item.requiresAuth && !isAuthenticated) return false;
      if (item.roles && (!user?.role || !item.roles.includes(user.role))) return false;
      return true;
    });
  };

  const getMenuItems = () => {
    const baseItems = menuItems.filter(item => {
      if (item.requiresAuth && !isAuthenticated) return false;
      if (item.roles && (!user?.role || !item.roles.includes(user.role))) return false;
      return true;
    });
    
    // Add additional menu items
    const additionalItems = [
      {
        label: 'Settings',
        href: '/settings',
        icon: Settings,
        requiresAuth: true
      },
      {
        label: 'Help & Support',
        href: '/help',
        icon: HelpCircle
      }
    ].filter(item => {
      if (item.requiresAuth && !isAuthenticated) return false;
      return true;
    });
    
    return [...baseItems, ...additionalItems];
  };

  const visibleNavItems = getVisibleNavItems();
  const visibleMenuItems = getMenuItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/50 md:hidden shadow-lg">
      <div className="flex items-center justify-around py-2">
        {visibleNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 min-w-0 flex-1 relative",
                isActive 
                  ? "text-orange-600 bg-orange-50 shadow-sm scale-105" 
                  : "text-gray-500 hover:text-orange-600 hover:bg-orange-50/50 hover:scale-105"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-orange-100"
                  : "group-hover:bg-orange-50"
              )}>
                <Icon className={cn(
                  "h-5 w-5 transition-all duration-200",
                  isActive ? "scale-110" : ""
                )} />
              </div>
              <span className={cn(
                "text-xs font-medium truncate mt-1 transition-all duration-200",
                isActive ? "font-semibold" : ""
              )}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-orange-600 rounded-full" />
              )}
            </Link>
          );
        })}
        
        {/* Menu Sheet */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 min-w-0 flex-1 relative group",
                isMenuOpen 
                  ? "text-orange-600 bg-orange-50 shadow-sm scale-105" 
                  : "text-gray-500 hover:text-orange-600 hover:bg-orange-50/50 hover:scale-105"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg transition-all duration-200",
                isMenuOpen
                  ? "bg-orange-100"
                  : "group-hover:bg-orange-50"
              )}>
                <Menu className={cn(
                  "h-5 w-5 transition-all duration-200",
                  isMenuOpen ? "scale-110" : ""
                )} />
              </div>
              <span className={cn(
                "text-xs font-medium mt-1 transition-all duration-200",
                isMenuOpen ? "font-semibold" : ""
              )}>Menu</span>
              {isMenuOpen && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-orange-600 rounded-full" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[60vh] rounded-t-xl">
            <div className="py-4">
              <h3 className="text-lg font-semibold mb-4">Menu</h3>
              <div className="space-y-2">
                {visibleMenuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Icon className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
                
                {isAuthenticated && (
                  <>
                    <div className="border-t border-gray-200 my-4" />
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600 w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </>
                )}
                
                {!isAuthenticated && (
                  <>
                    <div className="border-t border-gray-200 my-4" />
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center p-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-colors"
                    >
                      <span className="font-medium">Sign In</span>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center p-3 rounded-lg border border-orange-600 text-orange-600 hover:bg-orange-50 transition-colors"
                    >
                      <span className="font-medium">Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}