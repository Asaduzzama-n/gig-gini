// components/navigation/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Menu,
  User,
  Settings,
  LogOut,
  Trophy,
  BarChart3,
  Bell,
  Plus,
} from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';

// Mock user data - replace with actual auth context
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '',
  role: 'employee' as const,
  notifications: 3,
};

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/competitions', label: 'Competitions' },
  { href: '/leaderboards', label: 'Leaderboards' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Mock auth state - replace with actual auth context
  const isAuthenticated = true; // This would come from your auth provider
  const user = mockUser as any; // This would come from your auth context

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 w-full  transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-gray-50'
      }`}
    >
      <div className="container-width flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <div className="h-8 w-8 rounded-lg bg-[#FC5602] flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold gradient-text">GiG Gini</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative font-medium transition-colors duration-200 ${
                pathname === item.href
                  ? 'text-[#FC5602]'
                  : 'text-gray-600 hover:text-[#FC5602]'
              }`}
            >
              {item.label}
              {pathname === item.href && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 top-full h-0.5 w-full bg-[#FC5602]"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-3">
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="btn-primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              {/* Quick Action Buttons */}
              {user.role === 'employee' && (
                <Link href="/competitions">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4" />
                    <span>Join Competition</span>
                  </Button>
                </Link>
              )}
              
              {user.role === 'employer' && (
                <Link href="/employers/create">
                  <Button className="btn-primary" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Competition
                  </Button>
                </Link>
              )}

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {user.notifications > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-4 w-4 bg-[#FC5602] text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {user.notifications}
                  </motion.span>
                )}
              </Button>

              {/* User Avatar Dropdown */}
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="bg-[#FC5602] text-white">
          {user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent
    className="w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg"
    align="end"
    forceMount
  >
    <DropdownMenuLabel className="font-normal">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{user.name}</p>
        <p className="text-xs leading-none text-muted-foreground">
          {user.email}
        </p>
      </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />

    <DropdownMenuItem asChild className="hover:bg-gray-100 dark:hover:bg-gray-800">
      <Link href="/profile" className="cursor-pointer flex items-center">
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
      </Link>
    </DropdownMenuItem>

    {user.role === 'employer' && (
      <DropdownMenuItem asChild className="hover:bg-gray-100 dark:hover:bg-gray-800">
        <Link href="/employers/dashboard" className="cursor-pointer flex items-center">
          <BarChart3 className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </Link>
      </DropdownMenuItem>
    )}

    {user.role === 'admin' && (
      <DropdownMenuItem asChild className="hover:bg-gray-100 dark:hover:bg-gray-800">
        <Link href="/admin" className="cursor-pointer flex items-center">
          <Settings className="mr-2 h-4 w-4" />
          <span>Admin Panel</span>
        </Link>
      </DropdownMenuItem>
    )}

    <DropdownMenuItem asChild className="hover:bg-gray-100 dark:hover:bg-gray-800">
      <Link href="/settings" className="cursor-pointer flex items-center">
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
      </Link>
    </DropdownMenuItem>

    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />

    <DropdownMenuItem
      className="cursor-pointer text-red-600 focus:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40"
      onClick={handleLogout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Logout</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
<SheetContent
  side="right"
  className="z-[60] w-[300px] sm:w-[400px] flex flex-col h-full p-0 
             bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-lg"
>
  {/* Header */}
  <SheetHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
    <SheetTitle className="flex items-center space-x-2">
      <div className="h-6 w-6 rounded bg-[#FC5602] flex items-center justify-center">
        <span className="text-white font-bold text-sm">G</span>
      </div>
      <span className="gradient-text">GiG Gini</span>
    </SheetTitle>
    <SheetDescription>
      Navigate through competitive hiring platform
    </SheetDescription>
  </SheetHeader>

  {/* Scrollable body */}
  <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
    {/* Mobile Navigation Links */}
    {navItems.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
          pathname === item.href
            ? 'text-[#FC5602] bg-orange-50 dark:bg-orange-500/10'
            : 'text-gray-600 dark:text-gray-300 hover:text-[#FC5602] hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        {item.label}
      </Link>
    ))}

    {/* Mobile Auth Section */}
    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
      {!isAuthenticated ? (
        <>
          <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="outline" className="w-full">
              Login
            </Button>
          </Link>
          <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="btn-primary w-full">
              Sign Up
            </Button>
          </Link>
        </>
      ) : (
        <>
          {/* User Info */}
          <div className="flex items-center space-x-3 px-3 py-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-[#FC5602] text-white">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {/* Role-based actions */}
          <div className="space-y-2">
            {/* ... role-based buttons ... */}

            {/* Logout */}
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-600 
                         hover:bg-red-50 dark:hover:bg-red-900/40"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </>
      )}
    </div>
  </div>
</SheetContent>

          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}