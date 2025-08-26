import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Competition Management - Admin Dashboard | GiG Gini',
  description: 'Manage competitions on the GiG Gini platform. Monitor active competitions, review submissions, and analyze competition performance.',
  keywords: 'competition management, admin dashboard, competition analytics, contest management',
};

export default function CompetitionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Competition Management</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          This page will show detailed competition management functionality when navigated via sidebar.
          The content is dynamically loaded based on the selected tab.
        </p>
      </div>
    </div>
  );
}