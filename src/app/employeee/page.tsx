"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { 
  Trophy, 
  Target, 
  Calendar, 
  TrendingUp, 
  Award, 
  Users, 
  Clock, 
  Star,
  ArrowRight,
  BarChart3,
  Briefcase,
  PlayCircle,
  CheckCircle
} from "lucide-react";

interface CompetitionStat {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'upcoming';
  progress: number;
  category: string;
  participants: number;
  prize: string;
  deadline: string;
}

const mockCompetitions: CompetitionStat[] = [
  {
    id: '1',
    title: 'Full Stack Developer Challenge',
    status: 'active',
    progress: 75,
    category: 'Development',
    participants: 234,
    prize: '$5,000',
    deadline: '2024-02-15'
  },
  {
    id: '2',
    title: 'Digital Marketing Campaign',
    status: 'completed',
    progress: 100,
    category: 'Marketing',
    participants: 156,
    prize: '$3,000',
    deadline: '2024-01-20'
  },
  {
    id: '3',
    title: 'Business Strategy Case Study',
    status: 'upcoming',
    progress: 0,
    category: 'Business',
    participants: 89,
    prize: '$4,500',
    deadline: '2024-03-01'
  }
];

const stats = [
  {
    title: 'Total Competitions',
    value: '12',
    change: '+3 this month',
    icon: Trophy,
    color: 'text-orange-600'
  },
  {
    title: 'Achievements Earned',
    value: '8',
    change: '+2 this week',
    icon: Award,
    color: 'text-blue-600'
  },
  {
    title: 'Current Ranking',
    value: '#47',
    change: '+12 positions',
    icon: Target,
    color: 'text-green-600'
  },
  {
    title: 'Success Rate',
    value: '67%',
    change: '+5% improvement',
    icon: TrendingUp,
    color: 'text-purple-600'
  }
];

const recentAchievements = [
  {
    title: 'Top 10 Finalist',
    competition: 'React Developer Challenge',
    date: '2024-01-15',
    badge: 'gold'
  },
  {
    title: 'Best Innovation',
    competition: 'Startup Pitch Competition',
    date: '2024-01-10',
    badge: 'silver'
  },
  {
    title: 'People\'s Choice',
    competition: 'UI/UX Design Contest',
    date: '2024-01-05',
    badge: 'bronze'
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

function getBadgeColor(badge: string) {
  switch (badge) {
    case 'gold': return 'bg-yellow-100 text-yellow-800';
    case 'silver': return 'bg-gray-100 text-gray-800';
    case 'bronze': return 'bg-orange-100 text-orange-800';
    default: return 'bg-blue-100 text-blue-800';
  }
}

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
            <p className="text-orange-100">Ready to take on new challenges? You have 2 active competitions waiting.</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">47</div>
              <div className="text-sm text-orange-200">Global Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1,250</div>
              <div className="text-sm text-orange-200">Points Earned</div>
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
                  <CardDescription>Track your progress in ongoing competitions</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
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
                          <Trophy className="h-4 w-4" />
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
                        <span>Progress</span>
                        <span>{competition.progress}%</span>
                      </div>
                      <ProgressBar value={competition.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-3">
                    <Badge variant="secondary">{competition.category}</Badge>
                    <Button size="sm" variant={competition.status === 'active' ? 'default' : 'outline'}>
                      {competition.status === 'active' ? 'Continue' : 
                       competition.status === 'upcoming' ? 'View Details' : 'View Results'}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-600" />
                Recent Achievements
              </CardTitle>
              <CardDescription>Your latest accomplishments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <Star className="h-4 w-4 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{achievement.title}</p>
                    <p className="text-sm text-gray-600">{achievement.competition}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{achievement.date}</span>
                      <Badge className={getBadgeColor(achievement.badge)} variant="secondary">
                        {achievement.badge}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                <BarChart3 className="h-4 w-4 mr-2" />
                View All Achievements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-orange-600" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Your competition performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Competition Completion Rate</span>
                <span className="text-sm text-gray-600">85%</span>
              </div>
              <ProgressBar value={85} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Score</span>
                <span className="text-sm text-gray-600">78/100</span>
              </div>
              <ProgressBar value={78} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Skill Growth</span>
                <span className="text-sm text-gray-600">92%</span>
              </div>
              <ProgressBar value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              Goals & Milestones
            </CardTitle>
            <CardDescription>Track your progress towards career goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Complete 10 Competitions</p>
                  <p className="text-sm text-gray-600">8/10 completed</p>
                  <ProgressBar value={80} className="h-1 mt-2" />
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <PlayCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Reach Top 50 Ranking</p>
                  <p className="text-sm text-gray-600">Currently #47</p>
                  <ProgressBar value={94} className="h-1 mt-2" />
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Earn 5 Certifications</p>
                  <p className="text-sm text-gray-600">2/5 completed</p>
                  <ProgressBar value={40} className="h-1 mt-2" />
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
          <CardDescription>Get started with these common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col space-y-2 bg-orange-600 hover:bg-orange-700" variant="default">
              <Trophy className="h-6 w-6" />
              <span>Join New Competition</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Users className="h-6 w-6" />
              <span>Update Profile</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Calendar className="h-6 w-6" />
              <span>View Schedule</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <BarChart3 className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}