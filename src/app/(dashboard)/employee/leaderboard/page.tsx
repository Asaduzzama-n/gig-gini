import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leaderboard - Employee Dashboard | GiG Gini',
  description: 'View your ranking on the leaderboard, compare your performance with other users, and track your progress on the GiG Gini platform.',
  keywords: 'leaderboard, rankings, employee dashboard, performance comparison, user rankings, competition scores',
};

export default function ProfileLeaderboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Ranking</h2>
        <p className="text-gray-600">
          See where you stand among other users, track your progress, and compete for top positions.
        </p>
      </div>
    </div>
  );
}