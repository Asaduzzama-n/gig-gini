'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  Plus,
  Search,
  Trophy,
  Users,
  Calendar,
  Eye,
  Edit,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Mock data for employer competitions
const mockCompetitions = [
  {
    id: '1',
    title: 'Senior Frontend Developer Challenge',
    status: 'active',
    applicants: 45,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    prize: '$5,000 + Job Offer',
    category: 'IT',
    rounds: 4,
    currentRound: 2,
    description: 'Looking for an experienced React developer to join our team.'
  },
  {
    id: '2',
    title: 'UX Designer Position',
    status: 'draft',
    applicants: 0,
    startDate: '2024-02-01',
    endDate: '2024-03-01',
    prize: '$3,000 + Job Offer',
    category: 'Design',
    rounds: 3,
    currentRound: 0,
    description: 'Seeking a creative UX designer for our product team.'
  },
  {
    id: '3',
    title: 'Marketing Manager Competition',
    status: 'completed',
    applicants: 32,
    startDate: '2023-12-01',
    endDate: '2024-01-01',
    prize: '$4,000 + Job Offer',
    category: 'Marketing',
    rounds: 4,
    currentRound: 4,
    description: 'Find a strategic marketing manager for our growth team.'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'draft':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'completed':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <Clock className="h-4 w-4" />;
    case 'draft':
      return <Edit className="h-4 w-4" />;
    case 'completed':
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

export function EmployerCompetitionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredCompetitions = mockCompetitions.filter(competition => {
    const matchesSearch = competition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competition.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || competition.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Competitions</h1>
          <p className="text-gray-600">Manage your competitions and track candidate progress</p>
        </div>
        <Link href="/employer/competitions/create">
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Competition
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Competitions</p>
                <p className="text-3xl font-bold text-gray-900">{mockCompetitions.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-[#FC5602]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Competitions</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockCompetitions.filter(c => c.status === 'active').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockCompetitions.reduce((sum, c) => sum + c.applicants, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockCompetitions.filter(c => c.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search competitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitions Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({mockCompetitions.length})</TabsTrigger>
          <TabsTrigger value="active">
            Active ({mockCompetitions.filter(c => c.status === 'active').length})
          </TabsTrigger>
          <TabsTrigger value="draft">
            Draft ({mockCompetitions.filter(c => c.status === 'draft').length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({mockCompetitions.filter(c => c.status === 'completed').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredCompetitions.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                          <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                            {competition.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mb-3">
                            {competition.description}
                          </p>
                        </div>
                        <Badge className={`ml-2 ${getStatusColor(competition.status)}`}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(competition.status)}
                            <span className="capitalize">{competition.status}</span>
                          </div>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Competition Details */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span>{competition.applicants} applicants</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{new Date(competition.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Trophy className="h-4 w-4 text-gray-400" />
                            <span>{competition.prize}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {competition.category}
                            </Badge>
                          </div>
                        </div>

                        {/* Progress */}
                        {competition.status === 'active' && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">
                                Round {competition.currentRound} of {competition.rounds}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-[#FC5602] h-2 rounded-full transition-all"
                                style={{ width: `${(competition.currentRound / competition.rounds) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex space-x-2 pt-2">
                          <Link href={`/employer/competitions/${competition.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                          <Link href={`/employer/competitions/${competition.id}/analytics`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Analytics
                            </Button>
                          </Link>
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
                    : "Create your first competition to get started"
                  }
                </p>
                {!searchTerm && (
                  <Link href="/employer/competitions/create">
                    <Button className="btn-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Competition
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