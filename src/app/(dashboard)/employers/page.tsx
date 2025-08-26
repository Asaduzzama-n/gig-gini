import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Employer Dashboard | GiG Gini',
  description: 'Manage your competitions, view candidates, schedule interviews, and track hiring analytics on the GiG Gini platform.',
  keywords: 'employer dashboard, competition management, candidate management, hiring analytics, interview scheduling',
};

export default function EmployersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Welcome to your employer dashboard. Use the sidebar to navigate between different sections
          like competitions, candidates, interviews, and analytics.
        </p>
      </div>
    </div>
  );
}