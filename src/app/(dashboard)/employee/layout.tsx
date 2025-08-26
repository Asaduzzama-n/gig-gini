"use client";

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['employee']}>
      {children}
    </ProtectedRoute>
  );
}