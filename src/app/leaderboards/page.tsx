import { Metadata } from 'next';
import { LeaderboardPage } from '@/components/leaderboard/LeaderboardPage';

export const metadata: Metadata = {
  title: 'Leaderboards | GiG Geni',
  description: 'View top performers, rankings, and achievements on the GiG Geni competitive hiring platform.',
  keywords: 'leaderboards, rankings, top performers, achievements, competitive hiring, talent rankings',
};

export default function Leaderboards() {
  return <LeaderboardPage />;
}