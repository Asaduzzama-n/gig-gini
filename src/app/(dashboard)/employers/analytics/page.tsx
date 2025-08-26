import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics - Employer Dashboard | GiG Gini',
  description: 'View analytics for your competitions, candidate performance, and hiring metrics on the GiG Gini platform.',
  keywords: 'employer analytics, competition metrics, candidate analytics, hiring performance, dashboard insights',
};

export default function EmployerAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Competition Analytics</h2>
        <p className="text-gray-600">
          Track competition performance, candidate engagement, and hiring success metrics.
        </p>
      </div>
    </div>
  );
}