import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interviews - Employee Dashboard | GiG Gini',
  description: 'View your scheduled interviews, prepare for upcoming meetings, and track interview history on the GiG Gini platform.',
  keywords: 'employee interviews, interview schedule, interview preparation, employee dashboard, job interviews',
};

export default function ProfileInterviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Interviews</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Interview Schedule</h2>
        <p className="text-gray-600">
          View your upcoming interviews, prepare for meetings, and track your interview history.
        </p>
      </div>
    </div>
  );
}