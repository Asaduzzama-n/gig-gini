// app/admin/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Trophy, Building, BarChart3, Settings, FileText, 
  TrendingUp, Eye, Edit, Trash2, UserCheck, Ban, Search,
  Calendar, DollarSign, Award, Activity, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ProgressBar } from '@/components/ui/progress-bar';


interface AdminStats {
  totalUsers: number;
  totalEmployees: number;
  totalEmployers: number;
  totalCompetitions: number;
  activeCompetitions: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  type: 'employee' | 'employer';
  status: 'active' | 'suspended' | 'pending';
  joinDate: Date;
  lastActive: Date;
  competitions: number;
}

interface Competition {
  id: string;
  title: string;
  organizer: string;
  status: 'active' | 'completed' | 'pending' | 'cancelled';
  participants: number;
  startDate: Date;
  endDate: Date;
  revenue: number;
  categories: string[];
}

interface Subscription {
  id: string;
  userId: string;
  userName: string;
  plan: 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  amount: number;
}

// Mock data
const mockStats: AdminStats = {
  totalUsers: 15420,
  totalEmployees: 12340,
  totalEmployers: 3080,
  totalCompetitions: 248,
  activeCompetitions: 42,
  totalRevenue: 125000,
  monthlyGrowth: 15.3
};

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    type: 'employee',
    status: 'active',
    joinDate: new Date('2024-01-15'),
    lastActive: new Date('2024-08-20'),
    competitions: 8
  },
  {
    id: '2',
    name: 'TechCorp Solutions',
    email: 'hr@techcorp.com',
    type: 'employer',
    status: 'active',
    joinDate: new Date('2024-03-10'),
    lastActive: new Date('2024-08-22'),
    competitions: 3
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    type: 'employee',
    status: 'suspended',
    joinDate: new Date('2024-05-20'),
    lastActive: new Date('2024-08-18'),
    competitions: 2
  }
];

const mockCompetitions: Competition[] = [
  {
    id: '1',
    title: 'Full Stack Developer Challenge 2024',
    organizer: 'TechCorp Solutions',
    status: 'active',
    participants: 234,
    startDate: new Date('2024-09-15'),
    endDate: new Date('2024-10-15'),
    revenue: 0,
    categories: ['IT', 'Programming']
  },
  {
    id: '2',
    title: 'Marketing Campaign Contest',
    organizer: 'Marketing Masters Inc',
    status: 'completed',
    participants: 156,
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-09-01'),
    revenue: 3900,
    categories: ['Marketing', 'Business']
  }
];

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    userId: '2',
    userName: 'TechCorp Solutions',
    plan: 'premium',
    status: 'active',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2025-03-15'),
    amount: 299
  },
  {
    id: '2',
    userId: '4',
    userName: 'StartupXYZ',
    plan: 'basic',
    status: 'expired',
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-07-10'),
    amount: 99
  }
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats(mockStats);
      setUsers(mockUsers);
      setCompetitions(mockCompetitions);
      setSubscriptions(mockSubscriptions);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'suspended': case 'cancelled': case 'expired': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'basic': return 'bg-gray-100 text-gray-700';
      case 'premium': return 'bg-orange-100 text-orange-700';
      case 'enterprise': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage users, competitions, and platform analytics</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">
                    {stats.totalEmployees.toLocaleString()} employees, {stats.totalEmployers.toLocaleString()} employers
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Competitions</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCompetitions}</p>
                  <p className="text-sm text-gray-500">{stats.activeCompetitions} active</p>
                </div>
                <Trophy className="w-8 h-8 text-orange-500" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                  <p className="text-sm text-green-600">+{stats.monthlyGrowth}% this month</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.monthlyGrowth}%</p>
                  <p className="text-sm text-gray-500">Monthly growth</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </Card>
          </motion.div>
        )}

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="competitions">Competitions</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Activity className="w-5 h-5 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New user registration</p>
                        <p className="text-xs text-gray-500">Alex Johnson joined as employee - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <Trophy className="w-5 h-5 text-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Competition completed</p>
                        <p className="text-xs text-gray-500">Marketing Campaign Contest ended - 5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                      <Building className="w-5 h-5 text-orange-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New employer subscription</p>
                        <p className="text-xs text-gray-500">TechCorp upgraded to premium - 1 day ago</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Platform Health */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Platform Health</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">User Engagement</span>
                        <span className="text-sm text-green-600">92%</span>
                      </div>
                      <ProgressBar value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Competition Success Rate</span>
                        <span className="text-sm text-blue-600">87%</span>
                      </div>
                      <ProgressBar value={87} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Revenue Target</span>
                        <span className="text-sm text-orange-600">76%</span>
                      </div>
                      <ProgressBar value={76} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Customer Satisfaction</span>
                        <span className="text-sm text-purple-600">95%</span>
                      </div>
                      <ProgressBar value={95} className="h-2" />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">User Management</h2>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>All Users</option>
                    <option>Employees</option>
                    <option>Employers</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4">
                {users.map(user => (
                  <Card key={user.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span>{user.type}</span>
                            <span>Joined: {formatDate(user.joinDate)}</span>
                            <span>{user.competitions} competitions</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        {user.status === 'active' ? (
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Ban className="w-4 h-4 mr-2" />
                            Suspend
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                            <UserCheck className="w-4 h-4 mr-2" />
                            Activate
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="competitions" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Competition Management</h2>
                <div className="flex space-x-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Completed</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>All Categories</option>
                    <option>IT</option>
                    <option>Marketing</option>
                    <option>Business</option>
                  </select>
                </div>
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
                        
                        <p className="text-gray-600 mb-3">by {competition.organizer}</p>

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
                            {competition.participants} participants
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(competition.startDate)}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(competition.endDate)}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-2" />
                            {formatCurrency(competition.revenue)}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Manage
                        </Button>
                        {competition.status === 'pending' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="subscriptions" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Subscription Management</h2>
                <div className="flex space-x-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>All Plans</option>
                    <option>Basic</option>
                    <option>Premium</option>
                    <option>Enterprise</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Expired</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4">
                {subscriptions.map(subscription => (
                  <Card key={subscription.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{subscription.userName}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <Badge className={getPlanColor(subscription.plan)}>
                            {subscription.plan}
                          </Badge>
                          <span>Started: {formatDate(subscription.startDate)}</span>
                          <span>Ends: {formatDate(subscription.endDate)}</span>
                          <span>{formatCurrency(subscription.amount)}/year</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(subscription.status)}>
                          {subscription.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">User Growth</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <p className="text-gray-500">Chart visualization would go here</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <p className="text-gray-500">Revenue chart would go here</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Competition Performance</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <p className="text-gray-500">Performance metrics chart would go here</p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">User Engagement</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <p className="text-gray-500">Engagement analytics would go here</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}