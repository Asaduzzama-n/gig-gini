import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interviews - Employer Dashboard | GiG Gini',
  description: 'Schedule, manage, and conduct interviews with candidates from your competitions on the GiG Gini platform.',
  keywords: 'interview scheduling, candidate interviews, employer dashboard, interview management, hiring process',
};

export default function EmployerInterviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Interviews</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Interview Management</h2>
        <p className="text-gray-600">
          Schedule interviews, manage candidate meetings, and track interview outcomes.
        </p>
      </div>
    </div>
  );
}