import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Messages - Employer Dashboard | GiG Gini',
  description: 'Communicate with candidates, manage conversations, and handle inquiries on the GiG Gini platform.',
  keywords: 'employer messages, candidate communication, messaging, employer dashboard, candidate conversations',
};

export default function EmployerMessagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Communication Hub</h2>
        <p className="text-gray-600">
          Communicate with candidates, manage conversations, and handle inquiries efficiently.
        </p>
      </div>
    </div>
  );
}