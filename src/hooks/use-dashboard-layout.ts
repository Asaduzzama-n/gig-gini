"use client";

import { useEffect, useState } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import { useIsMobile } from './use-mobile';


export function useDashboardLayout() {
  const { isCollapsed, isMobileOpen } = useSidebar();
  const isMobile = useIsMobile();
  const [layoutStyles, setLayoutStyles] = useState({
    sidebarWidth: '16rem',
    contentMarginLeft: '16rem',
    contentWidth: 'calc(100% - 16rem)',
    contentPaddingLeft: '1.25rem',
  });

  useEffect(() => {
    if (isMobile) {
      // Mobile layout
      setLayoutStyles({
        sidebarWidth: '16rem',
        contentMarginLeft: '0',
        contentWidth: '100%',
        contentPaddingLeft: '1rem',
      });
    } else {
      // Desktop layout
      const sidebarWidth = isCollapsed ? '4rem' : '16rem';
      const contentMarginLeft = isCollapsed ? '4rem' : '16rem';
      const contentWidth = isCollapsed ? 'calc(100% - 4rem)' : 'calc(100% - 16rem)';
      
      setLayoutStyles({
        sidebarWidth,
        contentMarginLeft,
        contentWidth,
        contentPaddingLeft: '1.25rem',
      });
    }
  }, [isCollapsed, isMobile]);

  return {
    layoutStyles,
    isMobile,
    isCollapsed,
    isMobileOpen,
  };
}