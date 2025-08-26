// components/dashboard/DashboardLayout.tsx
"use client";

import { ReactNode } from 'react';
import DashboardSidebar from './DashboardSidebar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  userRole: 'admin' | 'employer' | 'employee';
  activeTab: string;
  onTabChange: (tabId: string) => void;
  userName?: string;
  userAvatar?: string;
  children: ReactNode;
  className?: string;
}

export default function DashboardLayout({
  userRole,
  activeTab,
  onTabChange,
  userName,
  userAvatar,
  children,
  className
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        userRole={userRole}
        activeTab={activeTab}
        onTabChange={onTabChange}
        userName={userName}
        userAvatar={userAvatar}
      />
      
      {/* Main Content */}
      <div className="flex-1 ml-16 md:ml-64 transition-all duration-300">
        <main className={cn(
          "h-full overflow-auto bg-gradient-to-br from-gray-50 to-orange-50",
          className
        )}>
          {children}
        </main>
      </div>
      
      {/* Mobile overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" />
    </div>
  );
}