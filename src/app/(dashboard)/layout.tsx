'use client'
import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { usePathname, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { useAuthStore } from "@/stores/authStore";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";


function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const { isCollapsed } = useSidebar();
  const { user } = useAuthStore();

  // Memoize user role based on the current path
  const userRole = useMemo((): 'admin' | 'employer' | 'employee' => {
    if (pathname.startsWith('/admin')) return 'admin';
    if (pathname.startsWith('/employer')) return 'employer';
    if (pathname.startsWith('/employee')) return 'employee';
    return 'employee'; // default fallback
  }, [pathname]);

  // Memoize path to tab mapping
  const pathToTabMap = useMemo((): Record<string, string> => ({
    'admin': 'overview',
    'employer': 'overview',
    'employee': 'overview',
    'users': 'users',
    'competitions': 'competitions',
    'candidates': 'candidates',
    'interviews': 'interviews',
    'analytics': 'analytics',
    'billing': 'billing',
    'messages': 'messages',
    'settings': 'settings',
    'profile': 'profile',
    'applications': 'applications',
    'achievements': 'achievements',
    'leaderboard': 'leaderboard',
    'subscriptions': 'subscriptions',
    'reports': 'reports',
    'content': 'content',
    'notifications': 'notifications'
  }), []);

  // Update active tab based on current pathname
  React.useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    const newActiveTab = pathToTabMap[lastSegment] || 'overview';
    setActiveTab(newActiveTab);
  }, [pathname, pathToTabMap]);

  // Memoize base path based on user role
  const basePath = useMemo(() => {
    switch (userRole) {
      case 'admin':
        return '/admin';
      case 'employer':
        return '/employer';
      case 'employee':
        return '/employee';
      default:
        return '/employee';
    }
  }, [userRole]);

  // Handle tab change with navigation
  const handleTabChange = (tabId: string) => {
    // Navigate to appropriate route
    if (tabId === 'overview') {
      router.push(basePath);
    } else if (tabId === 'profile' || tabId === 'settings') {
      // Handle role-specific routing for profile and settings
      router.push(`/${userRole}/${tabId}`);
    } else {
      router.push(`${basePath}/${tabId}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar
        userRole={userRole}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        userName={user?.name || "User"}
        userAvatar={user?.avatar}
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
    <ProtectedRoute>
      <SidebarProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </SidebarProvider>
    </ProtectedRoute>
  );
}