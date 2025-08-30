'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ProgressBar as Progress } from '@/components/ui/progress-bar';
import Link from 'next/link';
import {
  Search,
  Trophy,
  Clock,
  Calendar,
  Eye,
  Play,
  CheckCircle,
  AlertCircle,
  Users,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';

// Mock data for employee competitions
const mockCompetitions = [
  {
    id: '1',
    title: 'Frontend Developer Challenge',
    company: 'TechCorp Solutions',
    status: 'in-progress',
    currentRound: 3,
    totalRounds: 4,
    progress: 75,
    prize: '$5,000 + Job Offer',
    category: 'IT',
    appliedDate: '2024-01-15',
    nextDeadline: '2024-02-10',
    description: 'Build a complete e-commerce application using React and TypeScript.',
    rounds: [
      { number: 1, title: 'Screening Quiz', status: 'completed', score: 92 },
      { number: 2, title: 'Video Pitch', status: 'completed', score: 88 },
      { number: 3, title: 'Live Interview', status: 'in-progress', scheduledDate: '2024-02-10' },
      { number: 4, title: 'Final Evaluation', status: 'locked' }
    ]
  },
  {
    id: '2',
    title: 'UX Designer Position',
    company: 'Design Studio Inc',
    status: 'completed',
    currentRound: 4,
    totalRounds: 4,
    progress: 100,
    prize: '$4,000 + Job Offer',
    category: 'Design',
    appliedDate: '2023-12-01',
    result: 'winner',
    description: 'Create a comprehensive UX design for a mobile banking app.',
    rounds: [
      { number: 1, title: 'Portfolio Review', status: 'completed', score: 95 },
      { number: 2, title: 'Design Challenge', status: 'completed', score: 90 },
      { number: 3, title: 'Presentation', status: 'completed', score: 93 },
      { number: 4, title: 'Final Interview', status: 'completed', score: 96 }
    ]
  },
  {
    id: '3',
    title: 'Marketing Campaign Contest',
    company: 'Marketing Pro',
    status: 'applied',
    currentRound: 1,
    totalRounds: 3,
    progress: 25,
    prize: '$3,000 + Internship',
    category: 'Marketing',
    appliedDate: '2024-01-20',
    nextDeadline: '2024-02-05',
    description: 'Develop a comprehensive digital marketing strategy for a startup.',
    rounds: [
      { number: 1, title: 'Application Review', status: 'pending' },
      { number: 2, title: 'Strategy Presentation', status: 'locked' },
      { number: 3, title: 'Final Pitch', status: 'locked' }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'applied':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'in-progress':
      return <Play className="h-4 w-4" />;
    case 'completed':
      return <CheckCircle className="h-4 w-4" />;
    case 'applied':
      return <Clock className="h-4 w-4" />;
    case 'rejected':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

export function EmployeeCompetitionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredCompetitions = mockCompetitions.filter(competition => {
    const matchesSearch = competition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competition.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || competition.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: mockCompetitions.length,
    inProgress: mockCompetitions.filter(c => c.status === 'in-progress').length,
    completed: mockCompetitions.filter(c => c.status === 'completed').length,
    won: mockCompetitions.filter(c => c.result === 'winner').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Competitions</h1>
          <p className="text-gray-600">Track your competition progress and manage applications</p>
        </div>
        <Link href="/browse-competitions">
          <Button className="btn-primary">
            <Trophy className="h-4 w-4 mr-2" />
            Browse Competitions
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applied</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Trophy className="h-8 w-8 text-[#FC5602]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
              </div>
              <Play className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Won</p>
                <p className="text-3xl font-bold text-gray-900">{stats.won}</p>
              </div>
              <Award className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search competitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Competitions Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({stats.inProgress})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredCompetitions.length > 0 ? (
            <div className="space-y-4">
              {filteredCompetitions.map((competition, index) => (
                <motion.div
                  key={competition.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="text-lg font-semibold text-gray-900">
                              {competition.title}
                            </CardTitle>
                            <Badge className={getStatusColor(competition.status)}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(competition.status)}
                                <span className="capitalize">{competition.status.replace('-', ' ')}</span>
                              </div>
                            </Badge>
                            {competition.result === 'winner' && (
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                <Trophy className="h-3 w-3 mr-1" />
                                Winner
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{competition.company}</p>
                          <p className="text-sm text-gray-600">{competition.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Competition Details */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Trophy className="h-4 w-4 text-gray-400" />
                            <span>{competition.prize}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>Applied {new Date(competition.appliedDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-gray-400" />
                            <Badge variant="outline" className="text-xs">
                              {competition.category}
                            </Badge>
                          </div>
                          {competition.nextDeadline && (
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-red-600">Due {new Date(competition.nextDeadline).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        {/* Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">
                              Round {competition.currentRound} of {competition.totalRounds}
                            </span>
                          </div>
                          <Progress value={competition.progress} className="h-2" />
                        </div>

                        {/* Rounds Summary */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">Rounds</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {competition.rounds.map((round) => (
                              <div
                                key={round.number}
                                className={`text-xs p-2 rounded border ${
                                  round.status === 'completed'
                                    ? 'bg-green-50 border-green-200 text-green-800'
                                    : round.status === 'in-progress'
                                    ? 'bg-blue-50 border-blue-200 text-blue-800'
                                    : round.status === 'pending'
                                    ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                                    : 'bg-gray-50 border-gray-200 text-gray-600'
                                }`}
                              >
                                <div className="font-medium">{round.number}. {round.title}</div>
                                {round.score && (
                                  <div className="flex items-center space-x-1 mt-1">
                                    <TrendingUp className="h-3 w-3" />
                                    <span>{round.score}%</span>
                                  </div>
                                )}
                                {round.scheduledDate && (
                                  <div className="text-xs mt-1">
                                    {new Date(round.scheduledDate).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2 pt-2">
                          <Link href={`/employee/competitions/${competition.id}/journey`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              View Journey
                            </Button>
                          </Link>
                          {competition.status === 'in-progress' && (
                            <Link href={`/employee/competitions/${competition.id}/journey`} className="flex-1">
                              <Button size="sm" className="w-full btn-primary">
                                <Play className="h-4 w-4 mr-2" />
                                Continue
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No competitions found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? "Try adjusting your search criteria" 
                    : "Start participating in competitions to track your progress here"
                  }
                </p>
                {!searchTerm && (
                  <Link href="/browse-competitions">
                    <Button className="btn-primary">
                      <Trophy className="h-4 w-4 mr-2" />
                      Browse Competitions
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}