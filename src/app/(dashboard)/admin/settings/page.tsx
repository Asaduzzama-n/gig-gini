import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System Settings - Admin Dashboard | GiG Gini',
  description: 'Manage system settings, configurations, and platform preferences for the GiG Gini platform.',
  keywords: 'system settings, admin configuration, platform settings, admin dashboard',
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Platform Configuration</h2>
        <p className="text-gray-600">
          Manage system-wide settings, configurations, and platform preferences.
        </p>
      </div>
    </div>
  );
}