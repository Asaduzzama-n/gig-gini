import { Metadata } from 'next';
import { EmployerCompetitionsPage } from '@/components/employers/EmployerCompetitionsPage';

export const metadata: Metadata = {
  title: 'My Competitions - Employer Dashboard | GiG Geni',
  description: 'Manage your competitions, view applications, and track candidate progress.',
  keywords: 'employer dashboard, manage competitions, candidate applications, hiring',
};

export default function CompetitionsPage() {
  return <EmployerCompetitionsPage />;
}