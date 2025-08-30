import { Metadata } from 'next';
import { LeaderboardPage } from '@/components/leaderboard/LeaderboardPage';

export const metadata: Metadata = {
  title: 'Leaderboard - Employee Dashboard | GiG Gini',
  description: 'View your ranking on the leaderboard, compare your performance with other users, and track your progress on the GiG Gini platform.',
  keywords: 'leaderboard, rankings, employee dashboard, performance comparison, user rankings, competition scores',
};

export default function ProfileLeaderboardPage() {
  return <LeaderboardPage />;
}