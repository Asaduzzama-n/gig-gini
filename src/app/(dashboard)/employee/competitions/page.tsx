"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { 
  Search, 
  Filter, 
  Trophy, 
  Calendar, 
  Users, 
  Clock, 
  Star,
  ArrowRight,
  CheckCircle,
  PlayCircle,
  Timer,
  Award,
  Target,
  ExternalLink
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";

interface Competition {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'upcoming';
  progress: number;
  category: string;
  participants: number;
  prize: string;
  deadline: string;
  startDate: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  company: string;
  result?: {
    position: number;
    totalParticipants: number;
    points: number;
    badge?: 'gold' | 'silver' | 'bronze';
  };
}

const mockCompetitions: Competition[] = [
  {
    id: '1',
    title: 'Full Stack Developer Challenge',
    description: 'Build a complete e-commerce application using React, Node.js, and MongoDB',
    status: 'active',
    progress: 75,
    category: 'Development',
    participants: 234,
    prize: '$5,000',
    deadline: '2024-02-15',
    startDate: '2024-01-15',
    difficulty: 'Advanced',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    company: 'TechCorp Inc.'
  },
  {
    id: '2',
    title: 'UI/UX Design Contest',
    description: 'Design a mobile app interface for a fitness tracking application',
    status: 'active',
    progress: 45,
    category: 'Design',
    participants: 156,
    prize: '$3,000',
    deadline: '2024-02-20',
    startDate: '2024-01-20',
    difficulty: 'Intermediate',
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
    company: 'DesignStudio'
  },
  {
    id: '3',
    title: 'Data Science Competition',
    description: 'Analyze customer behavior data and create predictive models',
    status: 'completed',
    progress: 100,
    category: 'Data Science',
    participants: 189,
    prize: '$4,500',
    deadline: '2024-01-10',
    startDate: '2023-12-10',
    difficulty: 'Advanced',
    skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    company: 'DataTech Solutions',
    result: {
      position: 12,
      totalParticipants: 189,
      points: 850,
      badge: 'bronze'
    }
  },
  {
    id: '4',
    title: 'Marketing Campaign Strategy',
    description: 'Develop a comprehensive digital marketing strategy for a startup',
    status: 'completed',
    progress: 100,
    category: 'Marketing',
    participants: 98,
    prize: '$2,500',
    deadline: '2024-01-05',
    startDate: '2023-12-05',
    difficulty: 'Intermediate',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
    company: 'StartupHub',
    result: {
      position: 3,
      totalParticipants: 98,
      points: 1200,
      badge: 'gold'
    }
  },
  {
    id: '5',
    title: 'Blockchain Development Challenge',
    description: 'Create a decentralized application (DApp) for supply chain management',
    status: 'upcoming',
    progress: 0,
    category: 'Blockchain',
    participants: 67,
    prize: '$6,000',
    deadline: '2024-03-15',
    startDate: '2024-02-15',
    difficulty: 'Advanced',
    skills: ['Solidity', 'Web3', 'Smart Contracts', 'Ethereum'],
    company: 'CryptoInnovate'
  },
  {
    id: '6',
    title: 'Mobile App Development',
    description: 'Build a cross-platform mobile app for food delivery service',
    status: 'upcoming',
    progress: 0,
    category: 'Mobile Development',
    participants: 145,
    prize: '$4,000',
    deadline: '2024-03-01',
    startDate: '2024-02-01',
    difficulty: 'Intermediate',
    skills: ['React Native', 'Flutter', 'API Integration', 'Mobile UI'],
    company: 'FoodieApp'
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'upcoming': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getBadgeColor(badge: string) {
  switch (badge) {
    case 'gold': return 'bg-yellow-100 text-yellow-800';
    case 'silver': return 'bg-gray-100 text-gray-800';
    case 'bronze': return 'bg-orange-100 text-orange-800';
    default: return 'bg-blue-100 text-blue-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'active': return PlayCircle;
    case 'completed': return CheckCircle;
    case 'upcoming': return Clock;
    default: return PlayCircle;
  }
}

export default function MyCompetitions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("active");

  const filteredCompetitions = mockCompetitions.filter(competition => {
    const matchesSearch = competition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competition.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competition.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && competition.status === activeTab;
  });

  const stats = {
    total: mockCompetitions.length,
    active: mockCompetitions.filter(c => c.status === 'active').length,
    completed: mockCompetitions.filter(c => c.status === 'completed').length,
    upcoming: mockCompetitions.filter(c => c.status === 'upcoming').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Competitions</h1>
          <p className="text-gray-600">Track your competition progress and results</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Trophy className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <PlayCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-orange-600">{stats.upcoming}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
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
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="active">Active ({stats.active})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({stats.upcoming})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredCompetitions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No competitions found</h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Try adjusting your search terms.' : `No ${activeTab} competitions at the moment.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredCompetitions.map((competition) => {
                const StatusIcon = getStatusIcon(competition.status);
                return (
                  <Card key={competition.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {competition.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">{competition.company}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(competition.status)}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-3 line-clamp-2">{competition.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {competition.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {competition.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{competition.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{competition.participants} participants</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Trophy className="h-4 w-4" />
                              <span>{competition.prize}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Due {new Date(competition.deadline).toLocaleDateString()}</span>
                            </div>
                            <Badge className={getDifficultyColor(competition.difficulty)}>
                              {competition.difficulty}
                            </Badge>
                          </div>
                          
                          {competition.status === 'active' && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-gray-600">Progress</span>
                                <span>{competition.progress}%</span>
                              </div>
                              <ProgressBar value={competition.progress} className="h-2" />
                            </div>
                          )}
                          
                          {competition.result && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Award className="h-4 w-4 text-orange-500" />
                                  <span className="font-medium">Rank #{competition.result.position}</span>
                                  {competition.result.badge && (
                                    <Badge className={getBadgeColor(competition.result.badge)}>
                                      {competition.result.badge}
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {competition.result.points} points
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          {competition.status === 'active' && (
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                              Continue
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}