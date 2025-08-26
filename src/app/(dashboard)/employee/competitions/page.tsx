import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Competitions - Employee Dashboard | GiG Gini',
  description: 'View and manage your competition entries, track progress, and see results on the GiG Gini platform.',
  keywords: 'employee competitions, my competitions, competition entries, competition results, employee dashboard',
};

export default function ProfileCompetitionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Competitions</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Competition Entries</h2>
        <p className="text-gray-600">
          View your active competitions, track submission progress, and see results.
        </p>
      </div>
    </div>
  );
}