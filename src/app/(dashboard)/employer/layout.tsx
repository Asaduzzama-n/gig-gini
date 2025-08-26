"use client";

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['employer']}>
      {children}
    </ProtectedRoute>
  );
}