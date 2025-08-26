import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Dashboard | GiG Gini',
  description: 'View your competitions, applications, achievements, and leaderboard ranking on the GiG Gini platform.',
  keywords: 'employee dashboard, my competitions, applications, achievements, leaderboard, profile',
};

function EmployeeDashboardContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Welcome to your personal dashboard. Use the sidebar to navigate between your competitions,
          applications, achievements, and other sections.
        </p>
      </div>
    </div>
  );
}

export default function EmployeeDashboard() {
  return <EmployeeDashboardContent />;
}