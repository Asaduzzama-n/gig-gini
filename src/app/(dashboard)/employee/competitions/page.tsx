import { Metadata } from 'next';
import { EmployeeCompetitionsPage } from '@/components/employees/EmployeeCompetitionsPage';

export const metadata: Metadata = {
  title: 'My Competitions - Employee Dashboard | GiG Geni',
  description: 'View your competition applications, track progress, and manage your participation.',
  keywords: 'employee competitions, my applications, competition progress, employee dashboard',
};

export default function CompetitionsPage() {
  return <EmployeeCompetitionsPage />;
}