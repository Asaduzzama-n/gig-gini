import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Candidates - Employer Dashboard | GiG Gini',
  description: 'View and manage candidates who have applied to your competitions. Review profiles, schedule interviews, and make hiring decisions.',
  keywords: 'candidate management, employer dashboard, candidate profiles, interview scheduling, hiring',
};

export default function EmployerCandidatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Candidate Management</h2>
        <p className="text-gray-600">
          Review candidate profiles, manage applications, schedule interviews, and make hiring decisions.
        </p>
      </div>
    </div>
  );
}