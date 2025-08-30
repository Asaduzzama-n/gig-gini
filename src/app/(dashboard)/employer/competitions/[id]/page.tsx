import { Metadata } from 'next';
import { CompetitionDetailPage } from '@/components/employers/CompetitionDetailPage';

export const metadata: Metadata = {
  title: 'Competition Details - Employer Dashboard | GiG Geni',
  description: 'View and manage your competition details, applications, and candidate progress.',
  keywords: 'competition details, manage competition, candidate applications, employer dashboard',
};

interface CompetitionDetailProps {
  params: {
    id: string;
  };
}

export default function CompetitionDetail({ params }: CompetitionDetailProps) {
  return <CompetitionDetailPage competitionId={params.id} />;
}