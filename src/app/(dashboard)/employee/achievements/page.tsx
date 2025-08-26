import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Achievements - Employee Dashboard | GiG Gini',
  description: 'View your achievements, badges, and accomplishments earned through competitions on the GiG Gini platform.',
  keywords: 'achievements, badges, accomplishments, employee dashboard, competition rewards, skill recognition',
};

export default function ProfileAchievementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Accomplishments</h2>
        <p className="text-gray-600">
          View your earned badges, achievements, and recognition from competitions and activities.
        </p>
      </div>
    </div>
  );
}