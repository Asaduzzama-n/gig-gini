import { Metadata } from 'next';
import { CompetitionJourney } from '@/components/competitions/CompetitionJourney';

export const metadata: Metadata = {
  title: 'Competition Journey - Employee Dashboard | GiG Gini',
  description: 'Track your progress through the competition rounds and complete challenges to advance.',
  keywords: 'competition journey, rounds, progress, challenges, employee dashboard',
};

// Mock data for demonstration
const mockRoundsData = [
  {
    roundNumber: 1,
    title: 'Screening Quiz',
    description: 'Complete technical and situational questions',
    type: 'quiz' as const,
    status: 'completed' as const,
    score: 92,
    feedback: 'Excellent performance on technical questions'
  },
  {
    roundNumber: 2,
    title: 'Video Pitch',
    description: 'Submit a 1-2 minute video showcasing your skills',
    type: 'video' as const,
    status: 'completed' as const,
    feedback: 'Great presentation and communication skills'
  },
  {
    roundNumber: 3,
    title: 'Live Interview',
    description: 'Join a Zoom session with the hiring team',
    type: 'interview' as const,
    status: 'in-progress' as const,
    scheduledDate: new Date('2025-02-15T14:00:00')
  },
  {
    roundNumber: 4,
    title: 'Final Evaluation',
    description: 'Comprehensive assessment and winner selection',
    type: 'evaluation' as const,
    status: 'locked' as const
  }
];

interface CompetitionJourneyPageProps {
  params: {
    id: string;
  };
}

export default function EmployeeCompetitionJourneyPage({ params }: CompetitionJourneyPageProps) {
  return (
    <div className="space-y-6">
      <CompetitionJourney
        competitionId={params.id}
        competitionTitle="Frontend Developer Challenge"
        currentRound={3}
        totalRounds={4}
        roundsData={mockRoundsData}
      />
    </div>
  );
}