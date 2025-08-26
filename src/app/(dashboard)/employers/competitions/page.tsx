import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Competitions - Employer Dashboard | GiG Gini',
  description: 'Manage your competitions, view submissions, and track candidate performance on the GiG Gini platform.',
  keywords: 'employer competitions, competition management, candidate submissions, hiring dashboard',
};

export default function EmployerCompetitionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Competitions</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Competition Management</h2>
        <p className="text-gray-600">
          Create, manage, and monitor your competitions. View candidate submissions and track performance.
        </p>
      </div>
    </div>
  );
}