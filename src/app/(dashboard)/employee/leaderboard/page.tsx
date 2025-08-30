import { Metadata } from 'next';
import { LeaderboardPage } from '@/components/leaderboard/LeaderboardPage';

export const metadata: Metadata = {
  title: 'Leaderboard - Employee Dashboard | GiG Geni',
  description: 'View your ranking on the leaderboard, compare your performance with other users, and track your progress on the GiG Geni platform.',
  keywords: 'leaderboard, rankings, employee dashboard, performance comparison, user rankings, competition scores',
};

export default function ProfileLeaderboardPage() {
  return <LeaderboardPage />;
}