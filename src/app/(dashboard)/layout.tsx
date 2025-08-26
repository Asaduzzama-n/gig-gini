'use client'
import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";


function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const { isCollapsed } = useSidebar();

  // Determine user role based on the current path
  const getUserRole = (): 'admin' | 'employer' | 'employee' => {
    if (pathname.startsWith('/admin')) return 'admin';
    if (pathname.startsWith('/employers')) return 'employer';
    if (pathname.startsWith('/profile')) return 'employee';
    return 'employee'; // default fallback
  };

  // Update active tab based on current pathname
  React.useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Map pathname to tab IDs
    const pathToTabMap: Record<string, string> = {
      'admin': 'overview',
      'employers': 'overview',
      'profile': 'overview',
      'users': 'users',
      'competitions': 'competitions',
      'candidates': 'candidates',
      'interviews': 'interviews',
      'analytics': 'analytics',
      'billing': 'billing',
      'messages': 'messages',
      'settings': 'settings',
      'applications': 'applications',
      'achievements': 'achievements',
      'leaderboard': 'leaderboard',
      'subscriptions': 'subscriptions',
      'reports': 'reports',
      'content': 'content',
      'notifications': 'notifications'
    };

    const newActiveTab = pathToTabMap[lastSegment] || 'overview';
    setActiveTab(newActiveTab);
  }, [pathname]);

  // Handle tab change with navigation
  const handleTabChange = (tabId: string) => {
    const userRole = getUserRole();
    let basePath = '';

    // Determine base path based on user role
    switch (userRole) {
      case 'admin':
        basePath = '/admin';
        break;
      case 'employer':
        basePath = '/employers';
        break;
      case 'employee':
        basePath = '/employee';
        break;
    }

    // Navigate to appropriate route
    if (tabId === 'overview') {
      router.push(basePath);
    } else {
      router.push(`${basePath}/${tabId}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        userRole={getUserRole()}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        userName="User"
      />

      {/* Main Content Area */}
      <div
        className={`
          flex-1 dashboard-transition
          ${isCollapsed ? 'md:ml-16 md:w-[calc(100%-4rem)]' : 'md:ml-64 md:w-[calc(100%-16rem)]'}
          ml-0 w-full
        `}
      >
        <main className="min-h-screen bg-gray-50">
          <div
            className="dashboard-gap"
            style={{
              paddingLeft: '1.25rem', // 20px gap from sidebar
              paddingRight: '1.25rem',
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem',
            }}
          >
            {/* Render the actual page content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}