import { Competition } from '@/interfaces/types';
import {
  Trophy,
  Target,
  Users,
  Briefcase,
  Zap,
  Shield,
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  Eye,
  CheckCircle,
  Code,
  Presentation,
  UserCheck,
} from 'lucide-react';


export const winnersData = [
  {
    id: "1",
    name: "John Doe",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    competition: "Frontend Challenge 2024",
    company: "Tech Corp Inc.",
    hired: true,
    position: "1st Place",
    prize: "$5,000",
    organizedBy: "GigGini Platform",
    date: "Dec 2024"
  },
  {
    id: "2",
    name: "Jane Smith",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    competition: "AI Innovation Hackathon",
    company: "Future Labs",
    hired: false,
    position: "2nd Place",
    prize: "$3,000",
    organizedBy: "AI Consortium",
    date: "Nov 2024"
  },
  {
    id: "3",
    name: "Ali Hasan",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    competition: "Blockchain Development Contest",
    company: "CryptoWorld",
    hired: true,
    position: "1st Place",
    prize: "$7,500",
    organizedBy: "Blockchain Alliance",
    date: "Oct 2024"
  },
  {
    id: "4",
    name: "Sarah Wilson",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    competition: "UX/UI Design Challenge",
    company: "Design Studio Pro",
    hired: true,
    position: "1st Place",
    prize: "$4,000",
    organizedBy: "Design Masters",
    date: "Sep 2024"
  },
  {
    id: "5",
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    competition: "Mobile App Development",
    company: "AppTech Solutions",
    hired: false,
    position: "3rd Place",
    prize: "$2,000",
    organizedBy: "Mobile Dev Community",
    date: "Aug 2024"
  }
];


export const employeeBenefits = [
  {
    icon: Trophy,
    title: 'Showcase Your Skills',
    description: 'Demonstrate your abilities through real challenges, not just resumes',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: DollarSign,
    title: 'Win Cash Prizes',
    description: 'Compete for substantial monetary rewards while getting hired',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Eye,
    title: 'Get Noticed',
    description: 'Stand out to top employers who value skills over credentials',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Target,
    title: 'Fair Assessment',
    description: 'Experience unbiased evaluation based purely on performance',
    color: 'from-[#FC5602] to-[#FF7B02]',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Build your reputation and ranking in your field',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: CheckCircle,
    title: 'Skip Traditional Hiring',
    description: 'Bypass lengthy interview processes with performance-based selection',
    color: 'from-teal-500 to-teal-600',
  },
];

export const employerBenefits = [
  {
    icon: Users,
    title: 'Quality Talent Pool',
    description: 'Access pre-screened candidates who prove their skills',
    color: 'from-rose-500 to-rose-600',
  },
  {
    icon: Zap,
    title: 'Faster Hiring',
    description: 'Reduce time-to-hire with streamlined competitive processes',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Shield,
    title: 'Risk Reduction',
    description: 'Make data-driven decisions based on actual performance',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Briefcase,
    title: 'Brand Visibility',
    description: 'Showcase your company to top talent in your industry',
    color: 'from-[#FC5602] to-[#FF7B02]',
  },
  {
    icon: Award,
    title: 'Better Matches',
    description: 'Find candidates who truly fit your requirements',
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: Clock,
    title: 'Cost Effective',
    description: 'Lower recruitment costs with higher success rates',
    color: 'from-cyan-500 to-cyan-600',
  },
];


export const mockCompetitions: Competition[] = [
  {
    id: '1',
    title: 'Full Stack Developer Challenge',
    organizer: 'TechCorp Solutions',
    location: 'Remote',
    rating: 4.8,
    categories: ['IT', 'Programming'],
    prizes: '$5000 + Job Offer',
    registrationFee: 'Free',
    startDate: new Date('2024-09-15'),
    endDate: new Date('2024-10-15'),
    resultDate: new Date('2024-10-22'),
    description: 'Build a complete e-commerce application using React, Node.js, and MongoDB.',
    skillsTested: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
    participantCount: 234
  },
  {
    id: '2',
    title: 'Digital Marketing Campaign Contest',
    organizer: 'Marketing Masters Inc',
    location: 'New York, NY',
    rating: 4.6,
    categories: ['Marketing', 'Business'],
    prizes: '$3000 + Internship',
    registrationFee: '$25',
    startDate: new Date('2024-09-20'),
    endDate: new Date('2024-10-20'),
    resultDate: new Date('2024-10-25'),
    description: 'Create and execute a comprehensive digital marketing strategy for a startup.',
    skillsTested: ['Social Media Marketing', 'SEO', 'Content Creation', 'Analytics'],
    participantCount: 156
  },
  {
    id: '3',
    title: 'Sales Excellence Championship',
    organizer: 'SalesForce Elite',
    location: 'Chicago, IL',
    rating: 4.9,
    categories: ['Sales', 'Business'],
    prizes: '$4000 + Commission Role',
    registrationFee: 'Free',
    startDate: new Date('2024-09-25'),
    endDate: new Date('2024-10-25'),
    resultDate: new Date('2024-11-01'),
    description: 'Demonstrate your sales skills through role-play scenarios and real client pitches.',
    skillsTested: ['Cold Calling', 'Negotiation', 'CRM Software', 'Presentation'],
    participantCount: 89
  }
];


export const competitionTypes = [
  {
    title: 'Computer Science & IT',
    icon: Code,
    steps: ['Algorithm Quiz', 'Coding Challenge', 'System Design', 'Technical Interview'],
    color: 'from-blue-500 to-cyan-500',
    participants: '2.3K+',
  },
  {
    title: 'Business & Strategy',
    icon: Presentation,
    steps: ['Case Study', 'Market Analysis', 'Strategy Pitch', 'Executive Review'],
    color: 'from-purple-500 to-pink-500',
    participants: '1.8K+',
  },
  {
    title: 'Sales & Marketing',
    icon: Users,
    steps: ['Product Knowledge', 'Role Play', 'Campaign Design', 'Client Presentation'],
    color: 'from-[#FC5602] to-yellow-500',
    participants: '1.5K+',
  },
];


export const topPerformers = [
  {
    name: 'Sarah Johnson',
    competition: 'Full Stack Developer Challenge',
    score: 95,
    rank: 1,
    skills: ['React', 'Node.js', 'TypeScript']
  },
  {
    name: 'Michael Chen',
    competition: 'Digital Marketing Strategy',
    score: 92,
    rank: 1,
    skills: ['SEO', 'Analytics', 'Content Strategy']
  },
  {
    name: 'Emily Rodriguez',
    competition: 'UI/UX Design Challenge',
    score: 88,
    rank: 2,
    skills: ['Figma', 'User Research', 'Prototyping']
  }
];

export const mockCompetitions1: Competition[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer Challenge',
    status: 'active',
    participants: 234,
    applications: 456,
    prize: '$8,000',
    deadline: '2024-02-15',
    category: 'Development',
    engagement: 89
  },
  {
    id: '2',
    title: 'Digital Marketing Strategy Contest',
    status: 'completed',
    participants: 156,
    applications: 298,
    prize: '$5,000',
    deadline: '2024-01-20',
    category: 'Marketing',
    engagement: 76
  },
  {
    id: '3',
    title: 'UI/UX Design Innovation Challenge',
    status: 'scheduled',
    participants: 0,
    applications: 89,
    prize: '$6,500',
    deadline: '2024-03-01',
    category: 'Design',
    engagement: 0
  },
  {
    id: '4',
    title: 'Data Science Analytics Competition',
    status: 'draft',
    participants: 0,
    applications: 0,
    prize: '$7,000',
    deadline: '2024-03-15',
    category: 'Data Science',
    engagement: 0
  }
];



export const stats = [
  {
    title: 'Active Competitions',
    value: '3',
    change: '+1 this month',
    icon: Trophy,
    color: 'text-orange-600'
  },
  {
    title: 'Total Participants',
    value: '1,247',
    change: '+234 this week',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Successful Hires',
    value: '28',
    change: '+5 this month',
    icon: UserCheck,
    color: 'text-green-600'
  },
  {
    title: 'Total Investment',
    value: '$45,500',
    change: '+$8,000 this month',
    icon: DollarSign,
    color: 'text-purple-600'
  }
];

export const dashboardTopPerformers = [
  {
    name: 'Sarah Johnson',
    competition: 'Full Stack Developer Challenge',
    score: 95,
    rank: 1,
    skills: ['React', 'Node.js', 'TypeScript']
  },
  {
    name: 'Michael Chen',
    competition: 'Digital Marketing Strategy',
    score: 92,
    rank: 1,
    skills: ['SEO', 'Analytics', 'Content Strategy']
  },
  {
    name: 'Emily Rodriguez',
    competition: 'UI/UX Design Challenge',
    score: 88,
    rank: 2,
    skills: ['Figma', 'User Research', 'Prototyping']
  }
];
