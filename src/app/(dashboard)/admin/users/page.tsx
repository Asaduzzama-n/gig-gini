import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Management - Admin Dashboard | GiG Gini',
  description: 'Manage users, employees, and employers on the GiG Gini platform. View user statistics, manage accounts, and monitor user activity.',
  keywords: 'user management, admin dashboard, employee management, employer management, user analytics',
};

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          This page will show detailed user management functionality when navigated via sidebar.
          The content is dynamically loaded based on the selected tab.
        </p>
      </div>
    </div>
  );
}