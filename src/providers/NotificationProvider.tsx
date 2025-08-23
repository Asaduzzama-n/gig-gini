// providers/NotificationProvider.tsx
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';


interface NotificationContextType {
  showNotification: (
    title: string,
    description?: string,
    type?: 'default' | 'success' | 'error' | 'warning'
  ) => void;
  showSuccess: (title: string, description?: string) => void;
  showError: (title: string, description?: string) => void;
  showWarning: (title: string, description?: string) => void;
  showInfo: (title: string, description?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const showNotification = useCallback((
    title: string,
    description?: string,
    type: 'default' | 'success' | 'error' | 'warning' = 'default'
  ) => {
    ({
      title,
      description,
      variant: type === 'error' ? 'destructive' : 'default',
      className: `${
        type === 'success' 
          ? 'border-green-500 bg-green-50 text-green-900' 
          : type === 'warning'
          ? 'border-yellow-500 bg-yellow-50 text-yellow-900'
          : type === 'error'
          ? 'border-red-500 bg-red-50 text-red-900'
          : 'border-[#FC5602] bg-orange-50 text-orange-900'
      }`,
    });
  }, []);

  const showSuccess = useCallback((title: string, description?: string) => {
    showNotification(title, description, 'success');
  }, [showNotification]);

  const showError = useCallback((title: string, description?: string) => {
    showNotification(title, description, 'error');
  }, [showNotification]);

  const showWarning = useCallback((title: string, description?: string) => {
    showNotification(title, description, 'warning');
  }, [showNotification]);

  const showInfo = useCallback((title: string, description?: string) => {
    showNotification(title, description, 'default');
  }, [showNotification]);

  const value: NotificationContextType = {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}