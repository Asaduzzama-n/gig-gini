import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics - Admin Dashboard | GiG Gini',
  description: 'View comprehensive analytics and insights for the GiG Gini platform. Monitor user engagement, competition performance, and revenue metrics.',
  keywords: 'analytics, admin dashboard, platform metrics, user engagement, revenue analytics',
};

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Platform Analytics</h2>
        <p className="text-gray-600">
          Comprehensive analytics and insights for platform performance, user engagement, and business metrics.
        </p>
      </div>
    </div>
  );
}