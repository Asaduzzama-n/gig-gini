import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscriptions - Admin Dashboard | GiG Geni',
  description: 'Manage user subscriptions, billing, and payment plans on the GiG Geni platform.',
  keywords: 'subscription management, billing, payment plans, admin dashboard, user subscriptions',
};

export default function AdminSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Subscription Management</h2>
        <p className="text-gray-600">
          Manage user subscriptions, billing cycles, and payment plans across the platform.
        </p>
      </div>
    </div>
  );
}