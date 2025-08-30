import { Metadata } from 'next';
import { CreateCompetitionPage } from '@/components/employers/CreateCompetitionPage';

export const metadata: Metadata = {
  title: 'Create Competition - Employer Dashboard | GiG Gini',
  description: 'Create a new competition to find and hire top talent through skill-based challenges.',
  keywords: 'create competition, employer, hiring, talent acquisition, skill-based hiring',
};

export default function CreateCompetition() {
  return <CreateCompetitionPage />;
}