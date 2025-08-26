// components/dashboard/DashboardSidebar.tsx
"use client";

import { motion } from 'framer-motion';
import { useSidebar } from '@/contexts/SidebarContext';
import { 
  ChevronLeft, ChevronRight, Home, User, Settings, LogOut,
  Users, Trophy, Building, BarChart3, FileText, Award,
  Calendar, Activity, DollarSign, Bell, HelpCircle,
  Briefcase, Target, MessageSquare, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  children?: SidebarItem[];
}

interface DashboardSidebarProps {
  userRole: 'admin' | 'employer' | 'employee';
  activeTab: string;
  onTabChange: (tabId: string) => void;
  userName?: string;
  userAvatar?: string;
}

const adminMenuItems: SidebarItem[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'users', label: 'Users', icon: Users, badge: 3 },
  { id: 'competitions', label: 'Competitions', icon: Trophy },
  { id: 'subscriptions', label: 'Subscriptions', icon: DollarSign },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'content', label: 'Content Management', icon: FileText },
  { id: 'notifications', label: 'Notifications', icon: Bell, badge: 5 },
  { id: 'settings', label: 'System Settings', icon: Settings }
];

const employerMenuItems: SidebarItem[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'competitions', label: 'My Competitions', icon: Trophy },
  { id: 'candidates', label: 'Candidates', icon: Users, badge: 12 },
  { id: 'interviews', label: 'Interviews', icon: Calendar },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'billing', label: 'Billing', icon: DollarSign },
  { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 2 },
  { id: 'profile', label: 'Company Profile', icon: Building },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const employeeMenuItems: SidebarItem[] = [
  { id: 'overview', label: 'Dashboard', icon: Home },
  { id: 'competitions', label: 'My Competitions', icon: Trophy },
  { id: 'applications', label: 'Applications', icon: Briefcase, badge: 3 },
  { id: 'achievements', label: 'Achievements', icon: Award },
  { id: 'leaderboard', label: 'Leaderboard', icon: Target },
  { id: 'interviews', label: 'Interviews', icon: Calendar },
  { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 1 },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export default function DashboardSidebar({ 
  userRole, 
  activeTab, 
  onTabChange, 
  userName = "User",
  userAvatar 
}: DashboardSidebarProps) {
  const { isCollapsed, isMobileOpen, toggleCollapse, toggleMobile } = useSidebar();

  const getMenuItems = () => {
    switch (userRole) {
      case 'admin': return adminMenuItems;
      case 'employer': return employerMenuItems;
      case 'employee': return employeeMenuItems;
      default: return [];
    }
  };

  const menuItems = getMenuItems();

  const getRoleTitle = () => {
    switch (userRole) {
      case 'admin': return 'Admin Panel';
      case 'employer': return 'Employer Hub';
      case 'employee': return 'My Dashboard';
      default: return 'Dashboard';
    }
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'admin': return 'from-red-500 to-red-600';
      case 'employer': return 'from-blue-500 to-blue-600';
      case 'employee': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => toggleMobile()}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "flex flex-col fixed left-0 top-16 bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-40",
          // Desktop styles
          "md:flex",
          isCollapsed ? "md:w-16" : "md:w-64",
          // Mobile styles
          isMobileOpen ? "flex w-64 z-50" : "hidden md:flex",
          "h-[calc(100vh-4rem)]"
        )}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => toggleMobile()}
          className="md:hidden absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{getRoleTitle()}</h2>
              <p className="text-xs text-gray-500 capitalize">{userRole} Dashboard</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center text-white font-semibold text-sm",
            getRoleColor()
          )}>
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="w-full h-full rounded-full" />
            ) : (
              userName.split(' ').map(n => n[0]).join('').slice(0, 2)
            )}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
              }}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg transition-colors duration-150",
                isActive
                  ? "bg-orange-100 text-orange-700 border-r-2 border-orange-500"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0",
                isActive ? "text-orange-600" : "text-gray-500"
              )} />
              
              {!isCollapsed && (
                <>
                  <span className="font-medium text-sm">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto bg-red-100 text-red-700 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-2 border-t border-gray-200">
        <Separator className="mb-2" />
        
        <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
          <HelpCircle className="w-5 h-5 flex-shrink-0 text-gray-500" />
          {!isCollapsed && <span className="font-medium text-sm">Help & Support</span>}
        </button>

        <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>

        {/* Collapsed state tooltip indicator */}
        {isCollapsed && (
          <div className="hidden md:block absolute top-4 -right-2 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
            <ChevronRight className="w-3 h-3 text-white" />
          </div>
        )}
      </motion.div>
    </>
  );
}