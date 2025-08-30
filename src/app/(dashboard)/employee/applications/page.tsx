import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Applications - Employee Dashboard | GiG Geni',
  description: 'Track your job applications, view application status, and manage your application history on the GiG Geni platform.',
  keywords: 'job applications, application status, employee dashboard, application history, job tracking',
};

export default function ProfileApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Application History</h2>
        <p className="text-gray-600">
          Track your job applications, view status updates, and manage your application history.
        </p>
      </div>
    </div>
  );
}