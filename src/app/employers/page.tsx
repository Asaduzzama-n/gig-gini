// app/employers/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Eye, Edit, Trash2, Users, Trophy, Calendar, BarChart3, 
  Star, Clock, CheckCircle, MessageSquare, DollarSign, Building,
  Video, FileText, Award, Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Link from 'next/link';

interface Competition {
  id: string;
  title: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  applicants: number;
  startDate: Date;
  endDate: Date;
  categories: string[];
  prizes: string;
  currentRound: number;
  totalRounds: number;
}

interface Candidate {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  competitionId: string;
  competitionTitle: string;
  currentRound: number;
  status: 'in-progress' | 'completed' | 'eliminated';
  score?: number;
  appliedDate: Date;
}

interface DashboardStats {
  totalCompetitions: number;
  activeCompetitions: number;
  totalApplicants: number;
  averageRating: number;
  successfulHires: number;
}

interface Interview {
  id: string;
  candidateName: string;
  competitionTitle: string;
  scheduledDate: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'video' | 'phone' | 'in-person';
}

// Mock data
const mockCompetitions: Competition[] = [
  {
    id: '1',
    title: 'Full Stack Developer Challenge 2024',
    status: 'active',
    applicants: 234,
    startDate: new Date('2024-09-15'),
    endDate: new Date('2024-10-15'),
    categories: ['IT', 'Programming'],
    prizes: '$5000 + Job Offer',
    currentRound: 3,
    totalRounds: 4
  },
  {
    id: '2',
    title: 'UI/UX Designer Competition',
    status: 'draft',
    applicants: 0,
    startDate: new Date('2024-10-20'),
    endDate: new Date('2024-11-20'),
    categories: ['Design', 'UI/UX'],
    prizes: '$3000 + Internship',
    currentRound: 0,
    totalRounds: 3
  },
  {
    id: '3',
    title: 'Marketing Campaign Contest',
    status: 'completed',
    applicants: 156,
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-09-01'),
    categories: ['Marketing', 'Business'],
    prizes: '$2500 + Certificate',
    currentRound: 4,
    totalRounds: 4
  }
];

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    rating: 4.8,
    competitionId: '1',
    competitionTitle: 'Full Stack Developer Challenge 2024',
    currentRound: 3,
    status: 'in-progress',
    score: 88,
    appliedDate: new Date('2024-09-16')
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 4.9,
    competitionId: '1',
    competitionTitle: 'Full Stack Developer Challenge 2024',
    currentRound: 4,
    status: 'completed',
    score: 95,
    appliedDate: new Date('2024-09-15')
  },
  {
    id: '3',
    name: 'Mike Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    rating: 4.6,
    competitionId: '1',
    competitionTitle: 'Full Stack Developer Challenge 2024',
    currentRound: 2,
    status: 'eliminated',
    score: 72,
    appliedDate: new Date('2024-09-17')
  }
];

const mockStats: DashboardStats = {
  totalCompetitions: 5,
  activeCompetitions: 1,
  totalApplicants: 520,
  averageRating: 4.7,
  successfulHires: 12
};

const mockInterviews: Interview[] = [
  {
    id: '1',
    candidateName: 'Alex Johnson',
    competitionTitle: 'Full Stack Developer Challenge 2024',
    scheduledDate: new Date('2024-08-28'),
    status: 'scheduled',
    type: 'video'
  },
  {
    id: '2',
    candidateName: 'Sarah Wilson',
    competitionTitle: 'Full Stack Developer Challenge 2024',
    scheduledDate: new Date('2024-08-29'),
    status: 'scheduled',
    type: 'video'
  }
];

export default function EmployerDashboard() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCompetitions(mockCompetitions);
      setCandidates(mockCandidates);
      setStats(mockStats);
      setInterviews(mockInterviews);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const getStatusColor = (status: Competition['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
    }
  };

  const getCandidateStatusColor = (status: Candidate['status']) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'eliminated': return 'bg-red-100 text-red-700';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Employer Overview</h1>
                <p className="text-gray-600">Manage your competitions and track candidate progress</p>
              </div>
              <Button asChild className="bg-gradient-to-r from-orange-500 to-orange-600">
                <Link href="/employers/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Competition
                </Link>
              </Button>
            </div>

            {/* Stats Overview */}
            {stats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
              >
                <Card className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stats.totalCompetitions}</div>
                  <div className="text-sm text-gray-600">Total Competitions</div>
                </Card>

                <Card className="p-6 text-center">
                  <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stats.activeCompetitions}</div>
                  <div className="text-sm text-gray-600">Active Now</div>
                </Card>

                <Card className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stats.totalApplicants}</div>
                  <div className="text-sm text-gray-600">Total Applicants</div>
                </Card>

                <Card className="p-6 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stats.averageRating}</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </Card>

                <Card className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stats.successfulHires}</div>
                  <div className="text-sm text-gray-600">Successful Hires</div>
                </Card>
              </motion.div>
            )}

            {/* Quick Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Recent Competitions</h3>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('competitions')}>
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {competitions.slice(0, 3).map(competition => (
                    <div key={competition.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 line-clamp-1">{competition.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${getStatusColor(competition.status)}`}>
                            {competition.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{competition.applicants} applicants</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Top Candidates</h3>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('candidates')}>
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {candidates.slice(0, 3).map(candidate => (
                    <div key={candidate.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={candidate.avatar} 
                          alt={candidate.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-sm text-gray-600">{candidate.rating}</span>
                            {candidate.score && (
                              <span className="text-sm text-gray-500">Score: {candidate.score}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge className={`text-xs ${getCandidateStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        );

      case 'competitions':
        return (
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Competitions</h1>
                <p className="text-gray-600">Manage and monitor your competitions</p>
              </div>
              <Button asChild className="bg-gradient-to-r from-orange-500 to-orange-600">
                <Link href="/employers/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New
                </Link>
              </Button>
            </div>

            <div className="grid gap-6">
              {competitions.map(competition => (
                <Card key={competition.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{competition.title}</h3>
                        <Badge className={getStatusColor(competition.status)}>
                          {competition.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {competition.categories.map(category => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {competition.applicants} applicants
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(competition.startDate)}
                        </div>
                        <div className="flex items-center">
                          <Trophy className="w-4 h-4 mr-2" />
                          {competition.prizes}
                        </div>
                        <div className="flex items-center">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Round {competition.currentRound}/{competition.totalRounds}
                        </div>
                      </div>

                      {competition.status === 'active' && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Competition Progress</span>
                            <span>{Math.round((competition.currentRound / competition.totalRounds) * 100)}%</span>
                          </div>
                          <ProgressBar value={(competition.currentRound / competition.totalRounds) * 100} className="h-2" />
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      {competition.status === 'draft' && (
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'candidates':
        return (
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Management</h1>
                <p className="text-gray-600">Review and manage competition candidates</p>
              </div>
              <div className="flex space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Competitions</option>
                  {competitions.map(comp => (
                    <option key={comp.id} value={comp.id}>{comp.title}</option>
                  ))}
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Status</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Eliminated</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4">
              {candidates.map(candidate => (
                <Card key={candidate.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={candidate.avatar} 
                        alt={candidate.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-1">{candidate.competitionTitle}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 mr-1" />
                            {candidate.rating}
                          </div>
                          <span>Round {candidate.currentRound}</span>
                          {candidate.score && <span>Score: {candidate.score}/100</span>}
                          <span>Applied: {formatDate(candidate.appliedDate)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={getCandidateStatusColor(candidate.status)}>
                        {candidate.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      {candidate.status === 'completed' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Schedule Interview
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'interviews':
        return (
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Management</h1>
                <p className="text-gray-600">Schedule and manage candidate interviews</p>
              </div>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
            </div>

            <div className="grid gap-4">
              {interviews.map(interview => (
                <Card key={interview.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Video className="w-8 h-8 text-blue-500" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{interview.candidateName}</h3>
                        <p className="text-sm text-gray-600">{interview.competitionTitle}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>Date: {formatDateTime(interview.scheduledDate)}</span>
                          <span className="capitalize">Type: {interview.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={`bg-blue-100 text-blue-700`}>
                        {interview.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Join Meeting
                      </Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your competition performance and metrics</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Application Trends</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <p className="text-gray-500">Application analytics chart</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Candidate Quality</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <p className="text-gray-500">Quality metrics chart</p>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
              <p className="text-gray-600">Manage your subscription and billing information</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-6 col-span-2">
                <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-orange-900">Premium Plan</h4>
                    <p className="text-sm text-orange-700">Up to 10 active competitions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-900">$299</p>
                    <p className="text-sm text-orange-700">/year</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Usage This Month</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Competitions</span>
                      <span>3/10</span>
                    </div>
                    <ProgressBar value={30} className="h-2" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
              <p className="text-gray-600">Communicate with candidates and support</p>
            </div>

            <Card className="p-6">
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
                <p className="text-gray-600">Messages with candidates will appear here</p>
              </div>
            </Card>
          </div>
        );

      case 'profile':
        return (
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Profile</h1>
              <p className="text-gray-600">Manage your company information and preferences</p>
            </div>

            <Card className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Company Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <p className="text-gray-900">TechCorp Solutions</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <p className="text-gray-900">Technology</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                      <p className="text-gray-900">100-500 employees</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">hr@techcorp.com</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <p className="text-gray-900">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <p className="text-gray-900">www.techcorp.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <Button>Edit Profile</Button>
              </div>
            </Card>
          </div>
        );

      case 'settings':
        return (
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
              <p className="text-gray-600">Configure your account preferences</p>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive updates about your competitions</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-600">Get notified about new applications</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Account Security</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                    </div>
                    <Button variant="outline" size="sm">Change Password</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Not enabled</p>
                    </div>
                    <Button variant="outline" size="sm">Enable 2FA</Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Page not found</p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      userRole="employer"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userName="TechCorp Solutions"
    >
      {renderContent()}
    </DashboardLayout>
  );
}