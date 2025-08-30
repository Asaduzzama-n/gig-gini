import { Metadata } from 'next';
import { EmployerCompetitionJourney } from '@/components/employers/EmployerCompetitionJourney';

export const metadata: Metadata = {
  title: 'Competition Journey - Employer Dashboard | GiG Geni',
  description: 'Monitor and manage the competition journey, track candidate progress through rounds.',
  keywords: 'competition journey, manage rounds, candidate progress, employer dashboard',
};

interface EmployerCompetitionJourneyPageProps {
  params: {
    id: string;
  };
}

export default function EmployerCompetitionJourneyPage({ params }: EmployerCompetitionJourneyPageProps) {
  return <EmployerCompetitionJourney competitionId={params.id} />;
}