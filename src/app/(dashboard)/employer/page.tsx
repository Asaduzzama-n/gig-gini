"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { 
  Trophy, 
  Users, 
  Calendar, 
  TrendingUp, 
  Award, 
  Target, 
  Clock, 
  Star,
  ArrowRight,
  BarChart3,
  Briefcase,
  Plus,
  Eye,
  CheckCircle,
  DollarSign,
  UserCheck,
  Zap
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";

interface Competition {
  id: string;
  title: string;
  status: 'active' | 'draft' | 'completed' | 'scheduled';
  participants: number;
  applications: number;
  prize: string;
  deadline: string;
  category: string;
  engagement: number;
}

const mockCompetitions: Competition[] = [
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

const stats = [
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

const topPerformers = [
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

function getStatusColor(status: string) {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'scheduled': return 'bg-orange-100 text-orange-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getRankBadgeColor(rank: number) {
  switch (rank) {
    case 1: return 'bg-yellow-100 text-yellow-800';
    case 2: return 'bg-gray-100 text-gray-800';
    case 3: return 'bg-orange-100 text-orange-800';
    default: return 'bg-blue-100 text-blue-800';
  }
}

function EmployerDashboardContent() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, TechCorp!</h1>
            <p className="text-orange-100">Manage your competitions and discover top talent. You have 3 active competitions running.</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-orange-200">Total Participants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">28</div>
              <div className="text-sm text-orange-200">Successful Hires</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Competitions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-orange-600" />
                    My Competitions
                  </CardTitle>
                  <CardDescription>Manage your active and upcoming competitions</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View All
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCompetitions.map((competition) => (
                <div key={competition.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{competition.title}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {competition.participants} participants
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due {competition.deadline}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {competition.prize}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(competition.status)}>
                      {competition.status}
                    </Badge>
                  </div>
                  
                  {competition.status === 'active' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Engagement Rate</span>
                        <span>{competition.engagement}%</span>
                      </div>
                      <ProgressBar value={competition.engagement} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{competition.category}</Badge>
                      {competition.applications > 0 && (
                        <span className="text-sm text-gray-600">{competition.applications} applications</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {competition.status === 'active' && (
                        <Button size="sm" variant="default">
                          Manage
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-600" />
                Top Performers
              </CardTitle>
              <CardDescription>Outstanding candidates from your competitions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{performer.name}</p>
                    <p className="text-sm text-gray-600 truncate">{performer.competition}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getRankBadgeColor(performer.rank)} variant="secondary">
                        #{performer.rank}
                      </Badge>
                      <span className="text-sm font-medium text-gray-900">{performer.score}%</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {performer.skills.slice(0, 2).map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {performer.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{performer.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Contact
                  </Button>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                <Users className="h-4 w-4 mr-2" />
                View All Candidates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-orange-600" />
              Competition Analytics
            </CardTitle>
            <CardDescription>Performance metrics for your competitions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Participation Rate</span>
                <span className="text-sm text-gray-600">78%</span>
              </div>
              <ProgressBar value={78} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-sm text-gray-600">85%</span>
              </div>
              <ProgressBar value={85} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Quality Score</span>
                <span className="text-sm text-gray-600">92%</span>
              </div>
              <ProgressBar value={92} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Hire Success Rate</span>
                <span className="text-sm text-gray-600">23%</span>
              </div>
              <ProgressBar value={23} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              Hiring Goals
            </CardTitle>
            <CardDescription>Track your recruitment objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Hire 30 Developers</p>
                  <p className="text-sm text-gray-600">28/30 completed</p>
                  <ProgressBar value={93} className="h-1 mt-2" />
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Fill 5 Senior Positions</p>
                  <p className="text-sm text-gray-600">3/5 completed</p>
                  <ProgressBar value={60} className="h-1 mt-2" />
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Reduce Time-to-Hire</p>
                  <p className="text-sm text-gray-600">Target: 14 days (Current: 18 days)</p>
                  <ProgressBar value={78} className="h-1 mt-2" />
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-purple-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Improve Quality Score</p>
                  <p className="text-sm text-gray-600">Target: 95% (Current: 92%)</p>
                  <ProgressBar value={97} className="h-1 mt-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your competitions and candidates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col space-y-2 bg-orange-600 hover:bg-orange-700" variant="default">
              <Plus className="h-6 w-6" />
              <span>Create Competition</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Users className="h-6 w-6" />
              <span>Review Candidates</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <BarChart3 className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Calendar className="h-6 w-6" />
              <span>Schedule Interview</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function EmployerDashboard() {
  return <EmployerDashboardContent />;
}